import React from 'react';
import { Phase } from '../types';
import {
  Brain,
  Camera,
  Palette,
  ScanEye,
  Upload,
  Sparkles,
  AlertTriangle,
  LucideIcon,
} from 'lucide-react';

interface SidebarProps {
  currentPhase: Phase;
  setPhase: (phase: Phase) => void;
}

type TimelineItem = {
  id: Phase;
  codename: string;
  label: string;
  sub: string;
  duration: string;
  badges: string[];
  icon: LucideIcon;
};

const timeline: TimelineItem[] = [
  {
    id: Phase.PRE_PRODUCTION,
    codename: '01',
    label: 'The Hook Playbook',
    sub: 'Psych warfare copy lab',
    duration: '08m sprint',
    badges: ['Strategy', 'Copy Stack'],
    icon: Brain,
  },
  {
    id: Phase.ASSET_CAPTURE,
    codename: '02',
    label: 'Asset Capture',
    sub: 'Dedicated shoot logistics',
    duration: '12m shoot',
    badges: ['Lighting', 'Expression'],
    icon: Camera,
  },
  {
    id: Phase.AI_GENERATION,
    codename: '02.5',
    label: 'AI Generator',
    sub: 'Imagen + Gemini enhancement',
    duration: '06m ideate',
    badges: ['GenAI', 'Props'],
    icon: Sparkles,
  },
  {
    id: Phase.EDIT,
    codename: '03',
    label: 'The Edit',
    sub: 'Depth, grading, typography',
    duration: '18m build',
    badges: ['Photoshop', 'Depth'],
    icon: Palette,
  },
  {
    id: Phase.QC,
    codename: '04',
    label: 'Squint Test',
    sub: 'Diagnostics + contrast QC',
    duration: '05m audit',
    badges: ['B&W', 'Mobile Sim'],
    icon: ScanEye,
  },
  {
    id: Phase.EXPORT,
    codename: '05',
    label: 'Export & A/B',
    sub: 'Variants + specs ready',
    duration: '04m launch',
    badges: ['Variants', 'Delivery'],
    icon: Upload,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPhase, setPhase }) => {
  const currentIndex = timeline.findIndex((item) => item.id === currentPhase);
  const progressPercent = currentIndex === -1 ? 0 : ((currentIndex + 1) / timeline.length) * 100;

  return (
    <aside className="relative w-20 lg:w-[320px] bg-brand-obsidian/85 border-r border-white/10 flex flex-col h-full shrink-0 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 opacity-40 pointer-events-none"></div>

      <div className="relative flex flex-col h-full">
        <div className="px-4 lg:px-6 py-5 border-b border-white/5">
          <div className="flex items-center justify-center lg:justify-between gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-red text-brand-obsidian flex items-center justify-center shadow-glow">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="hidden lg:block">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">ThumbWar</p>
              <p className="font-display text-xl leading-tight text-white">CTR Command</p>
            </div>
          </div>

          <div className="hidden lg:block mt-5">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-white/40 mb-1">
              <span>Timeline</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-red rounded-full shadow-glow transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 lg:px-4 py-6 space-y-3">
          {timeline.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.id === currentPhase;
            const isComplete = idx < currentIndex;
            const statusColor = isActive
              ? 'from-brand-teal to-brand-red text-brand-obsidian'
              : isComplete
              ? 'from-brand-red/60 to-brand-red/20 text-brand-obsidian'
              : 'from-white/5 to-white/0 text-white/70';

            return (
              <div key={item.id} className="flex items-stretch gap-3">
                <div className="relative pl-3">
                  {idx < timeline.length - 1 && (
                    <span
                      className={`absolute left-3 top-9 bottom-[-14px] w-[2px] ${
                        isComplete ? 'bg-brand-red/70' : 'bg-white/10'
                      }`}
                    ></span>
                  )}
                  <div
                    className={`relative w-10 h-10 rounded-2xl bg-gradient-to-br ${statusColor} border border-white/10 flex items-center justify-center transition-all ${
                      isActive ? 'shadow-glow scale-105' : 'shadow-inner'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-2xl border border-white/40 animate-pulse-slow"></span>
                    )}
                    <Icon className={`w-5 h-5 ${isActive ? 'text-brand-obsidian' : 'text-white/80'}`} />
                  </div>
                </div>
                <button
                  onClick={() => setPhase(item.id)}
                  className={`flex-1 flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                    isActive ? 'border-white/20 bg-white/5' : 'border-white/5 bg-white/0 hover:border-white/15'
                  }`}
                  title={item.sub}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">{item.codename}</p>
                    <p className={`font-display text-lg ${isActive ? 'text-white' : 'text-white/80'}`}>{item.label}</p>
                    <p className="text-xs text-white/50">{item.sub}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">{item.duration}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
