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

const quickStats = [
  { label: 'Shots queued', value: '24' },
  { label: 'AI credits', value: '86%' },
  { label: 'QC passes', value: '02/05' },
  { label: 'Exports ready', value: '2' },
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-cyan text-brand-obsidian flex items-center justify-center shadow-glow">
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
                className="h-full bg-gradient-to-r from-brand-yellow via-brand-cyan to-brand-magenta rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 lg:px-4 py-6 space-y-4">
          {timeline.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.id === currentPhase;
            const isComplete = idx < currentIndex;
            const statusColor = isActive
              ? 'from-brand-cyan to-brand-yellow text-brand-obsidian'
              : isComplete
              ? 'from-brand-yellow/80 to-brand-yellow/40 text-brand-obsidian'
              : 'from-white/5 to-white/0 text-white/70';

            return (
              <div key={item.id} className="relative group">
                {idx < timeline.length - 1 && (
                  <span
                    className={`hidden lg:block absolute left-[32px] top-[70px] bottom-[-32px] w-px ${
                      isComplete ? 'bg-brand-yellow/70' : 'bg-white/5'
                    }`}
                  ></span>
                )}

                <button
                  onClick={() => setPhase(item.id)}
                  className={`w-full flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-4 text-left`}
                  title={item.sub}
                >
                  <div className="relative flex flex-col items-center lg:items-start">
                    <div
                      className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${statusColor} border border-white/10 flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'shadow-glow scale-105' : 'shadow-inner'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-2xl border border-white/40 animate-pulse-slow"></span>
                      )}
                      <Icon className={`w-5 h-5 ${isActive ? 'text-brand-obsidian' : 'text-white/80'}`} />
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-white/50 tracking-[0.3em]">
                      {item.codename}
                    </span>
                  </div>

                  <div
                    className={`hidden lg:block flex-1 rounded-2xl border ${
                      isActive ? 'border-brand-cyan/40 bg-white/5' : 'border-white/5 bg-white/0'
                    } px-4 py-4 transition-all duration-300 backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p
                          className={`font-display text-lg ${
                            isActive ? 'text-white' : isComplete ? 'text-white/80' : 'text-white/60'
                          }`}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-white/50">{item.sub}</p>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">{item.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] ${
                            isActive ? 'bg-white/10 text-white/80' : 'bg-white/5 text-white/50'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:hidden text-center text-[11px] uppercase tracking-[0.4em] text-white/60">
                    {item.label}
                  </div>
                </button>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block p-6 border-t border-white/5 bg-black/10 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/40">Ops Snapshot</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {quickStats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/5 rounded-xl px-3 py-2 shadow-inner">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
                <p className="font-display text-lg text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
