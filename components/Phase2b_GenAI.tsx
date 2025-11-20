import React, { useState, useRef } from 'react';
import { generateThumbnailImage } from '../services/geminiService';
import {
  Sparkles,
  Download,
  Image as ImageIcon,
  AlertCircle,
  Wand2,
  X,
  Upload,
  Timer,
  History,
} from 'lucide-react';

const Phase2bGenAI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '9:16'>('16:9');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateThumbnailImage(prompt, aspectRatio, referenceImage || undefined);
      setGeneratedImage(result);
      setHistory((prev) => [prompt.trim(), ...prev].slice(0, 4));
    } catch (e: any) {
      setError(e.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setReferenceImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearReferenceImage = () => {
    setReferenceImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-carbon/70 via-brand-obsidian/60 to-brand-midnight p-6 md:p-10 shadow-card-lg space-y-4 relative overflow-hidden">
        <div className="absolute -top-12 right-0 w-72 h-72 bg-brand-magenta/30 blur-[140px] opacity-70"></div>
        <div className="relative flex items-center gap-3 text-brand-cyan">
          <Sparkles className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 02.5 — GenAI Forge</span>
        </div>
        <div className="relative space-y-3">
          <h2 className="text-3xl md:text-4xl font-display text-white">Fabricate props or rewrite reality</h2>
          <p className="text-white/70">
            Use Gemini 2.5 Flash Image for reference-guided edits or Imagen 4 for wild concepts.
            Keep prompts specific about lighting, lens choice, and the emotional read.
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-5 shadow-inner">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.4em] text-white/40 flex items-center justify-between">
                Reference Image
                <span className="text-white/30 normal-case text-[10px]">Optional</span>
              </label>
              {!referenceImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-2xl p-4 h-28 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-white/40 text-white/50"
                >
                  <Upload className="w-5 h-5" />
                  Tap to upload frame
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                  <img src={referenceImage} alt="Reference" className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition" />
                  <button
                    onClick={clearReferenceImage}
                    className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-2 right-2 px-2 py-1 text-[10px] uppercase tracking-[0.3em] bg-black/60 rounded-full text-white/80">
                    Ref
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.4em] text-white/40">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  referenceImage
                    ? "Describe the edit (e.g. 'Add glowing red aura, stormy sky, cinematic rim light')"
                    : "Describe the scene (e.g. 'Terrified astronaut floating in deep space, neon rim light, 50mm lens, 8k render')"
                }
                className="min-h-[140px] rounded-2xl bg-black/40 border border-white/10 text-white p-4 focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 outline-none resize-none text-sm"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Aspect Ratio</p>
              <div className="grid grid-cols-3 gap-2">
                {(['16:9', '1:1', '9:16'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`rounded-2xl py-2 text-sm font-semibold border transition ${
                      aspectRatio === ratio
                        ? 'bg-gradient-to-r from-brand-cyan to-brand-yellow text-brand-obsidian border-transparent shadow-glow'
                        : 'border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full rounded-2xl py-3 font-semibold text-brand-obsidian bg-gradient-to-r from-brand-cyan to-brand-yellow flex items-center justify-center gap-2 shadow-glow disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? 'Processing…' : (
                <>
                  <Wand2 className="w-4 h-4" /> {referenceImage ? 'Edit image' : 'Generate asset'}
                </>
              )}
            </button>

            {error && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                {error}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <History className="w-4 h-4" /> Prompt history
            </div>
            {history.length === 0 ? (
              <p className="text-white/40 text-sm">Prompts you send will appear here for quick reuse.</p>
            ) : (
              <ul className="space-y-3 text-sm text-white/70">
                {history.map((entry, idx) => (
                  <li
                    key={`${entry}-${idx}`}
                    className="p-3 rounded-2xl bg-black/30 border border-white/5 cursor-pointer hover:border-brand-cyan/40"
                    onClick={() => setPrompt(entry)}
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-brand-carbon/50 backdrop-blur-xl shadow-card-lg overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-brand-yellow" />
                {loading ? 'Generating…' : 'Ready'}
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]">
                Ratio · {aspectRatio}
              </div>
            </div>

            <div className="relative min-h-[420px] bg-black/40 flex items-center justify-center">
              {!generatedImage && (
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              )}

              {generatedImage ? (
                <div className="relative w-full h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-4">
                    <img
                      src={generatedImage}
                      alt="Generated asset"
                      className="max-h-[520px] max-w-full object-contain rounded-2xl border border-white/10 shadow-2xl"
                    />
                  </div>
                  <div className="flex items-center justify-between px-5 py-4 border-t border-white/5 text-xs text-white/60">
                    <span className="font-mono">
                      {referenceImage ? 'EDITED_ASSET_V1.PNG' : 'GENERATED_ASSET_V1.JPG'}
                    </span>
                    <a
                      href={generatedImage}
                      download={`thumbwar_${referenceImage ? 'edit' : 'gen'}_${Date.now()}.png`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-brand-obsidian font-semibold"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-10 text-white/60">
                  {loading ? (
                    <>
                      <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${referenceImage ? 'border-brand-yellow' : 'border-brand-cyan'}`}></div>
                      <p className="text-sm">
                        {referenceImage ? 'Refining reality…' : 'Dreaming up pixels…'}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full border border-dashed border-white/15 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white/30" />
                      </div>
                      <p className="text-lg font-display text-white/70">Canvas is armed</p>
                      <p className="text-sm text-white/50 max-w-md">
                        Feed it a cinematic prompt {referenceImage ? 'to transform your upload' : 'or upload a reference to edit'}.
                      </p>
                    </>
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

export default Phase2bGenAI;
