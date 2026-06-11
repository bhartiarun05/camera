import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CameraGrid } from './components/CameraGrid';
import { Activity, Users, Settings, HardDrive, Bell, LayoutDashboard } from 'lucide-react';

type TabType = 'dashboard' | 'cameras' | 'recordings' | 'users' | 'activity' | 'notifications' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('cameras');
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    if (window.electron?.getAppVersion) {
      window.electron.getAppVersion().then(setAppVersion);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'cameras':
        return <CameraGrid />;

      case 'dashboard':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Online Cameras', value: '4', color: 'green' },
                { title: 'Recording Cameras', value: '3', color: 'blue' },
                { title: 'Storage Used', value: '1.2 TB', color: 'yellow' },
                { title: 'System Health', value: '98%', color: 'purple' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-${stat.color}-500/30 transition-all`}
                >
                  <p className={`text-sm font-semibold text-${stat.color}-400`}>{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'recordings':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="flex items-center gap-3 mb-8">
              <HardDrive className="text-blue-400" size={32} />
              <h1 className="text-3xl font-bold text-white">Recordings</h1>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
              <p className="text-slate-400">No recordings yet</p>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-blue-400" size={32} />
              <h1 className="text-3xl font-bold text-white">Users</h1>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
              <p className="text-slate-400">Manage user accounts and permissions</p>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="text-blue-400" size={32} />
              <h1 className="text-3xl font-bold text-white">Activity Log</h1>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
              <div className="space-y-4">
                {[
                  { time: '14:32', event: 'Camera 1 - Motion detected' },
                  { time: '14:28', event: 'Camera 2 - Stream started' },
                  { time: '14:15', event: 'System - Backup completed' },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-slate-700/50 last:border-0">
                    <p className="text-sm text-slate-500 font-mono">{log.time}</p>
                    <p className="text-sm text-slate-300">{log.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="flex items-center gap-3 mb-8">
              <Bell className="text-blue-400" size={32} />
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
              <p className="text-slate-400">No new notifications</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="text-blue-400" size={32} />
              <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>
            <div className="max-w-2xl space-y-6">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Application</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Version</span>
                    <span className="text-slate-400">{appVersion || '1.0.0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Theme</span>
                    <span className="text-slate-400">Dark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <CameraGrid />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
