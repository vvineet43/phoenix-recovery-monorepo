import React, { useState, useEffect, useCallback } from "react";
import {
  HardDrive,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  Key,
  Cpu,
  Shield,
  ShieldAlert,
  Zap,
  Wrench,
  Lock,
  ArrowRight,
  FileText,
  LifeBuoy,
  Eye,
  Download,
  X,
} from "lucide-react";

let cachedApiBase = null;
async function getApiBase() {
  if (cachedApiBase) return cachedApiBase;
  try {
    if (window.phoenixAPI?.getBackendPort) {
      const port = await window.phoenixAPI.getBackendPort();
      cachedApiBase = `http://localhost:${port}/api`;
    } else {
      cachedApiBase = "http://localhost:5001/api";
    }
  } catch {
    cachedApiBase = "http://localhost:5001/api";
  }
  return cachedApiBase;
}

function resolveBackendUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = cachedApiBase ? cachedApiBase.replace("/api", "") : "http://localhost:5001";
  return base + path;
}

export default function App() {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [loadingDrives, setLoadingDrives] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [scanStatus, setScanStatus] = useState({
    is_scanning: false,
    is_paused: false,
    progress: 0,
    current_path: "",
    files_scanned: 0,
    time_remaining: 0,
    found_files: [],
  });
  const [trial, setTrial] = useState(null);
  const [machineId, setMachineId] = useState("");
  const [license, setLicense] = useState(null);
  const isPro = !!(license && license.valid);
  const [modalType, setModalType] = useState(null);
  const [licenseInput, setLicenseInput] = useState("");
  const [licenseError, setLicenseError] = useState("");

  useEffect(() => {
    async function initMachineId() {
      try {
        if (window.phoenixAPI?.getMachineId) {
          const id = await window.phoenixAPI.getMachineId();
          setMachineId(id);
          return id;
        }
      } catch {
        // fallback
      }
      setMachineId("DEV-MACHINE-1234");
      return "DEV-MACHINE-1234";
    }

    async function initLicense(resolvedMachineId) {
      try {
        let stored = null;
        const getter = window.phoenixAPI?.getStoredLicense || window.phoenixAPI?.getLicense;
        if (getter) {
          stored = await getter();
        } else {
          const raw = localStorage.getItem("phx_license");
          if (raw) stored = JSON.parse(raw);
        }
        if (stored) {
          const api = await getApiBase();
          const res = await fetch(`${api}/license/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key: stored.key_raw || stored.key,
              machine_id: resolvedMachineId || "DEV",
            }),
          });
          const data = await res.json();
          if (data.valid) {
            setLicense({ ...stored, ...data });
          } else {
            setLicense(null);
          }
        }
      } catch {
        // ignore
      }
    }

    async function initTrial() {
      try {
        if (window.phoenixAPI?.getTrialStatus) {
          const t = await window.phoenixAPI.getTrialStatus();
          setTrial(t);
        }
      } catch {
        // ignore
      }
    }

    initMachineId().then(initLicense).then(initTrial);
    const unsub = window.phoenixAPI?.onOpenSubscription?.(() => setModalType("generic"));
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  useEffect(() => {
    async function loadDrives() {
      try {
        const api = await getApiBase();
        const res = await fetch(`${api}/drives`);
        const list = await res.json();
        setDrives(list);
        if (list.length > 0) setSelectedDrive(list[0]);
      } catch {
        setErrorMsg("Failed to connect to recovery engine. Are you running as root?");
      }
      setLoadingDrives(false);
    }
    loadDrives();
  }, []);

  const pollScanStatus = useCallback(async () => {
    try {
      const api = await getApiBase();
      const res = await fetch(`${api}/scan/status`);
      const status = await res.json();
      setScanStatus(status);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    pollScanStatus();
  }, [pollScanStatus]);

  useEffect(() => {
    if (!scanStatus.is_scanning) return;
    const timer = setInterval(pollScanStatus, 800);
    return () => clearInterval(timer);
  }, [scanStatus.is_scanning, pollScanStatus]);

  const handleStartScan = async () => {
    if (!selectedDrive) return;
    try {
      const api = await getApiBase();
      await fetch(`${api}/scan/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device: selectedDrive.device }),
      });
      setScanStatus((prev) => ({ ...prev, is_scanning: true, found_files: [] }));
    } catch {
      setErrorMsg("Could not start real disk scan");
    }
  };

  const handleStopScan = async () => {
    try {
      setScanStatus((prev) => ({
        ...prev,
        is_scanning: false,
        current_stage: "⏹ Scan Stopped",
      }));
      const api = await getApiBase();
      await fetch(`${api}/scan/stop`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  const handleRecover = (file) => {
    if (isPro) {
      window.location.href = resolveBackendUrl(file.download_url);
      return;
    }
    const maxFreeBytes = 10 * 1024 * 1024;
    if ((file.size_bytes ?? file.size) > maxFreeBytes) {
      setModalType("recover_size");
      return;
    }
    let used = [];
    try {
      const raw = localStorage.getItem("nexdata_free_downloads");
      if (raw) used = JSON.parse(raw);
    } catch {
      // ignore
    }
    if (!used.includes(file.name) && used.length >= 1) {
      setModalType("recover");
      return;
    }
    window.location.href = resolveBackendUrl(file.download_url);
    if (!used.includes(file.name)) {
      used.push(file.name);
      localStorage.setItem("nexdata_free_downloads", JSON.stringify(used));
    }
  };

  const handleRepair = async (file) => {
    if (!isPro) {
      setModalType("repair");
      return;
    }
    try {
      const api = await getApiBase();
      const res = await fetch(`${api}/repair/${encodeURIComponent(file.name)}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      await pollScanStatus();
      alert(data.message || `Repaired ${file.name}`);
    } catch {
      alert("Failed to repair file.");
    }
  };

  const handlePreview = (file) => {
    window.open(resolveBackendUrl(file.url), "_blank");
  };

  const handleActivateLicense = async () => {
    setLicenseError("");
    if (!licenseInput.trim()) {
      setLicenseError("Enter a key");
      return;
    }
    try {
      const api = await getApiBase();
      const res = await fetch(`${api}/license/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: licenseInput.trim(), machine_id: machineId }),
      });
      const data = await res.json();
      if (data.valid) {
        const record = { key_raw: licenseInput.trim(), valid: true, ...data };
        setLicense(record);
        localStorage.setItem("phx_license", JSON.stringify(record));
        const saver = window.phoenixAPI?.storeLicense || window.phoenixAPI?.saveLicense;
        if (saver) {
          try {
            await saver(record);
          } catch {
            // ignore
          }
        }
        setModalType(null);
      } else {
        setLicenseError(data.reason || "Invalid key");
      }
    } catch {
      setLicenseError("Connection error");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-app)",
        color: "var(--text-main)",
        fontFamily: "var(--font-main)",
      }}
    >
      <div
        style={{
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginRight: "2.5rem",
          }}
        >
          <div
            style={{
              background: "var(--primary)",
              padding: "0.4rem",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px var(--primary-glow)",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "22px", height: "22px", objectFit: "contain" }}
            />
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                margin: 0,
                color: "var(--text-main)",
              }}
            >
              NexData Recovery
            </h1>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-dim)",
                fontWeight: 500,
              }}
            >
              Pro Edition
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flex: 1,
            maxWidth: "400px",
          }}
        >
          <HardDrive size={18} color="var(--text-dim)" />
          <select
            style={{
              padding: "0.6rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-app)",
              color: "var(--text-main)",
              flex: 1,
              fontSize: "0.9rem",
              fontWeight: 500,
              outline: "none",
              cursor: "pointer",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
            }}
            onChange={(e) =>
              setSelectedDrive(drives.find((d) => d.device === e.target.value))
            }
            value={selectedDrive?.device || ""}
            disabled={scanStatus.is_scanning}
          >
            {loadingDrives ? <option>Loading Connected Drives...</option> : null}
            {drives.map((d) => (
              <option key={d.device} value={d.device}>
                {d.display_name} ({d.readable_size})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: "1rem" }}>
          {scanStatus.is_scanning ? (
            <button
              onClick={handleStopScan}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "8px",
                background: "var(--accent-rose)",
                color: "white",
                border: "none",
                fontWeight: "600",
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 12px rgba(239,68,68,0.25)",
                transition: "all 0.2s",
              }}
            >
              <RefreshCw size={16} style={{ animation: "spin 2s linear infinite" }} />{" "}
              Stop Scan
            </button>
          ) : (
            <button
              onClick={handleStartScan}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "8px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                fontWeight: "600",
                fontSize: "0.9rem",
                cursor: selectedDrive ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 12px var(--primary-glow)",
                transition: "all 0.2s",
              }}
              disabled={!selectedDrive}
            >
              <Search size={16} /> Start Deep Scan
            </button>
          )}
        </div>

        <div style={{ flex: 1 }} />

        {isPro ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.8rem",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "20px",
              color: "var(--accent-emerald)",
            }}
          >
            <CheckCircle size={14} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              Lifetime Pro Active
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {trial && !trial.isExpired && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--accent-amber)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                <Clock size={15} /> {trial.daysRemaining} days left in trial
              </div>
            )}
            <button
              onClick={() => setModalType("generic")}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "8px",
                background: "transparent",
                color: "var(--primary)",
                border: "1.5px solid var(--primary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Key size={14} style={{ verticalAlign: "middle", marginRight: "0.4rem" }} />{" "}
              Activate Pro
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div
          style={{
            width: "300px",
            borderRight: "1px solid var(--border)",
            backgroundColor: "var(--bg-surface-2)",
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "0.85rem",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "1.25rem",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              System Overview
            </h2>
            {scanStatus.is_scanning ? (
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontWeight: 500 }}>
                    Scan Progress
                  </span>
                  <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--primary)" }}>
                    {Math.round(scanStatus.progress || 0)}%
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "var(--bg-surface-hover)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${scanStatus.progress || 0}%`,
                      background: "var(--primary)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      padding: "0.5rem",
                      background: "rgba(15, 23, 42, 0.05)",
                      borderRadius: "8px",
                      color: "var(--primary)",
                    }}
                  >
                    <Cpu size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontWeight: 500 }}>
                      Hardware Lock ID
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--text-main)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {machineId || "PHX-HOST-ID"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ color: "var(--text-dim)" }}>Connected Disks</span>
                  <strong style={{ color: "var(--text-main)" }}>{drives.length} Detected</strong>
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                padding: "1.25rem",
                borderRadius: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", fontWeight: 500 }}>
                  Files Found
                </span>
                <span
                  style={{
                    background: "var(--primary-glow)",
                    color: "var(--primary)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {scanStatus.found_files.length}
                </span>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", fontWeight: 500 }}>
                  Sectors Scanned
                </span>
                <span
                  style={{
                    color: "var(--text-main)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {scanStatus.files_scanned?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              padding: "1.25rem",
              borderRadius: "12px",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--primary)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              <Shield size={16} /> Deep-Sector Carving
            </div>
            Bypasses the OS file system to directly reconstruct lost headers from raw magnetic sectors.
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "var(--bg-app)",
            position: "relative",
          }}
        >
          {errorMsg || scanStatus.error ? (
            <div
              style={{
                padding: "4rem 2rem",
                color: "var(--accent-rose)",
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  borderRadius: "50%",
                  display: "inline-flex",
                  marginBottom: "1.5rem",
                }}
              >
                <ShieldAlert size={44} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-main)" }}>
                Administrator Privileges Required
              </h3>
              <p style={{ whiteSpace: "pre-line", lineHeight: 1.6, color: "var(--text-secondary)", fontSize: "1rem" }}>
                {errorMsg || scanStatus.error}
              </p>
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.25rem",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                  color: "var(--text-main)",
                  userSelect: "all",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                }}
              >
                sudo open -a &quot;NexData Recovery&quot;
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginTop: "1rem" }}>
                Copy and run the command above in Terminal to launch with raw disk access.
              </p>
            </div>
          ) : scanStatus.found_files.length === 0 ? (
            <div style={{ padding: "3rem 4rem", maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ marginBottom: "3rem", textAlign: "left" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "var(--primary-glow)",
                    color: "var(--primary)",
                    padding: "0.4rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                  }}
                >
                  <Zap size={14} /> Next-Gen Recovery Engine v2.0
                </div>
                <h2
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  Professional Data Recovery &amp; Media Reconstruction
                </h2>
                <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "700px", lineHeight: 1.6 }}>
                  Select a drive from the toolbar above to initiate deep raw sector carving. Our AI-assisted engine reconstructs fragmented video streams, photos, and documents instantly.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem",
                      background: "rgba(15, 23, 42, 0.05)",
                      borderRadius: "12px",
                      display: "inline-flex",
                      color: "var(--primary)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <HardDrive size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.5rem" }}>
                    Deep Sector Carving
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Bypasses corrupted partition tables to extract lost files directly from raw magnetic disk sectors.
                  </p>
                </div>

                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem",
                      background: "rgba(16, 185, 129, 0.1)",
                      borderRadius: "12px",
                      display: "inline-flex",
                      color: "var(--accent-emerald)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Wrench size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.5rem" }}>
                    AI Media Repair
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Advanced stream remuxing and binary header patching for corrupted MP4s, MOV videos, and JPEG photos.
                  </p>
                </div>

                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem",
                      background: "rgba(245, 158, 11, 0.1)",
                      borderRadius: "12px",
                      display: "inline-flex",
                      color: "var(--accent-amber)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Lock size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.5rem" }}>
                    100% Local &amp; Secure
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Your private files never leave your machine. All scanning, carving, and repair happens locally.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-2) 100%)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.5rem" }}>
                    Ready to recover your data?
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "450px", margin: 0, lineHeight: 1.5 }}>
                    {selectedDrive
                      ? `Selected: ${selectedDrive.display_name} (${selectedDrive.readable_size}). Click start to begin.`
                      : "Select a target drive from the top toolbar to unlock deep scanning."}
                  </p>
                </div>
                <button
                  onClick={handleStartScan}
                  disabled={!selectedDrive}
                  style={{
                    padding: "0.8rem 2rem",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: selectedDrive ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 6px 20px var(--primary-glow)",
                    opacity: selectedDrive ? 1 : 0.7,
                    transition: "all 0.2s",
                  }}
                >
                  Start Deep Scan <ArrowRight size={18} />
                </button>
              </div>

              <div
                style={{
                  marginTop: "3rem",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                }}
              >
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <FileText size={14} /> Documentation
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <LifeBuoy size={14} /> 24/7 Expert Support
                  </span>
                </div>
                <div>&copy; 2026 TheNexTools. All rights reserved.</div>
              </div>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "var(--bg-surface)",
                  boxShadow: "0 1px 0 var(--border)",
                  zIndex: 10,
                }}
              >
                <tr>
                  <th style={{ padding: "0.85rem 1.5rem", color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                    Filename
                  </th>
                  <th style={{ padding: "0.85rem 1.5rem", color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                    Size
                  </th>
                  <th style={{ padding: "0.85rem 1.5rem", color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                    Type
                  </th>
                  <th style={{ padding: "0.85rem 1.5rem", color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {scanStatus.found_files.map((file, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: idx % 2 === 0 ? "var(--bg-app)" : "var(--bg-surface-2)",
                      transition: "background 0.2s",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.75rem 1.5rem",
                        color: "var(--text-main)",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          padding: "0.4rem",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          color: "var(--primary)",
                        }}
                      >
                        <FileText size={16} />
                      </div>
                      {file.name}
                    </td>
                    <td style={{ padding: "0.75rem 1.5rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                      {file.size}
                    </td>
                    <td style={{ padding: "0.75rem 1.5rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.6rem",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {file.extension?.toUpperCase() || "-"}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => handlePreview(file)}
                          title="Preview File"
                          style={{
                            padding: "0.4rem 0.75rem",
                            background: "var(--bg-surface)",
                            color: "var(--text-main)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                          }}
                        >
                          <Eye size={14} /> Preview
                        </button>
                        <button
                          onClick={() => handleRepair(file)}
                          title="Advanced Repair"
                          style={{
                            padding: "0.4rem 0.75rem",
                            background: "var(--bg-surface)",
                            color: "var(--text-main)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                          }}
                        >
                          <Wrench size={14} /> Repair
                        </button>
                        <button
                          onClick={() => handleRecover(file)}
                          title="Recover File"
                          style={{
                            padding: "0.4rem 0.75rem",
                            background: "var(--primary)",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            boxShadow: "0 2px 6px var(--primary-glow)",
                          }}
                        >
                          <Download size={14} /> Recover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalType && (() => {
        const info =
          modalType === "recover"
            ? {
                title: "Free Limit Reached",
                desc: "You have already recovered 1 free file. Upgrade to Pro to recover unlimited files.",
              }
            : modalType === "recover_size"
            ? {
                title: "File Exceeds Free Limit",
                desc: "Free recovery is limited to files under 10MB. Upgrade to Pro to recover files of any size.",
              }
            : modalType === "repair"
            ? {
                title: "Pro Feature Required",
                desc: "File repair is a premium feature. Upgrade to Pro to repair corrupt videos, photos, and files.",
              }
            : {
                title: "Activation Required",
                desc: "Scanning is free, but you need a Pro License to access all premium recovery features.",
              };
        return (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "2.5rem",
                width: "420px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setModalType(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-dim)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    padding: "1rem",
                    background: "var(--primary-glow)",
                    borderRadius: "50%",
                    color: "var(--primary)",
                    marginBottom: "1rem",
                  }}
                >
                  <Lock size={32} />
                </div>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                  {info.title}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  {info.desc}
                </p>
              </div>
              <div
                style={{
                  background: "var(--bg-app)",
                  padding: "1.25rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-dim)",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Have a key?
                </div>
                <input
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(e.target.value)}
                  placeholder="Paste key here"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--text-main)",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                  }}
                />
                {licenseError && (
                  <div style={{ color: "var(--accent-rose)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                    {licenseError}
                  </div>
                )}
                <button
                  onClick={handleActivateLicense}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    marginTop: "0.75rem",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Activate License
                </button>
              </div>
              <a
                href={`https://store.thenextools.com/checkout/buy/dc65d7a1-8030-4e2c-9b29-328989852cd5?checkout[custom][machine_id]=${machineId}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "var(--primary)",
                  textDecoration: "underline",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Don&apos;t have a key? Buy online &rarr;
              </a>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
