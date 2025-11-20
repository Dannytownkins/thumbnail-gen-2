import React, { useState } from 'react';
import { generateThumbnailHooks } from '../services/geminiService';
import { ThumbnailIdea } from '../types';
import { Sparkles, AlertCircle } from 'lucide-react';

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
      setError("Failed to connect to AI strategy command. Ensure API Key is valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Phase 1: The Hook Logic</h2>
        <p className="text-gray-400">Psychological warfare begins here. Do not open Photoshop yet.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Strategy Card */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
          <h3 className="text-brand-yellow font-bold text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> The Rules of Engagement
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <span className="text-green-400 font-bold">DO:</span> Contextualize or amplify the title.
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 font-bold">DON'T:</span> Repeat the video title word-for-word.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold">LIMIT:</span> Max 3 focal points (Face, Object, Text).
            </li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-white/10">
             <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Example</h4>
             <div className="bg-black/30 p-3 rounded text-xs grid grid-cols-2 gap-4">
                <div>
                  <p className="text-red-400 mb-1">Bad</p>
                  <p className="opacity-50">Title: I Bought a Ferrari</p>
                  <p className="font-bold">Thumb: "I Bought a Ferrari"</p>
                </div>
                <div>
                  <p className="text-green-400 mb-1">Good</p>
                  <p className="opacity-50">Title: I Bought a Ferrari</p>
                  <p className="font-bold">Thumb: "$250,000 Mistake?"</p>
                </div>
             </div>
          </div>
        </div>

        {/* Generator */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Video Title</label>
            <div className="w-full bg-black border border-white/20 rounded-lg focus-within:border-brand-yellow focus-within:ring-1 focus-within:ring-brand-yellow transition-all flex items-center p-1.5">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., I Survived 50 Hours in Antarctica"
                className="flex-1 bg-transparent text-white px-3 py-2 outline-none placeholder:text-gray-600 min-w-0"
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || !title}
                className="bg-brand-yellow text-black font-bold px-4 py-2 rounded hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm shadow-lg shadow-yellow-500/20 shrink-0 whitespace-nowrap"
              >
                {loading ? 'Thinking...' : <><Sparkles className="w-4 h-4" /> Generate Strategies</>}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {ideas.map((idea, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:border-brand-yellow/50 transition-colors group animate-fade-in" style={{animationDelay: `${idx * 100}ms`}}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-display text-white tracking-wide group-hover:text-brand-yellow">
                    "{idea.text}"
                  </h4>
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400 uppercase">{idea.emotion}</span>
                </div>
                <p className="text-sm text-gray-400 border-l-2 border-white/10 pl-3">{idea.reasoning}</p>
              </div>
            ))}
            {ideas.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-600 border-2 border-dashed border-white/5 rounded-lg">
                Enter your title to receive tactical text suggestions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase1Hook;