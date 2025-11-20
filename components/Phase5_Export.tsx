import React from 'react';
import { CheckSquare, FileOutput, Split, Gauge } from 'lucide-react';

const specList = [
  { label: 'Resolution', detail: '1920×1080 or 1280×720' },
  { label: 'File Size', detail: '< 2MB (JPG preferred)' },
  { label: 'Color', detail: 'sRGB, gamma 2.2, sharpen on export' },
  { label: 'Naming', detail: 'Topic_Emotion_V1.jpg' },
];

const variantIdeas = [
  'Swap expression (fear ↔ curiosity)',
  'Invert color palette (dark ↔ white)',
  'Remove text entirely for image-led story',
  'Zoom crop vs. full body',
];

const Phase5Export: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <section className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-6 md:p-10 shadow-card-lg space-y-4">
        <div className="flex items-center gap-3 text-brand-yellow">
          <FileOutput className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 05 — Export & A/B</span>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-display text-white">Package it like a launch</h2>
          <p className="text-white/70">
            Specs, compression, and variant strategy happen here. Treat exports like shipping a product —
            metadata, file naming, and backup thumbnails ready to deploy.
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-5 shadow-card-lg">
          <div className="flex items-center gap-3 text-brand-cyan">
            <Gauge className="w-5 h-5" />
            <h3 className="font-display text-2xl text-white">Technical spec checklist</h3>
          </div>
          <ul className="space-y-4">
            {specList.map((spec) => (
              <li key={spec.label} className="flex items-start gap-3 text-sm">
                <CheckSquare className="w-4 h-4 text-white/40 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{spec.label}</p>
                  <p className="text-white/60">{spec.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6 shadow-card-lg">
          <div className="flex items-center gap-3 text-brand-yellow">
            <Split className="w-5 h-5" />
            <h3 className="font-display text-2xl text-white">The B Variant mandate</h3>
          </div>
          <p className="text-white/70 text-sm">
            Always ship at least two fully polished thumbnails. If CTR is below average after 24h, swap immediately.
          </p>
          <div className="space-y-3">
            {variantIdeas.map((idea, index) => (
              <div key={idea} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white/70 text-sm">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40 block mb-1">
                  Variant {index + 1}
                </span>
                {idea}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-brand-yellow/20 bg-brand-yellow/10 p-6 text-center space-y-3">
        <p className="text-brand-yellow text-sm uppercase tracking-[0.4em]">Final truth</p>
        <p className="text-white/80 text-lg font-display">
          “A mediocre idea with flawless polish still fails. A brilliant hook with chaos-level polish can still win.”
        </p>
      </div>
    </div>
  );
};

export default Phase5Export;
