import React, { useState } from 'react';
import { useDetections } from '@/hooks';
import { History, Search, AlertCircle, FileSpreadsheet, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const DetectionHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [threatFilter, setThreatFilter] = useState<string>('');
  const { data: response, isLoading } = useDetections({
    search: searchQuery,
    threatLevel: threatFilter as any,
    page: 1,
    pageSize: 10
  });

  return (
    <div className="space-y-6">
      {/* Header action bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search cameras or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/60 border border-border rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary-600/50"
            />
          </div>

          <select
            value={threatFilter}
            onChange={(e) => setThreatFilter(e.target.value)}
            className="bg-card/60 border border-border rounded-xl px-4 py-2 text-xs text-text-muted focus:outline-none focus:border-primary-600/50"
          >
            <option value="">All Threat Levels</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
            <option value="NONE">None</option>
          </select>
        </div>

        <button className="btn-ghost flex items-center gap-2 py-2 px-4 text-xs font-semibold w-full sm:w-auto justify-center">
          <FileSpreadsheet className="w-4 h-4" />
          Export Spreadsheet
        </button>
      </div>

      {/* History table */}
      <div className="card-base p-0 overflow-hidden border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Camera Feed</th>
                <th>Location</th>
                <th>Humans</th>
                <th>Activity Score</th>
                <th>Threat Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-xs text-text-muted">
                    Decrypting threat logs...
                  </td>
                </tr>
              ) : response?.data && response.data.length > 0 ? (
                response.data.map((det) => (
                  <tr key={det.id}>
                    <td>
                      <span className="text-white font-medium">
                        {format(new Date(det.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                      </span>
                    </td>
                    <td><span className="text-white font-semibold">{det.cameraName}</span></td>
                    <td>{det.location}</td>
                    <td>
                      <span className="text-white font-bold">{det.humanCount}</span>
                    </td>
                    <td>
                      <span className="font-semibold text-primary-400">{det.activityScore}%</span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        det.threatLevel === 'HIGH' ? 'bg-danger-500/10 text-danger-500 border border-danger-500/20' :
                        det.threatLevel === 'MEDIUM' ? 'bg-warning-500/10 text-warning-500 border border-warning-500/20' :
                        'bg-success-500/10 text-success-500 border border-success-500/20'
                      }`}>
                        {det.threatLevel}
                      </span>
                    </td>
                    <td>
                      <button className="p-1.5 rounded-lg hover:bg-danger-500/10 text-text-muted hover:text-danger-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-xs text-text-muted">
                    No detections match the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetectionHistoryPage;
