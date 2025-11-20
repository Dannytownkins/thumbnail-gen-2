import React from 'react';
import { Phase } from '../types';
import { Brain, Camera, Palette, ScanEye, Upload, AlertTriangle, Sparkles } from 'lucide-react';

interface SidebarProps {
  currentPhase: Phase;
  setPhase: (phase: Phase) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPhase, setPhase }) => {
  const menuItems = [
    { id: Phase.PRE_PRODUCTION, label: 'The Hook', icon: Brain, sub: 'Pre-Production' },
    { id: Phase.ASSET_CAPTURE, label: 'Asset Capture', icon: Camera, sub: 'Photography' },
    { id: Phase.AI_GENERATION, label: 'AI Generator', icon: Sparkles, sub: 'Asset Creation' },
    { id: Phase.EDIT, label: 'The Edit', icon: Palette, sub: 'Composition' },
    { id: Phase.QC, label: 'The Squint Test', icon: ScanEye, sub: 'Quality Control' },
    { id: Phase.EXPORT, label: 'Export & A/B', icon: Upload, sub: 'Finalize' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-brand-gray border-r border-white/10 flex flex-col h-full shrink-0 transition-all duration-300">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-brand-yellow rounded flex items-center justify-center shrink-0">
           <AlertTriangle className="text-black w-5 h-5" />
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tighter text-white">ThumbWar</span>
      </div>

      <nav className="flex-1 py-6 space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = currentPhase === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setPhase(item.id)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all group
                ${isActive 
                  ? 'bg-brand-yellow text-brand-black shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-brand-black' : 'group-hover:text-brand-yellow'}`} />
              <div className="hidden md:flex flex-col items-start">
                <span className={`font-bold text-sm leading-tight ${isActive ? 'text-brand-black' : 'text-gray-200'}`}>
                  {item.label}
                </span>
                <span className={`text-[10px] uppercase tracking-wider ${isActive ? 'text-black/60' : 'text-gray-600'}`}>
                  {item.sub}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 hidden md:block text-xs text-gray-600 border-t border-white/5">
        <p>© ThumbWar Workflow</p>
        <p>Stop the Scroll.</p>
      </div>
    </aside>
  );
};

export default Sidebar;