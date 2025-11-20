import React from 'react';
import { Layers, Scissors, Palette, Type } from 'lucide-react';

const Phase3Edit: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
       <header className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Phase 3: The Edit</h2>
        <p className="text-gray-400">Technical execution. This assumes you are using high-end tools (Photoshop/Canva Pro).</p>
      </header>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="flex gap-4 md:gap-8 items-start bg-white/5 p-6 rounded-xl border-l-4 border-blue-500">
          <div className="bg-black/50 p-3 rounded-lg shrink-0">
             <Scissors className="w-6 h-6 text-blue-400" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white mb-1">Step 1: Subject Isolation</h3>
             <p className="text-gray-400 text-sm mb-4">The "Select Subject" AI is okay for rough passes, but leaves jagged artifacts.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-black/40 p-3 rounded text-gray-300">
                   <span className="text-blue-400 font-bold block mb-1">Technique</span>
                   Use Pen Tool (P) for clean edges.
                </div>
                <div className="bg-black/40 p-3 rounded text-gray-300">
                   <span className="text-blue-400 font-bold block mb-1">Refinement</span>
                   Feather selection by 0.5px - 1px.
                </div>
             </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 md:gap-8 items-start bg-white/5 p-6 rounded-xl border-l-4 border-purple-500">
          <div className="bg-black/50 p-3 rounded-lg shrink-0">
             <Layers className="w-6 h-6 text-purple-400" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white mb-1">Step 2: Composition & Depth</h3>
             <p className="text-gray-400 text-sm mb-4">Separate foreground from background.</p>
             <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex gap-2 items-start">
                   <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-0.5 rounded">Background</span>
                   Blur it (Gaussian Blur 5-10px). Provides context, not details.
                </li>
                <li className="flex gap-2 items-start">
                   <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-0.5 rounded">Rim Light</span>
                   Add inner glow or paint edge highlights. Match rim light color to background.
                </li>
             </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 md:gap-8 items-start bg-white/5 p-6 rounded-xl border-l-4 border-orange-500">
          <div className="bg-black/50 p-3 rounded-lg shrink-0">
             <Palette className="w-6 h-6 text-orange-400" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white mb-1">Step 3: Color Grading</h3>
             <p className="text-gray-400 text-sm mb-4">The secret sauce. Thumbnails need high contrast.</p>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-black/40 p-2 rounded text-gray-300">
                   <span className="block font-bold text-orange-400">Vibrance</span>
                   Boost first (protects skin).
                </div>
                <div className="bg-black/40 p-2 rounded text-gray-300">
                   <span className="block font-bold text-orange-400">Levels</span>
                   Crush blacks, blow whites.
                </div>
                <div className="bg-black/40 p-2 rounded text-gray-300">
                   <span className="block font-bold text-orange-400">LUTs</span>
                   Teal & Orange @ 20% opacity.
                </div>
             </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-4 md:gap-8 items-start bg-white/5 p-6 rounded-xl border-l-4 border-brand-yellow">
          <div className="bg-black/50 p-3 rounded-lg shrink-0">
             <Type className="w-6 h-6 text-brand-yellow" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white mb-1">Step 4: Typography</h3>
             <p className="text-gray-400 text-sm mb-4">Max 4 words. Ideally 2.</p>
             <div className="bg-brand-yellow text-black p-4 font-display text-2xl uppercase tracking-wide rounded skew-x-[-6deg] w-fit mb-2 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
                Sample Text
             </div>
             <p className="text-xs text-gray-500">Font: Impact, Roboto Black, Montserrat ExtraBold. Yellow on Dark is gold standard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase3Edit;