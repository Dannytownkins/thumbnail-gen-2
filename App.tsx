import React, { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Phase } from './types';
import Phase1Hook from './components/Phase1_Hook';
import Phase2Capture from './components/Phase2_Capture';
import Phase2bGenAI from './components/Phase2b_GenAI';
import Phase3Edit from './components/Phase3_Edit';
import Phase4QC from './components/Phase4_QC';
import Phase5Export from './components/Phase5_Export';

type PhaseMeta = {
  title: string;
  label: string;
  description: string;
  tags: string[];
};

const phaseOrder: Phase[] = [
  Phase.PRE_PRODUCTION,
  Phase.ASSET_CAPTURE,
  Phase.AI_GENERATION,
  Phase.EDIT,
  Phase.QC,
  Phase.EXPORT,
];

const phaseMeta: Record<Phase, PhaseMeta> = {
  [Phase.PRE_PRODUCTION]: {
    title: 'Phase 01',
    label: 'Hook Logic',
    description: 'Define the scroll-stopping psychological trigger.',
    tags: ['Strategy', 'Copy Lab'],
  },
  [Phase.ASSET_CAPTURE]: {
    title: 'Phase 02',
    label: 'Asset Capture',
    description: 'Shoot cinematic source material worth compositing.',
    tags: ['Shoot', 'Lighting'],
  },
  [Phase.AI_GENERATION]: {
    title: 'Phase 02.5',
    label: 'AI Generator',
    description: 'Fabricate props or enhancements with Gemini / Imagen.',
    tags: ['GenAI', 'Concept'],
  },
  [Phase.EDIT]: {
    title: 'Phase 03',
    label: 'The Edit',
    description: 'Cut, grade, and composite for maximum contrast.',
    tags: ['Photoshop', 'Depth'],
  },
  [Phase.QC]: {
    title: 'Phase 04',
    label: 'Squint Test',
    description: 'Run diagnostics to crush artifacts and bad contrast.',
    tags: ['QC', 'Diagnostics'],
  },
  [Phase.EXPORT]: {
    title: 'Phase 05',
    label: 'Export & A/B',
    description: 'Ship optimized files and prep backup variants.',
    tags: ['Launch', 'Iteration'],
  },
};

const contextChips = ['CTR Warfare Lab', 'Gemini Operator Ready', 'Hi-Fi Workflow v2'];

const App: React.FC = () => {
  const [currentPhase, setPhase] = useState<Phase>(Phase.PRE_PRODUCTION);

  const currentIndex = useMemo(() => phaseOrder.indexOf(currentPhase), [currentPhase]);
  const currentPhaseMeta = phaseMeta[currentPhase];
  const progressPercent = useMemo(() => {
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / phaseOrder.length) * 100;
  }, [currentIndex]);

  const previousPhase = currentIndex > 0 ? phaseOrder[currentIndex - 1] : null;
  const nextPhase = currentIndex < phaseOrder.length - 1 ? phaseOrder[currentIndex + 1] : null;

  const handlePrev = () => {
    if (previousPhase) setPhase(previousPhase);
  };

  const handleNext = () => {
    if (nextPhase) setPhase(nextPhase);
  };

  const renderPhase = () => {
    switch (currentPhase) {
      case Phase.PRE_PRODUCTION:
        return <Phase1Hook />;
      case Phase.ASSET_CAPTURE:
        return <Phase2Capture />;
      case Phase.AI_GENERATION:
        return <Phase2bGenAI />;
      case Phase.EDIT:
        return <Phase3Edit />;
      case Phase.QC:
        return <Phase4QC />;
      case Phase.EXPORT:
        return <Phase5Export />;
      default:
        return <Phase1Hook />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-brand-midnight text-white overflow-hidden selection:bg-brand-yellow selection:text-brand-obsidian">
      {/* Ambient layers */}
      <div className="absolute inset-0 bg-stellar-field opacity-70 pointer-events-none"></div>
      <div className="absolute -top-16 right-10 w-[460px] h-[460px] bg-brand-cyan/25 blur-[150px] rounded-full animate-float pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-8 w-[520px] h-[520px] bg-brand-magenta/20 blur-[160px] rounded-full animate-pulse-slow pointer-events-none"></div>
      <div className="absolute inset-0 bg-noir-grid bg-[length:120px_120px] opacity-[0.05] pointer-events-none"></div>
      <div className="absolute left-1/2 -translate-x-1/2 top-16 w-[640px] h-[640px] rounded-full border border-white/5 opacity-40 animate-spin-slow pointer-events-none"></div>

      <div className="relative flex h-screen w-full">
        <Sidebar currentPhase={currentPhase} setPhase={setPhase} />

        <main className="flex-1 flex flex-col h-full backdrop-blur-[2px]">
          {/* Command Deck Status Bar */}
          <div className="hidden lg:flex items-center justify-between border-b border-white/5 bg-brand-obsidian/80 backdrop-blur-2xl px-10 py-5 shadow-inner z-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Current Operation</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-xs font-mono text-brand-cyan/80 border border-brand-cyan/40 px-2 py-0.5 rounded-full">
                  {currentPhaseMeta.title}
                </span>
                <h1 className="font-display text-2xl text-white">{currentPhaseMeta.label}</h1>
                <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider bg-white/10 text-white/70">
                  {currentPhaseMeta.tags[0]}
                </span>
              </div>
              <p className="text-sm text-white/60 mt-2 max-w-xl">{currentPhaseMeta.description}</p>
            </div>

            <div className="flex items-center gap-6 w-96">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-[0.4em] mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan via-brand-yellow to-brand-magenta rounded-full shadow-glow transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-1">Next</p>
                <p className="font-display text-lg text-white">
                  {nextPhase ? phaseMeta[nextPhase].label : 'Launch'}
                </p>
                <p className="text-xs text-white/40">{nextPhase ? phaseMeta[nextPhase].tags[0] : 'Ready'}</p>
              </div>
            </div>
          </div>

          {/* Stage */}
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-brand-midnight/90 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-midnight/90 to-transparent pointer-events-none z-10"></div>

            <div className="relative h-full overflow-y-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-12 space-y-8">
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-white/40">
                {contextChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60"
                  >
                    {chip}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full border border-white/10 bg-brand-cyan/10 text-brand-cyan/80">
                  Step {currentIndex + 1} / {phaseOrder.length}
                </span>
              </div>

              {renderPhase()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Dock */}
      <div className="lg:hidden fixed left-4 right-4 bottom-4 z-30">
        <div className="bg-brand-obsidian/90 border border-white/10 rounded-3xl shadow-card-lg backdrop-blur-xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Phase {currentIndex + 1}/{phaseOrder.length}
            </p>
            <p className="font-display text-lg">{currentPhaseMeta.label}</p>
            <p className="text-xs text-white/50">{currentPhaseMeta.description}</p>
          </div>
          <div className="flex gap-2 w-fit">
            <button
              onClick={handlePrev}
              disabled={!previousPhase}
              className="px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10 text-white/70 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={!nextPhase}
              className="px-5 py-2 rounded-2xl text-sm font-bold bg-gradient-to-r from-brand-cyan to-brand-yellow text-brand-obsidian shadow-glow disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;