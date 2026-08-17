import { motion } from 'framer-motion';
import { X, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { DUMMY_ALERTS } from '@/constants/dummyData';
import { formatDistanceToNow } from 'date-fns';

interface NotificationPanelProps {
  onClose: () => void;
}

const PRIORITY_ICON = {
  critical: <AlertTriangle className="w-4 h-4 text-danger-500" />,
  high: <AlertTriangle className="w-4 h-4 text-orange-500" />,
  medium: <Info className="w-4 h-4 text-warning-500" />,
  low: <Info className="w-4 h-4 text-secondary-400" />,
};

const PRIORITY_BG = {
  critical: 'bg-danger-500/10 border-danger-500/20',
  high: 'bg-orange-500/10 border-orange-500/20',
  medium: 'bg-warning-500/10 border-warning-500/20',
  low: 'bg-secondary-500/10 border-secondary-500/20',
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const recentAlerts = DUMMY_ALERTS.slice(0, 6);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="fixed right-0 top-0 h-full w-80 z-50 flex flex-col"
        style={{ background: 'rgba(9, 14, 28, 0.98)', borderLeft: '1px solid rgba(30,41,59,0.8)' }}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-primary-400" />
            <h2 className="font-semibold text-text">Notifications</h2>
            <span className="bg-danger-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {recentAlerts.filter(a => a.status === 'active').length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {recentAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-3 rounded-xl border ${PRIORITY_BG[alert.priority]} cursor-pointer hover:brightness-125 transition-all`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex-shrink-0">
                  {PRIORITY_ICON[alert.priority]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text leading-tight">{alert.title}</p>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{alert.description}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] text-text-dim">{alert.cameraName}</span>
                    <span className="text-[11px] text-text-dim">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              {alert.status === 'resolved' && (
                <div className="flex items-center gap-1 mt-2 text-xs text-success-500">
                  <CheckCircle className="w-3 h-3" />
                  Resolved
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <a
            href="/alerts"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary-600/20 border border-primary-600/30 text-primary-400 text-sm font-medium hover:bg-primary-600/30 transition-all duration-200"
          >
            View All Alerts
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default NotificationPanel;
