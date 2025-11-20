import React from 'react';
import { Layers, Scissors, Palette, Type } from 'lucide-react';

const editSteps = [
  {
    id: '01',
    title: 'Subject Isolation',
    description: 'Never trust auto-select entirely. Manual edges look expensive.',
    icon: Scissors,
    accent: 'border-brand-cyan/40',
    callouts: ['Pen tool for edges', '0.5px - 1px feather', 'Refine hair with channel mask'],
    code: [
      'Select > Modify > Contract 1px',
      'Layer Mask + Brush @ 35%',
      'Check halo on 200% zoom',
    ],
  },
  {
    id: '02',
    title: 'Depth & Composition',
    description: 'Create parallax by separating planes. Context should blur, subject should pop.',
    icon: Layers,
    accent: 'border-brand-magenta/40',
    callouts: ['Gaussian blur 5-10px background', 'Paint rim light matching BG hue', 'Overlap objects for scale'],
    code: [
      'BG layer -> Blur > Gaussian 6px',
      'Add inner glow #FFE28B @ Screen 65%',
      'Shadow layer multiply @ 35%',
    ],
  },
  {
    id: '03',
    title: 'Color Science',
    description: 'Thumbnails survive on violence between shadows and neon highlights.',
    icon: Palette,
    accent: 'border-brand-yellow/40',
    callouts: ['Boost vibrance first', 'Levels: crush blacks, lift mids', 'Teal/Orange LUT @ 20%'],
    code: [
      'Vibrance: +55 / Saturation +10',
      'Levels: 10 / 1.05 / 240',
      'Selective color: Blacks +6 Cyan',
    ],
  },
  {
    id: '04',
    title: 'Typography Lockup',
    description: 'Two to four words, angled slightly, living on its own layer stack.',
    icon: Type,
    accent: 'border-brand-lime/40',
    callouts: ['Impact / Druk / Montserrat Black', 'Apply perspective transform', 'Shadow copy for glow'],
    code: [
      'setText("DO NOT PUSH")',
      'Layer Style: Stroke 6px #000',
      'Outer Glow: #FEEA7A @ 55%',
    ],
  },
];

const Phase3Edit: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <section className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-6 md:p-10 shadow-card-lg space-y-4">
        <div className="flex items-center gap-3 text-brand-cyan">
          <Layers className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 03 — Edit Suite</span>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-display text-white">Technical execution = perceived budget</h2>
          <p className="text-white/70">
            Assume the viewer is on mobile at 60% brightness. Every layer must scream at that size. Treat this
            phase like building a theatrical poster.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {editSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-card-lg flex flex-col gap-6 lg:flex-row"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-brand-cyan">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">Step {step.id}</p>
                    <h3 className="text-2xl font-display text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-white/70 max-w-xl">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.callouts.map((callout) => (
                    <span key={callout} className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/70">
                      {callout}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`lg:w-72 rounded-2xl border ${step.accent} bg-black/30 p-4 font-mono text-[12px] text-white/70 space-y-2`}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Command log</p>
                {step.code.map((line) => (
                  <p key={line} className="bg-black/40 rounded-xl px-3 py-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Phase3Edit;
