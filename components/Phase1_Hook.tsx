import React, { useState } from 'react';
import { generateThumbnailHooks } from '../services/geminiService';
import { ThumbnailIdea } from '../types';
import { Sparkles, AlertCircle, Target, Activity } from 'lucide-react';

const chips = ['Copy Lab', 'Psych Hooks', 'Max 4 Words'];

const Phase1Hook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ThumbnailIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const results = await generateThumbnailHooks(title);
      setIdeas(results);
    } catch (e) {
      setError('Failed to connect to AI strategy command. Ensure API Key is valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-obsidian/80 via-brand-carbon/60 to-brand-midnight p-6 md:p-10 shadow-card-lg">
        <div className="absolute -top-10 right-0 w-64 h-64 bg-brand-cyan/30 blur-[120px] rounded-full opacity-80 pointer-events-none"></div>
        <div className="relative flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 text-brand-cyan">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 01 — Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-white">
              The Hook Logic Lab
            </h2>
            <p className="text-white/70 max-w-2xl">
              Build the line that stops the scroll. We weaponize curiosity, fear, or joy
              with psychological copy that magnifies (not repeats) your title.
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.3em] text-white/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:w-64 bg-black/30 border border-white/10 rounded-2xl p-5 space-y-4 shadow-inner">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Ideas in Queue</p>
              <p className="font-display text-4xl text-white">{ideas.length.toString().padStart(2, '0')}</p>
            </div>
            <div className="border-t border-white/5 pt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <Target className="w-4 h-4 text-brand-yellow" />
                <span>Emotion focus: Fear / Curiosity / Joy / Disgust</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Activity className="w-4 h-4 text-brand-cyan" />
                <span>Latency: ~2s (Gemini 2.5 Flash)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5 shadow-inner">
            <h3 className="font-display text-xl text-brand-yellow flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Rules of Engagement
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <span className="text-green-400 font-bold">Do</span>
                Contextualize or amplify the title. Highlight consequence or reward.
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">Don't</span>
                Repeat the video title word-for-word. Redundancy kills intrigue.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Limit</span>
                Max three focal points: face, object, typography.
              </li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
              <p className="uppercase tracking-[0.4em] text-white/40">Example Signal</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-3">
                  <p className="text-red-300 text-xs font-bold">Weak</p>
                  <p className="text-white/60">Title: I Bought a Ferrari</p>
                  <p className="text-white font-display">Thumb: “I Bought a Ferrari”</p>
                </div>
                <div className="rounded-xl border border-green-400/30 bg-green-400/5 p-3">
                  <p className="text-green-300 text-xs font-bold">Strong</p>
                  <p className="text-white/60">Title: I Bought a Ferrari</p>
                  <p className="text-white font-display">Thumb: “$250,000 Mistake?”</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Checklist</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {['Spark curiosity', 'Show stakes', 'Stay conversational', '2-4 words max'].map((item) => (
                <span key={item} className="px-3 py-1 rounded-full bg-white/5 text-white/70">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-5 space-y-4 shadow-card-lg">
            <label className="text-xs uppercase tracking-[0.4em] text-white/40 block">Video Title</label>
            <div className="rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center gap-3 p-3 focus-within:border-brand-cyan/60 focus-within:ring-1 focus-within:ring-brand-cyan/60 transition">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., I Survived 50 Hours in Antarctica"
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-lg font-display outline-none px-2"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !title.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-brand-obsidian bg-gradient-to-r from-brand-teal to-brand-red shadow-glow disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-[0.98]"
              >
                {loading ? 'Thinking…' : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate strategies
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                {error}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {ideas.length === 0 && !loading && (
              <div className="rounded-3xl border-2 border-dashed border-white/10 bg-white/5 p-10 text-center text-white/50">
                Enter your video title to receive tactical text suggestions.
              </div>
            )}

            {ideas.map((idea, idx) => (
              <div
                key={`${idea.text}-${idx}`}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 px-5 py-6 shadow-card-lg relative overflow-hidden group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-brand-cyan/5 pointer-events-none"></div>
                <div className="relative flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-display text-white">
                      “{idea.text}”
                    </h4>
                    <span className="text-[11px] uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-white/5 text-white/60">
                      {idea.emotion}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 border-l-2 border-brand-cyan/40 pl-4">
                    {idea.reasoning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase1Hook;
