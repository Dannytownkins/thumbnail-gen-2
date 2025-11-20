import React from 'react';
import { Camera, Zap, Eye, Image as ImageIcon, Aperture } from 'lucide-react';

const capturePillars = [
  {
    title: 'The Dedicated Shoot',
    description: 'Take 5 minutes separate from filming. Timeline screenshots are pixelated and noisy.',
    icon: Camera,
    color: 'from-brand-cyan/40 via-brand-cyan/5 to-transparent',
    bullets: ['Shoot 20+ bursts', 'Lens at chest height', 'Props close to lens'],
  },
  {
    title: 'Lighting & Expression',
    description: 'Blast your face with light. Mobile thumbnails punish shadows and low contrast.',
    icon: Zap,
    color: 'from-brand-yellow/50 via-brand-yellow/10 to-transparent',
    bullets: ['Overact by 20%', 'Chin slightly down', 'Feels cringe = Looks good'],
  },
  {
    title: 'Macro Object Story',
    description: 'Product review? Capture macro shots yourself. Google Images screams “stock”.',
    icon: ImageIcon,
    color: 'from-brand-magenta/40 via-brand-magenta/10 to-transparent',
    bullets: ['Clean the subject', 'Use high depth of field', 'Add motion blur to background'],
  },
];

const expressionList = ['Fear', 'Curiosity', 'Joy', 'Disgust', 'Anger', 'Shock'];
const lightingChecklist = ['Key light high + soft', 'Fill light 30%', 'Rim light tinted', 'Catchlights visible'];

const Phase2Capture: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <section className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-6 md:p-10 shadow-card-lg space-y-4">
        <div className="flex items-center gap-3 text-brand-cyan">
          <Camera className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 02 — Asset Capture</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          <div className="flex-1 space-y-3">
            <h2 className="text-3xl md:text-4xl font-display text-white">Shoot like you’re designing a poster</h2>
            <p className="text-white/70">
              Garbage in, garbage out. Capture cinematic source material with aggressive expressions and
              over-the-top lighting so the edit phase has real signal to push.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3 shadow-inner">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Shoot time</p>
              <p className="font-display text-2xl text-white">12m</p>
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3 shadow-inner">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Shots needed</p>
              <p className="font-display text-2xl text-white">20+</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {capturePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 overflow-hidden shadow-card-lg hover:-translate-y-1 transition-transform"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b ${pillar.color}`}
              ></div>
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-yellow">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display text-white">{pillar.title}</h3>
                <p className="text-sm text-white/70">{pillar.description}</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-10 grid lg:grid-cols-3 gap-8 items-center shadow-inner">
        <div className="space-y-3 lg:col-span-2">
          <h4 className="text-xl font-display text-white flex items-center gap-3">
            <Eye className="w-5 h-5 text-brand-yellow" /> Expression palette
          </h4>
          <p className="text-white/70 text-sm">Cycle through at least three emotions per shoot. Hold each for 2 seconds.</p>
          <div className="flex flex-wrap gap-3">
            {expressionList.map((emotion) => (
              <span key={emotion} className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/80">
                {emotion}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Lighting strip</p>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex flex-col gap-3">
            {lightingChecklist.map((tip) => (
              <div key={tip} className="flex items-center gap-3 text-sm text-white/70">
                <Aperture className="w-4 h-4 text-brand-cyan" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase2Capture;