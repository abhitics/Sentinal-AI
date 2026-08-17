import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  color?: string;
  trend?: number; // positive = up, negative = down
  trendLabel?: string;
  subtitle?: string;
  glowColor?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title, value, unit, icon: Icon, color = '#2563EB',
  trend, trendLabel, subtitle, glowColor, delay = 0,
}) => {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="card-base relative overflow-hidden cursor-default group"
      style={{
        boxShadow: glowColor
          ? `0 4px 24px rgba(0,0,0,0.3), 0 0 40px ${glowColor}15`
          : '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: color }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest">{title}</p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5 mb-2">
        <motion.span
          className="text-3xl font-bold text-text font-display"
          key={String(value)}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
        {unit && <span className="text-sm text-text-muted font-medium">{unit}</span>}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-text-muted mb-2">{subtitle}</p>
      )}

      {/* Trend */}
      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? 'text-success-500' : isNegative ? 'text-danger-500' : 'text-text-muted'
          }`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> :
             isNegative ? <TrendingDown className="w-3.5 h-3.5" /> :
             <Minus className="w-3.5 h-3.5" />}
            {Math.abs(trend)}%
          </div>
          {trendLabel && (
            <span className="text-xs text-text-dim">{trendLabel}</span>
          )}
        </div>
      )}

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
};

export default StatCard;
