'use strict';
/**
 * electron/main.js — Phoenix Recovery Desktop Shell
 *
 * Production-ready Electron main process:
 *  - Spawns Flask backend on a dynamic (ephemeral) port
 *  - Exposes real machine UUID to the renderer via IPC
 *  - Graceful shutdown (SIGTERM → SIGKILL)
 *  - App-level menu with Help / Subscription links
 */

const { app, BrowserWindow, dialog, Menu, shell, ipcMain } = require('electron');
const path   = require('path');
const net    = require('net');
const http   = require('http');
const crypto = require('crypto');
const os     = require('os');
const fs     = require('fs');
const { spawn, execSync } = require('child_process');
const si = require('systeminformation');

let mainWindow;
let backendProcess;
let backendPort = 5001;               // will be updated once backend reports its actual port
let licenseStore = null;

const isDev    = !app.isPackaged;
const VITE_PORT = 5173;

// ── License Store Path ──────────────────────────────────────────────────────
function getLicenseStorePath() {
  return path.join(app.getPath('userData'), 'license.json');
}

function readLicense() {
  try {
    const raw = fs.readFileSync(getLicenseStorePath(), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeLicense(data) {
  fs.writeFileSync(getLicenseStorePath(), JSON.stringify(data, null, 2));
}

function clearLicense() {
  try { fs.unlinkSync(getLicenseStorePath()); } catch { /* ok */ }
}

// ── Real Machine ID (macOS serial / hardware UUID) ──────────────────────────
async function getRealMachineId() {
  try {
    // Primary: macOS system profiler hardware UUID
    const sys = await si.system();
    const uuid = sys.uuid || '';
    if (uuid && uuid.length > 10) {
      return 'PHX-' + crypto.createHash('sha256').update(uuid).digest('hex').substring(0, 12).toUpperCase();
    }
  } catch { /* fall through */ }

  try {
    // Fallback: ioreg on macOS
    if (process.platform === 'darwin') {
      const out = execSync("ioreg -rd1 -c IOPlatformExpertDevice | awk '/IOPlatformUUID/{print $3}'")
        .toString().trim().replace(/"/g, '');
      if (out.length > 8) {
        return 'PHX-' + crypto.createHash('sha256').update(out).digest('hex').substring(0, 12).toUpperCase();
      }
    }
    // Fallback: Linux /etc/machine-id
    if (process.platform === 'linux') {
      const mid = fs.readFileSync('/etc/machine-id', 'utf8').trim();
      return 'PHX-' + crypto.createHash('sha256').update(mid).digest('hex').substring(0, 12).toUpperCase();
    }
    // Windows: wmic
    if (process.platform === 'win32') {
      const out = execSync('wmic csproduct get UUID').toString();
      const match = out.match(/[0-9A-F-]{36}/i);
      if (match) {
        return 'PHX-' + crypto.createHash('sha256').update(match[0]).digest('hex').substring(0, 12).toUpperCase();
      }
    }
  } catch { /* fall through */ }

  // Last resort: stable hash of hostname + username
  const stable = os.hostname() + os.userInfo().username;
  return 'PHX-' + crypto.createHash('sha256').update(stable).digest('hex').substring(0, 12).toUpperCase();
}

// ── License Validation (RSA) ─────────────────────────────────────────────────
// The backend Flask app is the authority. We also do a quick offline structural check here.
async function verifyLicenseWithBackend(key, machineId) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({ key, machine_id: machineId });
    const options = {
      hostname: 'localhost',
      port: backendPort,
      path: '/api/license/verify',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve({ valid: false, reason: 'Bad response' }); }
      });
    });
    req.on('error', () => resolve({ valid: false, reason: 'Backend unreachable' }));
    req.setTimeout(5000, () => { req.destroy(); resolve({ valid: false, reason: 'Timeout' }); });
    req.write(payload);
    req.end();
  });
}

// ── Find a free port ─────────────────────────────────────────────────────────
function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('listening', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.once('error', reject);
    server.listen(0, '127.0.0.1');
  });
}

// ── Wait for backend to be ready ─────────────────────────────────────────────
function waitForBackend(port, timeout = 45000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(`http://localhost:${port}/api/drives`, (res) => {
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Backend startup timeout'));
        } else {
          setTimeout(check, 600);
        }
      });
      req.setTimeout(2000, () => {
        req.destroy();
        if (Date.now() - start > timeout) {
          reject(new Error('Backend startup timeout'));
        } else {
          setTimeout(check, 600);
        }
      });
    };
    check();
  });
}

// ── Start Flask backend ───────────────────────────────────────────────────────
async function startBackend() {
  try {
    backendPort = await getFreePort();
  } catch {
    backendPort = 5001;
  }

  const backendDir = isDev
    ? path.join(__dirname, '..', '..', '..', 'backend')
    : path.join(process.resourcesPath, 'backend');

  const pythonPath = isDev
    ? path.join(backendDir, 'venv', 'bin', 'python3')
    : path.join(process.resourcesPath, 'backend', 'python', 'python3');

  const appPath = path.join(backendDir, 'app.py');

  console.log(`[Main] Backend dir: ${backendDir}`);
  console.log(`[Main] Starting backend on port ${backendPort}`);

  const env = {
    ...process.env,
    FLASK_ENV: isDev ? 'development' : 'production',
    PHOENIX_PORT: String(backendPort),
    // Point to bundled ffmpeg if in production
    PATH: isDev
      ? process.env.PATH
      : path.join(process.resourcesPath, 'bin') + ':' + process.env.PATH,
  };

  backendProcess = spawn(pythonPath, [appPath], {
    cwd: backendDir,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  backendProcess.stdout.on('data', (d) => console.log(`[Backend] ${d.toString().trimEnd()}`));
  backendProcess.stderr.on('data', (d) => console.log(`[Backend:err] ${d.toString().trimEnd()}`));

  backendProcess.on('error', (err) => {
    console.error('Failed to start backend:', err.message);
    if (mainWindow) {
      dialog.showErrorBox('Recovery Engine Error',
        `Could not start the recovery engine.\n\nNote: Scanning raw disks requires sudo privileges.\nRun the app with: sudo open -a "Phoenix Recovery"\n\nError: ${err.message}`
      );
    }
  });

  backendProcess.on('exit', (code) => {
    console.log(`[Main] Backend exited with code ${code}`);
  });

  try {
    await waitForBackend(backendPort);
    console.log(`[Main] Backend ready on port ${backendPort}`);
  } catch (err) {
    console.error('[Main] Backend failed to become ready:', err.message);
    dialog.showErrorBox('Backend Timeout',
      'The recovery engine took too long to start.\n\nThis may be a permissions issue. Try running Phoenix Recovery with admin/sudo privileges.'
    );
  }
}

// ── Create Window ─────────────────────────────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 880,
    minWidth: 960,
    minHeight: 640,
    title: 'Phoenix Recovery',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    backgroundColor: '#080c14',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${VITE_PORT}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => { mainWindow = null; });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// ── Application Menu ──────────────────────────────────────────────────────────
function createMenu() {
  const template = [
    {
      label: 'Phoenix Recovery',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Subscription & License...',
          click: () => mainWindow?.webContents.send('open-subscription'),
          accelerator: 'CmdOrCtrl+L',
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        isDev && { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ].filter(Boolean),
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Phoenix Recovery Website',
          click: () => shell.openExternal('https://phoenixrecovery.app'),
        },
        {
          label: 'Buy a License',
          click: () => shell.openExternal('https://phoenixrecovery.app/buy'),
        },
        { type: 'separator' },
        {
          label: 'Report a Bug',
          click: () => shell.openExternal('mailto:support@phoenixrecovery.app'),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ── IPC Handlers ──────────────────────────────────────────────────────────────
function registerIPCHandlers() {
  ipcMain.handle('get-machine-id', async () => {
    return await getRealMachineId();
  });

  ipcMain.handle('get-backend-port', () => backendPort);

  ipcMain.handle('open-external', (_, url) => {
    shell.openExternal(url);
  });

  ipcMain.handle('validate-license', async (_, { key, machineId }) => {
    return await verifyLicenseWithBackend(key, machineId);
  });

  ipcMain.handle('get-stored-license', () => {
    return readLicense();
  });

  ipcMain.handle('store-license', (_, data) => {
    writeLicense(data);
    return true;
  });

  ipcMain.handle('clear-license', () => {
    clearLicense();
    return true;
  });

  ipcMain.handle('get-app-version', () => app.getVersion());
}

// ── App Lifecycle ─────────────────────────────────────────────────────────────
app.whenReady().then(async () => {
  registerIPCHandlers();
  createMenu();
  await startBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (backendProcess) {
    console.log('[Main] Terminating backend...');
    backendProcess.kill('SIGTERM');
  }
});

app.on('will-quit', () => {
  if (backendProcess) {
    try { backendProcess.kill('SIGKILL'); } catch { /* gone */ }
  }
});
