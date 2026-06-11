import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Camera } from '../CameraGrid';

interface IPAddressModalProps {
  onClose: () => void;
  onAdd: (camera: Camera) => void;
}

export function IPAddressModal({ onClose, onAdd }: IPAddressModalProps) {
  const [step, setStep] = useState<'input' | 'detect'>('input');
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [openPorts, setOpenPorts] = useState<number[]>([]);
  const [selectedPort, setSelectedPort] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDetectPorts = async () => {
    if (!ip) return;

    setLoading(true);
    try {
      const result = await window.electron?.checkCameraPort(ip);
      if (result?.openPorts) {
        setOpenPorts(result.openPorts);
        setStep('detect');
      }
    } catch (error) {
      console.error('Error detecting ports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCamera = () => {
    if (!ip) return;

    const portUrl = selectedPort || 80;
    const url = `http://${ip}:${portUrl}`;

    onAdd({
      id: Date.now().toString(),
      name: `Camera ${ip}`,
      url,
      status: 'loading',
      type: 'http',
    });
    onClose();
  };

  const copyUrl = (port: number) => {
    const url = `http://${ip}:${port}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'detect') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Detected Ports</h2>
            <button
              onClick={() => setStep('input')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-3">
            {openPorts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">No open ports detected</p>
                <p className="text-xs text-slate-500 mt-2">Try entering the port manually</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-300 mb-4">Open ports on {ip}:</p>
                {openPorts.map(port => (
                  <div
                    key={port}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedPort === port
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedPort(port)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-mono">:{port}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyUrl(port);
                        }}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">http://{ip}:{port}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="px-6 py-4 border-t border-slate-700 flex gap-3">
            <button
              onClick={() => setStep('input')}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleAddCamera}
              disabled={!selectedPort && openPorts.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Add Camera
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Add by IP Address</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Camera IP Address</label>
            <input
              type="text"
              value={ip}
              onChange={e => setIp(e.target.value)}
              placeholder="192.168.1.100"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-slate-400 mt-2">
              Enter the IP address of your network camera
            </p>
          </div>

          <div className="bg-slate-700/50 p-3 rounded-lg">
            <p className="text-xs text-slate-300">
              <span className="font-semibold">Common formats:</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">• 192.168.1.100</p>
            <p className="text-xs text-slate-400">• 10.0.0.50</p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDetectPorts}
            disabled={!ip || loading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? '...' : 'Detect Ports'}
          </button>
        </div>
      </div>
    </div>
  );
}
