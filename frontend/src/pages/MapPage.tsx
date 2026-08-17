import React from 'react';
import { Map, MapPin, Navigation, Layers } from 'lucide-react';

const MapPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Interactive Map</h2>
          <p className="text-sm text-text-muted mt-1">Spatial intelligence and camera locations</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary py-2 px-3 text-xs flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Layers
          </button>
          <button className="btn-primary py-2 px-3 text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Add Camera
          </button>
        </div>
      </div>

      <div className="flex-1 card-base p-0 relative overflow-hidden border border-border/50 rounded-xl group">
        {/* Placeholder for actual interactive map (e.g., Leaflet or Mapbox) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        
        <div className="absolute inset-0 bg-background/60"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

        {/* Mock Map Points */}
        <div className="absolute top-1/4 left-1/3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-50" />
            <div className="w-4 h-4 bg-primary-500 rounded-full relative z-10 border-2 border-background" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface border border-border px-3 py-1.5 rounded shadow-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <span className="font-bold text-white block">Main Gate Cam</span>
              <span className="text-success-500">Active</span>
            </div>
          </div>
        </div>

        <div className="absolute top-2/3 left-1/2 group cursor-pointer">
          <div className="relative">
             <div className="absolute inset-0 bg-danger-500 rounded-full animate-ping opacity-50" />
            <div className="w-4 h-4 bg-danger-500 rounded-full relative z-10 border-2 border-background" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface border border-danger-500/30 px-3 py-1.5 rounded shadow-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <span className="font-bold text-white block">Loading Dock</span>
              <span className="text-danger-500">Alert</span>
            </div>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <button className="w-10 h-10 bg-surface/80 backdrop-blur-md border border-border rounded-lg flex items-center justify-center text-white hover:bg-surface transition-colors shadow-lg">
            +
          </button>
          <button className="w-10 h-10 bg-surface/80 backdrop-blur-md border border-border rounded-lg flex items-center justify-center text-white hover:bg-surface transition-colors shadow-lg">
            -
          </button>
          <button className="w-10 h-10 bg-surface/80 backdrop-blur-md border border-border rounded-lg flex items-center justify-center text-white hover:bg-surface transition-colors shadow-lg mt-2">
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        {/* Info Panel Overlay */}
        <div className="absolute top-6 left-6 w-64 bg-surface/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-2xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Map className="w-4 h-4 text-primary-400" />
            Map Legend
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-text-muted">Active Camera</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
              <span className="text-text-muted">Active Alert</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
              <span className="text-text-muted">High Traffic Zone</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapPage;
