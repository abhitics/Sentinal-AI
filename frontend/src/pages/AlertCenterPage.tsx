import React from 'react';
import { ShieldAlert, Filter, Search, MoreVertical, CheckCircle2 } from 'lucide-react';

const mockAlerts = [
  { id: 1, type: 'Unauthorized Entry', location: 'Server Room', time: '10 mins ago', severity: 'high', status: 'unread' },
  { id: 2, type: 'Crowd Gathering', location: 'Main Lobby', time: '25 mins ago', severity: 'medium', status: 'unread' },
  { id: 3, type: 'Camera Offline', location: 'Parking P2', time: '1 hour ago', severity: 'high', status: 'read' },
  { id: 4, type: 'Suspicious Behavior', location: 'Loading Dock', time: '2 hours ago', severity: 'medium', status: 'read' },
  { id: 5, type: 'Perimeter Breach', location: 'North Fence', time: '5 hours ago', severity: 'high', status: 'read' },
];

const AlertCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-danger-500" />
            Alert Center
          </h2>
          <p className="text-sm text-text-muted mt-1">Manage and respond to system events</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-white w-64"
            />
          </div>
          <button className="btn-secondary py-2 px-4 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="card-base p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Location</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Time</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Severity</th>
                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockAlerts.map((alert) => (
                <tr key={alert.id} className={`hover:bg-surface/30 transition-colors ${alert.status === 'unread' ? 'bg-primary-500/5' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {alert.status === 'unread' && <div className="w-2 h-2 rounded-full bg-primary-500"></div>}
                      <span className={`text-sm font-medium ${alert.status === 'unread' ? 'text-white' : 'text-text-muted'}`}>
                        {alert.type}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-text-muted">{alert.location}</td>
                  <td className="p-4 text-sm text-text-muted">{alert.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      alert.severity === 'high' ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30' : 
                      'bg-warning-500/20 text-warning-400 border border-warning-500/30'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="text-text-muted hover:text-success-400 transition-colors" title="Mark as resolved">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="text-text-muted hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-text-muted">
          <span>Showing 1 to 5 of 24 alerts</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface border border-border rounded hover:bg-surface-hover">Prev</button>
            <button className="px-3 py-1 bg-surface border border-border rounded hover:bg-surface-hover">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCenterPage;
