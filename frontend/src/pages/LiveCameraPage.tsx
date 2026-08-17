import React, { useState } from 'react';
import { useCameras } from '@/hooks';
import { Camera, Zap, Shield, Play, Pause, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/StatCard';

const LiveCameraPage: React.FC = () => {
  const { data: cameras } = useCameras();
  const [selectedCamera, setSelectedCamera] = useState<string>('cam-001');

  const currentCam = cameras?.find(c => c.id === selectedCamera);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Stream Player */}
        <div className="lg:col-span-8 space-y-4">
          <div className="card-base p-0 overflow-hidden relative border-primary-600/20">
            {/* Player Frame */}
            <div className="aspect-video bg-slate-950 flex items-center justify-center relative group overflow-hidden">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-border">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase">{currentCam?.name || 'Gate Alpha'}</span>
              </div>

              {/* Simulated stream background */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090e1c]">
                <Shield className="w-16 h-16 text-primary-500/20 mb-3 animate-pulse" />
                <p className="text-xs text-text-muted">Simulating Live Video Stream (30 FPS)</p>
              </div>

              {/* Bounding box animation overlays */}
              <div className="absolute top-20 left-40 border border-success-500 w-24 h-48 rounded">
                <span className="absolute top-0 left-0 bg-success-500 text-[8px] text-white px-1 leading-none">T-102 | Walking</span>
              </div>
              <div className="absolute bottom-28 right-32 border border-warning-500 w-20 h-40 rounded">
                <span className="absolute top-0 left-0 bg-warning-500 text-[8px] text-white px-1 leading-none">T-105 | Standby</span>
              </div>
            </div>

            {/* Stream Info Bar */}
            <div className="p-4 bg-card/60 border-t border-border flex items-center justify-between text-xs text-text-muted">
              <div className="flex gap-4">
                <span>FPS: <strong className="text-white">{currentCam?.fps || 30}</strong></span>
                <span>Resolution: <strong className="text-white">{currentCam?.resolution || '4K (3840×2160)'}</strong></span>
                <span>Uptime: <strong className="text-white">{currentCam?.uptime || 99.2}%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                <span className="text-success-400 font-medium capitalize">{currentCam?.status || 'online'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Camera Selector List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card-base">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Camera className="w-4.5 h-4.5 text-primary-400" />
              Active Cameras ({cameras?.length || 0})
            </h3>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {cameras?.map((cam) => (
                <div
                  key={cam.id}
                  onClick={() => setSelectedCamera(cam.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedCamera === cam.id
                      ? 'bg-primary-600/10 border-primary-600/50'
                      : 'bg-card border-border hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{cam.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      cam.status === 'online' || cam.status === 'recording' ? 'bg-success-500' :
                      cam.status === 'degraded' ? 'bg-warning-500' : 'bg-danger-500'
                    }`} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-text-muted mt-2">
                    <span>{cam.location}</span>
                    <span className="capitalize">{cam.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveCameraPage;
