import React, { useState, useEffect, useRef } from 'react';
import { Upload, ScanEye, Image as ImageIcon, Monitor, Activity, RefreshCw } from 'lucide-react';
import * as fabric from 'fabric';
import { useProject } from '../contexts/ProjectContext';

const checklistTags = ['B&W contrast', 'Mobile legibility', 'Context pop', 'File size <2MB'];

const Phase4QC: React.FC = () => {
  const { canvasState } = useProject();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [useCanvasSnapshot, setUseCanvasSnapshot] = useState(false);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setUseCanvasSnapshot(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadFromCanvas = () => {
    if (!canvasState || !tempCanvasRef.current) return;

    const tempCanvas = new fabric.Canvas(tempCanvasRef.current, {
      width: 1920,
      height: 1080,
    });

    tempCanvas.loadFromJSON(canvasState as any, () => {
      const dataUrl = tempCanvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      setImageSrc(dataUrl);
      setFileName('Live Canvas Snapshot');
      setUseCanvasSnapshot(true);
      tempCanvas.dispose();
    });
  };

  const reset = () => {
    setImageSrc(null);
    setFileName(null);
    setUseCanvasSnapshot(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <section className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-6 md:p-10 shadow-card-lg space-y-4">
        <div className="flex items-center gap-3 text-brand-yellow">
          <ScanEye className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 04 — Diagnostics</span>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-display text-white">The Squint Test Lab</h2>
          <p className="text-white/70">
            Upload your current thumbnail candidate and run it through three brutal tests: value, mobile, and shelf
            context. If it doesn’t survive here, it won’t survive the home feed.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {checklistTags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-[0.3em] text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <canvas ref={tempCanvasRef} className="hidden" />

      {!imageSrc ? (
        <div className="space-y-4">
          {canvasState && (
            <button
              onClick={loadFromCanvas}
              className="w-full rounded-3xl border border-brand-teal/40 bg-brand-teal/10 hover:bg-brand-teal/20 transition p-8 text-center space-y-3 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 text-brand-teal flex items-center justify-center mx-auto group-hover:scale-110 transition">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display text-white">Load from Live Canvas</h3>
              <p className="text-white/60 max-w-md mx-auto text-sm">
                Run diagnostics on your current editor composition.
              </p>
            </button>
          )}

          <label className="block rounded-3xl border-2 border-dashed border-white/10 bg-white/5 hover:border-white/40 transition p-12 text-center cursor-pointer space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display text-white">Upload thumbnail candidate</h3>
            <p className="text-white/60 max-w-md mx-auto text-sm">
              Drop in a 1920×1080 or 1280×720 JPG/PNG. We'll auto-run three lab diagnostics.
            </p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-white/70 font-mono">{fileName}</div>
            <button onClick={reset} className="text-xs uppercase tracking-[0.4em] text-red-300 hover:text-red-200">
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 space-y-3 shadow-inner">
              <div className="flex items-center gap-3 text-white">
                <ScanEye className="w-5 h-5 text-brand-yellow" />
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">Test 01</p>
                  <p className="font-display text-xl">B&W Check</p>
                </div>
              </div>
              <p className="text-xs text-white/60">
                Squint at it. If your main subject vanishes, your values are too similar.
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 relative group">
                <img src={imageSrc} alt="B&W check" className="w-full h-full object-cover grayscale contrast-125" />
                <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.4em] bg-black/70 px-2 py-1 rounded-full text-white/70">
                  Grayscale
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 space-y-3 shadow-inner">
              <div className="flex items-center gap-3 text-white">
                <ImageIcon className="w-5 h-5 text-brand-cyan" />
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">Test 02</p>
                  <p className="font-display text-xl">Mobile Zoom</p>
                </div>
              </div>
              <p className="text-xs text-white/60">
                Simulates 10% scale. Can a tired commuter read the typography?
              </p>
              <div className="aspect-video rounded-2xl border border-white/10 flex items-center justify-center bg-brand-midnight">
                <div className="w-[160px] md:w-[200px] rounded-2xl overflow-hidden shadow-glow ring-1 ring-white/10">
                  <img src={imageSrc} alt="Mobile check" className="w-full h-auto" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 space-y-3 shadow-inner">
              <div className="flex items-center gap-3 text-white">
                <Monitor className="w-5 h-5 text-brand-magenta" />
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">Test 03</p>
                  <p className="font-display text-xl">Shelf Context</p>
                </div>
              </div>
              <p className="text-xs text-white/60">
                Drop it in a fake feed. Does it pop against neutrals and bright competitors?
              </p>
              <div className="aspect-video rounded-2xl border border-white/10 bg-[#F5F5F5] p-4 flex gap-3">
                <div className="flex-1 space-y-2 opacity-40">
                  <div className="aspect-video bg-gray-300 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl relative">
                    <img src={imageSrc} alt="Context check" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black text-white px-1 rounded">10:24</span>
                  </div>
                  <div className="h-2 w-full bg-gray-800 rounded"></div>
                  <div className="h-2 w-1/2 bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 flex items-center gap-4 text-sm text-white/60">
            <Activity className="w-5 h-5 text-brand-yellow" />
            <p>
              Pro tip: screenshot the tests above and annotate issues for your editor. Iterate until all three chips glow.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase4QC;
