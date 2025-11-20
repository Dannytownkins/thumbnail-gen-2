import React from 'react';
import { CheckSquare, FileOutput, Split } from 'lucide-react';

const Phase5Export: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Phase 5: Export & A/B Testing</h2>
        <p className="text-gray-400">The final stretch. Specs and variant strategy.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4 text-green-400">
               <FileOutput className="w-6 h-6" />
               <h3 className="text-xl font-bold text-white">Technical Specs</h3>
            </div>
            <ul className="space-y-4">
               <li className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-white font-bold text-sm">Resolution</p>
                     <p className="text-gray-400 text-xs">1920x1080 (Standard) or 1280x720.</p>
                  </div>
               </li>
               <li className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-white font-bold text-sm">File Size</p>
                     <p className="text-gray-400 text-xs">Under 2MB (JPEG/PNG).</p>
                  </div>
               </li>
               <li className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-white font-bold text-sm">Naming Convention</p>
                     <p className="text-gray-400 text-xs font-mono bg-black/30 p-1 rounded mt-1">Video_Topic_Emotion_V1.jpg</p>
                  </div>
               </li>
            </ul>
         </div>

         <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4 text-brand-yellow">
               <Split className="w-6 h-6" />
               <h3 className="text-xl font-bold text-white">The "B" Variant</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
               Always make a second version. If CTR is below average after 24h, swap it.
            </p>
            
            <div className="space-y-3">
               <div className="p-3 bg-black/40 rounded border border-white/5">
                  <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Variant Idea 1</span>
                  <span className="text-sm text-white">Change facial expression (e.g., from Fear to Curiosity).</span>
               </div>
               <div className="p-3 bg-black/40 rounded border border-white/5">
                  <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Variant Idea 2</span>
                  <span className="text-sm text-white">Remove text entirely. Let the image speak.</span>
               </div>
            </div>
         </div>
      </div>

      <div className="p-6 bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl text-center">
         <p className="text-brand-yellow font-bold text-lg">Final Truth</p>
         <p className="text-white/80 mt-2 max-w-2xl mx-auto italic">
            "A pretty thumbnail with a boring concept will fail. An ugly thumbnail with a brilliant concept (that sparks extreme curiosity) will win."
         </p>
      </div>
    </div>
  );
};

export default Phase5Export;