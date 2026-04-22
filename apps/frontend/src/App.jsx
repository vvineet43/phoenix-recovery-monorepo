import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  HardDrive, Key, Lock, Search, Download, Eye, Wrench, X, ShieldAlert,
  AlertCircle, CheckCircle, Database
} from 'lucide-react';

// ─── Backend API helper ──────────────────────────────────────────────────────
let API_BASE_CACHE = null;
async function getApiBase() {
  if (API_BASE_CACHE) return API_BASE_CACHE;
  try {
    if (window.phoenixAPI?.getBackendPort) {
      const port = await window.phoenixAPI.getBackendPort();
      API_BASE_CACHE = `http://localhost:${port}/api`;
    } else {
      API_BASE_CACHE = 'http://localhost:5001/api';
    }
  } catch {
    API_BASE_CACHE = 'http://localhost:5001/api';
  }
  return API_BASE_CACHE;
}

function resolveUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const base = API_BASE_CACHE ? API_BASE_CACHE.replace('/api', '') : 'http://localhost:5001';
  return base + url;
}

export default function App() {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scan state
  const [scanStatus, setScanStatus] = useState({
    is_scanning: false, is_paused: false,
    progress: 0, current_path: '',
    files_scanned: 0, time_remaining: 0,
    found_files: []
  });

  // License state
  const [machineId, setMachineId] = useState('');
  const [licenseInfo, setLicenseInfo] = useState(null);
  const isPro = !!(licenseInfo && licenseInfo.valid);
  const [showLicenseGate, setShowLicenseGate] = useState(null); // 'recover' | 'repair' | null
  const [activationKey, setActivationKey] = useState('');
  const [activationError, setActivationError] = useState('');

  // ── INIT ──
  useEffect(() => {
    async function initMachine() {
      try {
        if (window.phoenixAPI?.getMachineId) {
          const id = await window.phoenixAPI.getMachineId();
          setMachineId(id);
        } else {
          setMachineId('DEV-MACHINE-1234');
        }
      } catch { setMachineId('DEV-MACHINE-1234'); }
    }
    
    async function initLicense() {
      try {
        let stored = null;
        if (window.phoenixAPI?.getLicense) {
          stored = await window.phoenixAPI.getLicense();
        } else {
          const raw = localStorage.getItem('phx_license');
          if (raw) stored = JSON.parse(raw);
        }

        if (stored) {
          const base = await getApiBase();
          const res = await fetch(`${base}/license/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: stored.key_raw, machine_id: machineId || 'DEV' })
          });
          const data = await res.json();
          if (data.valid) {
            setLicenseInfo({ ...stored, ...data });
          } else {
            setLicenseInfo(null);
          }
        }
      } catch {
        // network issue, gracefully handle
      }
    }
    initMachine().then(initLicense);
  }, []);

  // ── DRIVES & SCAN ──
  useEffect(() => {
    async function fetchDrives() {
      try {
        const base = await getApiBase();
        const res = await fetch(`${base}/scan/devices`);
        const data = await res.json();
        setDrives(data);
        if (data.length > 0) setSelectedDrive(data[0]);
      } catch {
        setError('Failed to connect to recovery engine. Are you running as root?');
      }
      setLoading(false);
    }
    fetchDrives();
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const base = await getApiBase();
      const res = await fetch(`${base}/scan/status`);
      const data = await res.json();
      setScanStatus(data);
    } catch { }
  }, []);

  useEffect(() => {
    if (!scanStatus.is_scanning) return;
    const interval = setInterval(fetchStatus, 800);
    return () => clearInterval(interval);
  }, [scanStatus.is_scanning, fetchStatus]);

  const startScan = async () => {
    if (!selectedDrive) return;
    try {
      const base = await getApiBase();
      await fetch(`${base}/scan/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device: selectedDrive.device }),
      });
      setScanStatus(prev => ({ ...prev, is_scanning: true, found_files: [] }));
    } catch {
      setError('Could not start real disk scan');
    }
  };

  const stopScan = async () => {
    try {
      const base = await getApiBase();
      await fetch(`${base}/scan/stop`, { method: 'POST' });
    } catch { }
  };

  // ── ACTIONS ──
  const requestProAction = (actionType) => {
    if (isPro) return true;
    setShowLicenseGate(actionType);
    return false;
  };

  const handleDownload = (file) => {
    if (!requestProAction('recover')) return;
    window.location.href = resolveUrl(file.download_url);
  };

  const handleRepair = (file) => {
    if (!requestProAction('repair')) return;
    // Real repair call would happen here
    alert(`Repairing ${file.name} using Pro engine`);
  };

  const handlePreview = (file) => {
    if (!requestProAction('preview')) return;
    window.open(resolveUrl(file.url), '_blank');
  };

  const handleActivate = async () => {
    setActivationError('');
    if (!activationKey.trim()) { setActivationError('Enter a key'); return; }
    
    try {
      const base = await getApiBase();
      const res = await fetch(`${base}/license/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: activationKey.trim(), machine_id: machineId })
      });
      const data = await res.json();
      
      if (data.valid) {
        setLicenseInfo({ key_raw: activationKey, valid: true, ...data });
        setShowLicenseGate(null);
      } else {
        setActivationError(data.reason || 'Invalid key');
      }
    } catch {
      setActivationError('Connection error');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#151515', color: '#f5f5f7', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* ── TOOLBAR ── */}
      <div style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', backgroundColor: '#202020', borderBottom: '1px solid #323232' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '2rem' }}>
          <ShieldAlert color="#0a84ff" size={24} />
          <h1 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Phoenix Recovery</h1>
        </div>

        <select 
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #323232', background: '#2c2c2e', color: '#fff', marginRight: '1rem', flex: 1, maxWidth: '300px' }}
          onChange={(e) => setSelectedDrive(drives.find(d => d.device === e.target.value))}
          value={selectedDrive?.device || ''}
          disabled={scanStatus.is_scanning}
        >
          {loading ? <option>Loading Drives...</option> : null}
          {drives.map(d => (
            <option key={d.device} value={d.device}>
              {d.display_name} ({d.readable_size})
            </option>
          ))}
        </select>

        {!scanStatus.is_scanning ? (
          <button 
            onClick={startScan}
            style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', background: '#0a84ff', color: 'white', border: 'none', fontWeight: '500', cursor: 'pointer' }}>
            <Search size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}/> Scan Drive
          </button>
        ) : (
          <button 
            onClick={stopScan}
            style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', background: '#ff453a', color: 'white', border: 'none', fontWeight: '500', cursor: 'pointer' }}>
            Stop Scan
          </button>
        )}

        <div style={{ flex: 1 }} />

        {isPro ? (
          <span style={{ fontSize: '0.85rem', color: '#32d74b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle size={14} /> Registered User
          </span>
        ) : (
          <button 
            onClick={() => setShowLicenseGate('generic')}
            style={{ padding: '0.4rem 1rem', borderRadius: '6px', background: 'transparent', color: '#0a84ff', border: '1px solid #0a84ff', fontSize: '0.85rem', cursor: 'pointer' }}>
            <Key size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}/> Activate
          </button>
        )}
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Left pane: Scan Status */}
        <div style={{ width: '280px', borderRight: '1px solid #323232', backgroundColor: '#1c1c1e', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#8e8e93', marginBottom: '1rem', letterSpacing: '0.05em' }}>Scan Status</h2>
          
          <div style={{ background: '#2c2c2e', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{Math.round(scanStatus.progress || 0)}%</div>
            <div style={{ fontSize: '0.85rem', color: '#8e8e93' }}>Complete</div>
            
            <div style={{ height: '4px', background: '#444', borderRadius: '2px', marginTop: '0.75rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${scanStatus.progress || 0}%`, background: '#0a84ff' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: '#8e8e93', display: 'block' }}>Files Found</span>
              <strong>{scanStatus.found_files.length}</strong>
            </div>
            <div>
              <span style={{ color: '#8e8e93', display: 'block' }}>Sectors Scanned</span>
              <strong>{scanStatus.files_scanned?.toLocaleString() || 0}</strong>
            </div>
          </div>
        </div>

        {/* Right pane: Results Table */}
        <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#151515', position: 'relative' }}>
          {error ? (
            <div style={{ padding: '2rem', color: '#ff453a', textAlign: 'center' }}>{error}</div>
          ) : scanStatus.found_files.length === 0 ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#8e8e93' }}>
              <Database size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>No files found. Select a drive and click Scan.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#202020', boxShadow: '0 1px 0 #323232' }}>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', color: '#8e8e93', fontWeight: 500 }}>Filename</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#8e8e93', fontWeight: 500 }}>Size</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#8e8e93', fontWeight: 500 }}>Type</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#8e8e93', fontWeight: 500 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scanStatus.found_files.map((file, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #252525' }}>
                    <td style={{ padding: '0.5rem 1rem', color: '#fff' }}>{file.name}</td>
                    <td style={{ padding: '0.5rem 1rem', color: '#8e8e93' }}>{file.size}</td>
                    <td style={{ padding: '0.5rem 1rem', color: '#8e8e93' }}>{file.extension?.toUpperCase() || '-'}</td>
                    <td style={{ padding: '0.5rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handlePreview(file)} style={{ padding: '4px 8px', background: '#323232', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Eye size={12} /></button>
                        <button onClick={() => handleRepair(file)} style={{ padding: '4px 8px', background: '#323232', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Wrench size={12} /></button>
                        <button onClick={() => handleDownload(file)} style={{ padding: '4px 8px', background: '#323232', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Download size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── PRO GATE MODAL ── */}
      {showLicenseGate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#202020', border: '1px solid #323232', borderRadius: '12px', padding: '2rem', width: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
            <button onClick={() => setShowLicenseGate(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#8e8e93', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(10, 132, 255, 0.1)', borderRadius: '50%', color: '#0a84ff', marginBottom: '1rem' }}>
                <Lock size={32} />
              </div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Activation Required</h2>
              <p style={{ color: '#8e8e93', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Scanning is free, but you need a Pro License to {showLicenseGate === 'generic' ? 'access all tool features' : showLicenseGate} files.
              </p>
            </div>

            <div style={{ background: '#151515', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#8e8e93', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Have a key?</div>
              <input 
                value={activationKey}
                onChange={e => setActivationKey(e.target.value)}
                placeholder="Paste key here"
                style={{ width: '100%', padding: '0.75rem', background: '#2c2c2e', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
              {activationError && <div style={{ color: '#ff453a', fontSize: '0.8rem', marginTop: '0.5rem' }}>{activationError}</div>}
              <button 
                onClick={handleActivate}
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.75rem', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' }}>
                Activate License
              </button>
            </div>

            <a 
              href="https://lifetools.lemonsqueezy.com" 
              target="_blank" rel="noreferrer"
              style={{ display: 'block', textAlign: 'center', color: '#0a84ff', textDecoration: 'none', fontSize: '0.9rem' }}>
              Don't have a key? Buy online &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
