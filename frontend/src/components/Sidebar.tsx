import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Camera, History, BarChart3, Map,
  Bell, Settings, Shield, ChevronLeft, ChevronRight,
  Activity, Zap,
} from 'lucide-react';
import { useAlerts } from '@/hooks';
import { APP_NAME } from '@/constants';

const NAV = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/live-camera', icon: Camera, label: 'Live Camera' },
  { path: '/detections', icon: History, label: 'Detections' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/map', icon: Map, label: 'Map' },
  { path: '/alerts', icon: Bell, label: 'Alert Center' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { data: alerts } = useAlerts({ status: 'active' });
  const activeAlertCount = alerts?.filter(a => a.status === 'active').length ?? 0;

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full z-40 flex flex-col"
      style={{ background: 'rgba(9, 14, 28, 0.95)', borderRight: '1px solid rgba(30,41,59,0.8)' }}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border/50">
        <div className="w-9 h-9 bg-primary-600/20 border border-primary-600/40 rounded-xl flex items-center justify-center flex-shrink-0 glow-primary">
          <Shield className="w-5 h-5 text-primary-400" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-bold text-gradient font-display whitespace-nowrap">{APP_NAME}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                <span className="text-xs text-text-muted whitespace-nowrap">System Online</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* System Status Mini */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mt-3 p-3 rounded-xl bg-primary-600/10 border border-primary-600/20"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Activity className="w-3.5 h-3.5 text-secondary-400" />
                <span>AI Engine</span>
              </div>
              <span className="text-success-500 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1.5">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Zap className="w-3.5 h-3.5 text-warning-500" />
                <span>Processing</span>
              </div>
              <span className="text-text font-medium">28.4 FPS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const badge = label === 'Alert Center' && activeAlertCount > 0 ? activeAlertCount : null;

          return (
            <NavLink key={path} to={path}>
              <motion.div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative ${
                  isActive
                    ? 'bg-primary-600/20 text-white border border-primary-600/30'
                    : 'text-text-muted hover:text-text hover:bg-white/5'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                style={isActive ? { boxShadow: '0 0 15px rgba(37,99,235,0.2)' } : {}}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-400 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative flex-shrink-0">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
                  {badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {badge > 9 ? '9+' : badge}
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-border/50">
        <motion.button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-text-muted hover:text-text hover:bg-white/5 transition-all duration-200 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs"
                >
                  Collapse
                </motion.span>
              </AnimatePresence>
            </>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
