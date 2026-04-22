/**
 * preload.js — Secure Context Bridge
 * Exposes only specific, safe APIs from Electron/Node to the renderer process.
 * nodeIntegration remains false; contextIsolation remains true.
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('phoenixAPI', {
  // Get real hardware Machine ID from main process
  getMachineId: () => ipcRenderer.invoke('get-machine-id'),

  // Get the backend port assigned at startup
  getBackendPort: () => ipcRenderer.invoke('get-backend-port'),

  // Open external URL safely in the system browser
  openExternal: (url) => ipcRenderer.invoke('open-external', url),

  // License management
  validateLicense: (key, machineId) => ipcRenderer.invoke('validate-license', { key, machineId }),
  getStoredLicense: () => ipcRenderer.invoke('get-stored-license'),
  storeLicense: (licenseData) => ipcRenderer.invoke('store-license', licenseData),
  clearLicense: () => ipcRenderer.invoke('clear-license'),

  // OS / App info
  getPlatform: () => process.platform,
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
});
