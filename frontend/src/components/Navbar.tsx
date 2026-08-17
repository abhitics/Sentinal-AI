import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell, Search, User, ChevronDown, LogOut, Settings,
  Shield, RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAlerts } from '@/hooks';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/live-camera': 'Live Camera Feed',
  '/detections': 'Detection History',
  '/analytics': 'Analytics',
  '/map': 'Interactive Map',
  '/alerts': 'Alert Center',
  '/settings': 'Settings',
};

interface NavbarProps {
  onNotifClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNotifClick }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { data: alerts } = useAlerts({ status: 'active' });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeAlertCount = alerts?.filter(a => a.status === 'active').length ?? 0;
  const title = PAGE_TITLES[location.pathname] || 'SentinelAI';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b border-border/50 sticky top-0 z-30"
      style={{ background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)' }}
    >
      {/* Left: Page title */}
      <div>
        <h1 className="text-lg font-semibold text-text">{title}</h1>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
          <span>Real-time monitoring active</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center">
        <motion.div
          className="relative"
          animate={{ width: searchFocused ? 280 : 220 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search cameras, detections..."
            className="w-full bg-card/60 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary-600/60 transition-all duration-200"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </motion.div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Refresh */}
        <motion.button
          onClick={handleRefresh}
          className="p-2 rounded-xl text-text-muted hover:text-text hover:bg-white/5 transition-all duration-200"
          whileTap={{ scale: 0.9 }}
          title="Refresh data"
        >
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.8 }}>
            <RefreshCw className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Notifications */}
        <motion.button
          onClick={onNotifClick}
          className="relative p-2 rounded-xl text-text-muted hover:text-text hover:bg-white/5 transition-all duration-200"
          whileTap={{ scale: 0.9 }}
        >
          <Bell className="w-5 h-5" />
          {activeAlertCount > 0 && (
            <motion.span
              className="absolute top-1 right-1 w-4 h-4 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {activeAlertCount > 9 ? '9+' : activeAlertCount}
            </motion.span>
          )}
        </motion.button>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(p => !p)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-600/30 border border-primary-600/40 flex items-center justify-center text-primary-300 text-xs font-bold">
              {user?.name?.charAt(0) ?? 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-text leading-none">{user?.name ?? 'User'}</p>
              <p className="text-xs text-text-muted capitalize mt-0.5">{user?.role ?? 'operator'}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {userMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute right-0 top-full mt-2 w-52 glass-card rounded-xl py-1.5 z-50"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <div className="px-4 py-2.5 border-b border-border/50 mb-1">
                <p className="text-sm font-semibold text-text">{user?.name}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
              <a href="/settings" className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-muted hover:text-text hover:bg-white/5 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </a>
              <a href="/" className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-muted hover:text-text hover:bg-white/5 transition-colors">
                <Shield className="w-4 h-4" />
                About SentinelAI
              </a>
              <div className="border-t border-border/50 mt-1 pt-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-danger-500 hover:bg-danger-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
