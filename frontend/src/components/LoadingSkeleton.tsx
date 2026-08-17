import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'full' | 'card' | 'table';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ variant = 'full' }) => {
  if (variant === 'full') {
    return (
      <div className="fixed inset-0 bg-[#020617] z-50 flex flex-col items-center justify-center">
        {/* Pulsing glow background */}
        <div className="absolute w-80 h-80 bg-primary-600/10 rounded-full blur-3xl" />
        
        {/* Pulsing shield logo */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-20 h-20 bg-primary-600/20 border border-primary-600/40 rounded-2xl flex items-center justify-center glow-primary"
        >
          <Shield className="w-10 h-10 text-primary-400" />
        </motion.div>
        
        {/* Shimmer loading text */}
        <div className="mt-6 text-sm font-semibold tracking-widest text-text-muted uppercase relative z-10">
          <span className="inline-block skeleton h-4 w-32 rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="space-y-4 w-full">
        <div className="skeleton h-10 w-full rounded-xl" />
        <div className="skeleton h-8 w-full rounded-xl" />
        <div className="skeleton h-8 w-full rounded-xl" />
        <div className="skeleton h-8 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="card-base w-full space-y-4">
      <div className="flex items-center gap-3">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-3 w-1/4 rounded" />
        </div>
      </div>
      <div className="skeleton h-48 w-full rounded-xl" />
    </div>
  );
};

export default LoadingSkeleton;
