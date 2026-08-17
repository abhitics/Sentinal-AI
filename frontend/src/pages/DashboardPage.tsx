import React, { useState } from 'react';
import { useStats, useAlerts } from '@/hooks';
import { detectionApi } from '@/services/api';
import StatCard from '@/components/StatCard';
import { 
  Shield, Users, Bell, Cpu, Zap, Activity, 
  UploadCloud, AlertTriangle, Eye, ArrowRight, CheckCircle2 
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { ImageAnalysisResponse } from '@/types';

const DashboardPage: React.FC = () => {
  const { data: stats, refetch: refetchStats } = useStats();
  const { data: activeAlerts, refetch: refetchAlerts } = useAlerts({ status: 'active' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [outputImageUrl, setOutputImageUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select an image file first.');
      return;
    }
    
    setIsUploading(true);
    setAnalysisResult(null);
    
    try {
      // Call the evolved API endpoint on port 5000/v1/analyze/image
      const result = await detectionApi.analyzeImage(selectedFile, 'cam-001', 1);
      setAnalysisResult(result);
      
      // Update output image source to force reload (avoid browser caching)
      // Node backend gateway serves output.jpg at GET /output.jpg
      const cacheBustUrl = `http://localhost:5000/output.jpg?t=${Date.now()}`;
      setOutputImageUrl(cacheBustUrl);
      
      toast.success('Inference complete! Bounding boxes, poses, and trajectories parsed.');
      refetchStats();
      refetchAlerts();
    } catch (err: any) {
      console.error(err);
      toast.error('AI pipeline execution failed. Verify Python and Express servers are running.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Humans Tracked"
          value={analysisResult ? analysisResult.regions_detected : (stats?.liveHumanCount ?? 12)}
          icon={Users}
          color="#10B981"
          trend={8}
          trendLabel="since last check"
          glowColor="#10B981"
        />
        <StatCard
          title="Threat Level Score"
          value={analysisResult ? `${analysisResult.score}%` : "74%"}
          icon={Shield}
          color={analysisResult && analysisResult.score > 70 ? "#EF4444" : "#F59E0B"}
          subtitle={analysisResult ? `${analysisResult.label} ACTIVITY` : "MEDIUM ACTIVITY"}
          glowColor="#F59E0B"
        />
        <StatCard
          title="Active System Alerts"
          value={analysisResult ? analysisResult.events.length : (activeAlerts?.length ?? 4)}
          icon={Bell}
          color="#EF4444"
          trend={-12}
          trendLabel="resolved today"
          glowColor="#EF4444"
        />
        <StatCard
          title="Perception Latency"
          value="1.7"
          unit="ms"
          icon={Cpu}
          color="#06B6D4"
          subtitle="YOLO26 Inference (CPU)"
          glowColor="#06B6D4"
        />
      </div>

      {/* Main Grid: Upload & Feed view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Drag & Drop upload + analysis interface */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-base relative">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary-400" />
              Upload Image to AI Pipeline
            </h3>

            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-border/80 hover:border-primary-600/50 rounded-xl p-8 text-center transition-colors relative bg-card/40">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-12 h-12 text-text-muted mx-auto mb-2 group-hover:text-primary-500 transition-colors" />
                <p className="text-sm text-text font-medium">
                  {selectedFile ? selectedFile.name : 'Drag and drop or click to upload file'}
                </p>
                <p className="text-xs text-text-muted mt-1">Supports JPG, PNG, WEBP up to 10MB</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm"
                >
                  {isUploading ? 'Executing YOLO26 Pipeline...' : 'Run Intelligence Pipeline'}
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Visual Output Display */}
          {(analysisResult || outputImageUrl) && (
            <div className="card-base overflow-hidden">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary-400" />
                AI Bounding Box & Skeleton Frame Overlay
              </h3>
              
              <div className="scan-line rounded-xl border border-border bg-[#020617] flex justify-center overflow-hidden">
                <img 
                  src={outputImageUrl} 
                  alt="Inference Output" 
                  className="max-h-[500px] w-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Targets, Active Events & Metrics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Events / Alerts */}
          <div className="card-base">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4.5 h-4.5 text-danger-500" />
              Active Event Logger
            </h3>
            
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {analysisResult && analysisResult.events.length > 0 ? (
                analysisResult.events.map((event, idx) => (
                  <div key={idx} className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-xl flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-danger-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase">{event.type.replace('_', ' ')}</p>
                      <p className="text-xs text-text-muted mt-0.5">{event.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 border border-success-500/20 bg-success-500/5 rounded-xl flex items-center gap-3 text-success-500">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-semibold">No anomalous behavior flagged. System secure.</span>
                </div>
              )}
            </div>
          </div>

          {/* Tracked Target Attributes */}
          <div className="card-base">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-primary-400" />
              Tracked Target Registry
            </h3>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {analysisResult && analysisResult.persons.length > 0 ? (
                analysisResult.persons.map((person, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/40 border border-border/50 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">Track ID: T-{person.track_id || 'U'}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        person.activity.label === 'falling' ? 'bg-danger-500/20 text-danger-500' :
                        person.activity.label === 'running' ? 'bg-warning-500/20 text-warning-500' :
                        'bg-success-500/20 text-success-500'
                      }`}>
                        {person.activity.label.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-text-muted">
                      <div>
                        Velocity: <span className="text-white font-medium">{person.motion.velocity} m/s</span>
                      </div>
                      <div>
                        Direction: <span className="text-white font-medium">{person.motion.direction}°</span>
                      </div>
                      <div className="col-span-2">
                        Zone: <span className={`font-semibold ${person.zone.inside ? 'text-danger-500' : 'text-text-muted'}`}>
                          {person.zone.name} ({person.zone.inside ? 'RESTRICTED' : 'CLEAR'})
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-text-muted">
                  No active tracking targets recorded.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
