import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, Cpu, Zap, Activity, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_NAME, APP_TAGLINE, TECHNOLOGIES, FEATURES } from '@/constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-text overflow-hidden relative flex flex-col justify-between">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600/20 border border-primary-600/40 rounded-xl flex items-center justify-center glow-primary">
            <Shield className="w-5 h-5 text-primary-400" />
          </div>
          <span className="font-display font-bold text-lg text-gradient">{APP_NAME}</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="btn-ghost py-2 px-5 text-sm flex items-center gap-1"
        >
          Sign In
        </button>
      </header>

      {/* Hero section */}
      <main className="max-w-7xl mx-auto w-full px-6 py-12 relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/15 border border-primary-600/30 rounded-full text-xs font-semibold text-primary-400 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              YOLO26 & ByteTrack Enabled
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold font-display leading-tight text-white">
              Seeing Beyond Visibility, <br />
              <span className="text-gradient">Detecting Beyond Boundaries</span>
            </h1>
            
            <p className="text-text-muted text-lg leading-relaxed max-w-xl">
              Next-generation video surveillance intelligence. SentinelAI leverages YOLO26 keypoint pose extraction, ByteTrack trajectory calculation, and a multi-timescale temporal event engine to deliver proactive risk detection.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary py-3 px-8 flex items-center gap-2 text-sm"
              >
                Access Control Console
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-ghost py-3 px-8 text-sm"
              >
                Request Authorization
              </button>
            </div>
          </div>

          {/* Right Hero / Visual Dashboard Mock */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl p-6 border border-primary-600/35 glow-primary overflow-hidden relative group">
              {/* Scanline Animation */}
              <div className="scan-line h-64 rounded-xl border border-border/80 bg-slate-950/60 overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#090e1c] flex items-center justify-center">
                  <Shield className="w-20 h-20 text-primary-500/20 animate-pulse" />
                </div>
                {/* Simulated bounding boxes */}
                <div className="absolute top-12 left-24 border-2 border-success-500 rounded p-1 w-20 h-40">
                  <span className="absolute top-0 left-0 bg-success-500 text-[9px] text-white px-1 leading-none">T-17 | Running</span>
                </div>
                <div className="absolute top-28 right-20 border-2 border-danger-500 rounded p-1 w-24 h-24">
                  <span className="absolute top-0 left-0 bg-danger-500 text-[9px] text-white px-1 leading-none">T-21 | Loitering</span>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-slate-950/40 border border-border/50 p-3 rounded-xl text-center">
                  <p className="text-[10px] text-text-muted uppercase font-bold">Accuracy</p>
                  <p className="text-lg font-bold font-display text-primary-400">94.7%</p>
                </div>
                <div className="bg-slate-950/40 border border-border/50 p-3 rounded-xl text-center">
                  <p className="text-[10px] text-text-muted uppercase font-bold">Latency</p>
                  <p className="text-lg font-bold font-display text-secondary-400">1.7ms</p>
                </div>
                <div className="bg-slate-950/40 border border-border/50 p-3 rounded-xl text-center">
                  <p className="text-[10px] text-text-muted uppercase font-bold">Threats</p>
                  <p className="text-lg font-bold font-display text-danger-500">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mt-24 grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div key={i} className="card-base p-6 hover:border-primary-600/30 transition-all group duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-950/50 flex items-center justify-center border border-border mb-4 group-hover:border-primary-600/40 transition-colors">
                <Activity className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-6 border-t border-border/40 relative z-10 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
        <p>© 2026 SentinelAI Operations. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-text">Security Protocol</a>
          <a href="#" className="hover:text-text">API Access</a>
          <a href="#" className="hover:text-text">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
