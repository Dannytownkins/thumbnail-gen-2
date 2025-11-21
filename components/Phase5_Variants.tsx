import React, { useState, useRef } from 'react';
import { CheckSquare, FileOutput, Split, Gauge, Sparkles, RefreshCw, X } from 'lucide-react';
import * as fabric from 'fabric';
import { useProject } from '../contexts/ProjectContext';
import { critiqueThumbnail } from '../services/geminiService';

const specList = [
  { label: 'Resolution', detail: '1920×1080 or 1280×720' },
  { label: 'File Size', detail: '< 2MB (JPG preferred)' },
  { label: 'Color', detail: 'sRGB, gamma 2.2, sharpen on export' },
  { label: 'Naming', detail: 'Topic_Emotion_V1.jpg' },
];

const Phase5_Variants: React.FC = () => {
  const { canvasState, variants, addVariant, removeVariant } = useProject();
  const [loading, setLoading] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentSnapshot, setCurrentSnapshot] = useState<string | null>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null);

  const generateCritique = async () => {
    if (!canvasState || !tempCanvasRef.current) return;

    setLoading(true);
    setCritique(null);
    setSuggestions([]);

    try {
      // Generate snapshot
      const tempCanvas = new fabric.Canvas(tempCanvasRef.current, {
        width: 1920,
        height: 1080,
      });

      tempCanvas.loadFromJSON(canvasState as any, async () => {
        const dataUrl = tempCanvas.toDataURL({
          format: 'png',
          quality: 1,
        });
        setCurrentSnapshot(dataUrl);

        // Get AI critique
        const result = await critiqueThumbnail(dataUrl);
        setCritique(result.critique);
        setSuggestions(result.suggestions);
        tempCanvas.dispose();
        setLoading(false);
      });
    } catch (error) {
      console.error('Critique error:', error);
      setLoading(false);
    }
  };

  const saveAsVariant = () => {
    if (!canvasState || !currentSnapshot) return;

    addVariant({
      name: `Variant ${variants.length + 1}`,
      canvasState: canvasState,
      thumbnail: currentSnapshot,
    });
  };

  const exportThumbnail = (dataUrl: string, name: string) => {
    const link = document.createElement('a');
    link.download = `${name.replace(/\s+/g, '_')}_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <canvas ref={tempCanvasRef} className="hidden" />

      <section className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-6 md:p-10 shadow-card-lg space-y-4">
        <div className="flex items-center gap-3 text-brand-yellow">
          <FileOutput className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 05 — Export & A/B</span>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-display text-white">Package it like a launch</h2>
          <p className="text-white/70">
            Get AI critique on your current design, save variants for A/B testing, and export when ready.
          </p>
        </div>
      </section>

      {/* AI Critique Section */}
      {canvasState && (
        <div className="rounded-3xl border border-brand-teal/30 bg-brand-teal/10 backdrop-blur-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-brand-teal" />
              <h3 className="font-display text-2xl text-white">AI Thumbnail Critique</h3>
            </div>
            <button
              onClick={generateCritique}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-red text-brand-obsidian font-semibold shadow-glow disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Get Critique
                </>
              )}
            </button>
          </div>

          {critique && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/70 leading-relaxed">{critique}</p>
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-white uppercase tracking-[0.3em]">Suggestions</p>
                  {suggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal text-brand-obsidian flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-white/80">{suggestion}</p>
                    </div>
                  ))}
                </div>
              )}

              {currentSnapshot && (
                <button
                  onClick={saveAsVariant}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-brand-obsidian font-semibold"
                >
                  <Split className="w-4 h-4" />
                  Save as Variant
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-5 shadow-card-lg">
          <div className="flex items-center gap-3 text-brand-cyan">
            <Gauge className="w-5 h-5" />
            <h3 className="font-display text-2xl text-white">Technical spec checklist</h3>
          </div>
          <ul className="space-y-4">
            {specList.map((spec) => (
              <li key={spec.label} className="flex items-start gap-3 text-sm">
                <CheckSquare className="w-4 h-4 text-white/40 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{spec.label}</p>
                  <p className="text-white/60">{spec.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6 shadow-card-lg">
          <div className="flex items-center gap-3 text-brand-yellow">
            <Split className="w-5 h-5" />
            <h3 className="font-display text-2xl text-white">Saved Variants</h3>
            <span className="text-xs text-white/40">({variants.length})</span>
          </div>

          {variants.length === 0 ? (
            <p className="text-white/60 text-sm text-center py-8">
              No variants saved yet. Use AI critique to generate and save different versions.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="relative group rounded-2xl border border-white/10 overflow-hidden"
                >
                  <img
                    src={variant.thumbnail}
                    alt={variant.name}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                    <button
                      onClick={() => exportThumbnail(variant.thumbnail, variant.name)}
                      className="px-3 py-1 rounded-full bg-white text-brand-obsidian text-xs font-semibold"
                    >
                      Export
                    </button>
                    <button
                      onClick={() => removeVariant(variant.id)}
                      className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/70 text-white text-[10px] font-mono">
                    {variant.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-brand-yellow/20 bg-brand-yellow/10 p-6 text-center space-y-3">
        <p className="text-brand-yellow text-sm uppercase tracking-[0.4em]">Final truth</p>
        <p className="text-white/80 text-lg font-display">
          "A mediocre idea with flawless polish still fails. A brilliant hook with chaos-level polish can still win."
        </p>
      </div>
    </div>
  );
};

export default Phase5_Variants;

