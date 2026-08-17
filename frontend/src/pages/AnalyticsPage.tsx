import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, Users, ShieldAlert, TrendingUp } from 'lucide-react';

const mockActivityData = [
  { time: '00:00', detections: 12, alerts: 2 },
  { time: '04:00', detections: 8, alerts: 1 },
  { time: '08:00', detections: 45, alerts: 5 },
  { time: '12:00', detections: 67, alerts: 12 },
  { time: '16:00', detections: 89, alerts: 15 },
  { time: '20:00', detections: 34, alerts: 4 },
  { time: '23:59', detections: 15, alerts: 2 },
];

const mockZoneData = [
  { zone: 'Main Gate', traffic: 145 },
  { zone: 'Server Room', traffic: 12 },
  { zone: 'Perimeter Alpha', traffic: 67 },
  { zone: 'Loading Dock', traffic: 89 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold font-display text-white">System Analytics</h2>
          <p className="text-sm text-text-muted mt-1">Intelligence overview and historical trends</p>
        </div>
        <select className="bg-card border border-border rounded-lg px-4 py-2 text-xs text-text-muted focus:outline-none focus:border-primary-600/50">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Over Time Chart */}
        <div className="card-base">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-primary-400" />
            Detection & Alert Trends
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '0.75rem' }}
                  itemStyle={{ fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                <Area type="monotone" dataKey="detections" name="Total Detections" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorDetections)" />
                <Area type="monotone" dataKey="alerts" name="Threat Alerts" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone Traffic Chart */}
        <div className="card-base">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-secondary-400" />
            Zone Traffic Distribution
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockZoneData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="zone" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{ fill: '#0f172a' }}
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '0.75rem' }}
                  itemStyle={{ fontSize: '12px', color: '#8b5cf6' }}
                />
                <Bar dataKey="traffic" name="Foot Traffic" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <div className="bg-primary-600/10 border border-primary-600/30 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary-600/20 rounded-full blur-xl group-hover:bg-primary-600/30 transition-all" />
            <Activity className="w-6 h-6 text-primary-400 mb-3" />
            <h4 className="text-white font-bold mb-1">Peak Activity</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Highest foot traffic detected between <strong className="text-white">14:00</strong> and <strong className="text-white">16:30</strong> at Main Gate.
            </p>
          </div>
          <div className="bg-danger-500/10 border border-danger-500/30 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-danger-500/20 rounded-full blur-xl group-hover:bg-danger-500/30 transition-all" />
            <ShieldAlert className="w-6 h-6 text-danger-500 mb-3" />
            <h4 className="text-white font-bold mb-1">Anomaly Detected</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              24% increase in <strong className="text-white">Unauthorized Zone Entry</strong> alerts compared to last week.
            </p>
          </div>
          <div className="bg-success-500/10 border border-success-500/30 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-success-500/20 rounded-full blur-xl group-hover:bg-success-500/30 transition-all" />
            <Users className="w-6 h-6 text-success-500 mb-3" />
            <h4 className="text-white font-bold mb-1">System Efficiency</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              YOLO26 pipeline maintaining average latency of <strong className="text-white">1.8ms</strong> with 99.9% uptime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
