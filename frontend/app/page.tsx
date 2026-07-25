'use client'
import React, { useState, useRef } from "react";
import axios from "axios";

interface ResultType {
  score: number;
  label: string;
  regions: number;
  image?: string;
}

const App: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post<ResultType>(
        "http://localhost:5000/detect",
        formData
      );
      if (res.status === 500) {
        setResult({
          score: 5,
          label: "Error",
          regions: 2,
          image: "nil"
        });
      } else {
        setResult(res.data);
        setOutputImageUrl(`http://localhost:5000/output.jpg?t=${Date.now()}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to analyze image. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white font-sans">
      
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-blue-500/20 blur-[120px] pointer-events-none"></div>
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text mb-4 animate-pulse">
            SentinelAI
          </h1>
          <p className="text-slate-300 text-lg">Intelligent Human Activity Detection</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch relative z-10">
          {/* Left Column: Upload */}
          <div className="flex flex-col gap-6">
            <div 
              className={`relative flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
                ${dragActive ? 'border-cyan-400 bg-cyan-400/10 scale-[1.02]' : 'border-slate-600 hover:border-slate-400 bg-black/20 hover:bg-black/40'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
              
              {preview ? (
                <div className="absolute inset-0 group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black/70 px-4 py-2 rounded-full text-sm font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                  <svg className="w-14 h-14 mb-4 text-slate-500 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  <p className="font-semibold text-lg text-slate-300">Click or drag image to upload</p>
                  <p className="text-sm mt-2 opacity-75">Supports JPG, PNG, WEBP</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleUpload}
              disabled={!image || loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3
                ${!image || loading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-80' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white hover:-translate-y-1 hover:shadow-cyan-500/25'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Image...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Analyze Image
                </>
              )}
            </button>
          </div>

          {/* Right Column: Result */}
          <div className="flex flex-col h-full">
            <div className={`h-full flex flex-col justify-center bg-black/40 rounded-2xl p-8 border transition-all duration-700
              ${result ? 'border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)]' : 'border-white/5'}`}>
              
              {!result ? (
                <div className="text-center text-slate-500">
                  <svg className="w-20 h-20 mx-auto mb-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                  <p className="text-lg">Awaiting analysis results...</p>
                  <p className="text-sm mt-2 opacity-60">Upload an image to start detection.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <div className="text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold text-xs mb-6 uppercase tracking-widest shadow-inner">
                      Analysis Complete
                    </div>
                    
                    <div className="flex items-start justify-center gap-1 mb-2">
                      <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">{result.score}</span>
                      <span className="text-3xl font-bold text-cyan-500 mt-2">%</span>
                    </div>
                    <p className="text-slate-400 text-sm tracking-wide">Activity Likelihood Score</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-slate-300">Confidence</span>
                      <span className={`font-bold tracking-wide ${result.label === 'HIGH' ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]' : result.label === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {result.label}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-slate-300">Humans Detected</span>
                      <span className="font-bold text-white text-lg">{result.regions.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {outputImageUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      <img src={outputImageUrl} alt="Detection Result" className="w-full h-auto object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default App;