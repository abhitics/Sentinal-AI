import React from 'react';
import { Settings, Save, Server, Shield, Bell, Users } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary-500" />
            System Settings
          </h2>
          <p className="text-sm text-text-muted mt-1">Configure SentinelAI pipeline and preferences</p>
        </div>
        <button className="btn-primary py-2 px-4 flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-500/10 border border-primary-500/30 rounded-xl text-primary-400 font-medium text-sm transition-colors text-left">
            <Server className="w-4 h-4" />
            Model & Pipeline
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface border border-transparent rounded-xl text-text-muted hover:bg-surface-hover font-medium text-sm transition-colors text-left">
            <Shield className="w-4 h-4" />
            Security Rules
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface border border-transparent rounded-xl text-text-muted hover:bg-surface-hover font-medium text-sm transition-colors text-left">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface border border-transparent rounded-xl text-text-muted hover:bg-surface-hover font-medium text-sm transition-colors text-left">
            <Users className="w-4 h-4" />
            User Management
          </button>
        </div>

        {/* Settings Form Content */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          <div className="card-base">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">YOLO26 Model Configuration</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Detection Model Path</label>
                  <input type="text" defaultValue="yolo26x.pt" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Pose Model Path</label>
                  <input type="text" defaultValue="yolo26x-pose.pt" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Compute Device</label>
                <select className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="cuda">CUDA (GPU)</option>
                  <option value="cpu">CPU</option>
                  <option value="mps">MPS (Apple Silicon)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Confidence Threshold (0.0 - 1.0)</label>
                  <input type="number" step="0.05" defaultValue="0.25" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">NMS IoU Threshold (0.0 - 1.0)</label>
                  <input type="number" step="0.05" defaultValue="0.45" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="card-base">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">Tracking Subsystem (ByteTrack)</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Enable Temporal Tracking</h4>
                  <p className="text-xs text-text-muted mt-1">Assign unique IDs across frames using ByteTrack</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border-text-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-checked:after:bg-white"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Draw Trajectories</h4>
                  <p className="text-xs text-text-muted mt-1">Visualize historical movement paths on feeds</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border-text-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-checked:after:bg-white"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
