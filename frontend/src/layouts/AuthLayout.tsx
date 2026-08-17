import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '@/constants';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />
        {/* Animated orb */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-16 h-16 bg-primary-600/20 border border-primary-600/40 rounded-2xl flex items-center justify-center glow-primary">
              <Shield className="w-8 h-8 text-primary-400" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl font-display font-bold text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {APP_NAME}
          </motion.h1>

          <motion.p
            className="text-text-muted text-lg max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {APP_TAGLINE}
          </motion.p>

          {/* Feature bullets */}
          <motion.div
            className="mt-12 space-y-4 text-left max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              'AI-powered human detection',
              'All-weather surveillance',
              'Real-time threat alerts',
              'Multi-camera management',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-text-muted text-sm">
                <div className="w-5 h-5 rounded-full bg-primary-600/20 border border-primary-600/40 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary-400" />
                </div>
                {feature}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
