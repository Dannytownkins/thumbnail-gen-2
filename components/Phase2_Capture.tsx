import React from 'react';
import { Camera, Zap, Eye, Image as ImageIcon } from 'lucide-react';

const Phase2Capture: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Phase 2: Asset Capture</h2>
        <p className="text-gray-400">Garbage In, Garbage Out. Stop using timeline screenshots.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gradient-to-b from-white/10 to-transparent p-1 rounded-2xl">
          <div className="bg-brand-gray h-full rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">The Dedicated Shoot</h3>
            <p className="text-sm text-gray-400">Take 5 minutes while filming. Screenshots look amateur and pixelated.</p>
            <ul className="text-sm space-y-2 text-gray-300 mt-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Take 20+ bursts.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Hold props closer to lens.
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-b from-white/10 to-transparent p-1 rounded-2xl">
          <div className="bg-brand-gray h-full rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Lighting & Expression</h3>
            <p className="text-sm text-gray-400">Blast your face with light. Shadows destroy details on mobile screens.</p>
            <ul className="text-sm space-y-2 text-gray-300 mt-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></span> Overact by 20%.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></span> Feels cringe = Looks good.
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-b from-white/10 to-transparent p-1 rounded-2xl">
          <div className="bg-brand-gray h-full rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Macro Objects</h3>
            <p className="text-sm text-gray-400">Reviewing a product? Take a macro shot. Avoid Google Images.</p>
            <ul className="text-sm space-y-2 text-gray-300 mt-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> Clean the product first.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> High depth of field.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-white mb-2">The Expression Checklist</h4>
          <div className="flex gap-4 flex-wrap">
             {['Fear', 'Curiosity', 'Joy', 'Disgust', 'Anger'].map(e => (
               <div key={e} className="px-3 py-1 border border-white/20 rounded-full text-xs text-gray-300">
                 {e}
               </div>
             ))}
          </div>
        </div>
        <div className="h-16 w-px bg-white/10 hidden md:block"></div>
        <div className="flex-1 text-sm text-gray-400">
           <Eye className="w-4 h-4 inline mr-2 text-brand-yellow"/>
           Eyes are the most important part of the image. Ensure they are sharp, open, and catching light (catchlights).
        </div>
      </div>
    </div>
  );
};

export default Phase2Capture;