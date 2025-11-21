import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { X, Image as ImageIcon } from 'lucide-react';

const AssetTray: React.FC = () => {
  const { capturedAssets, generatedAssets, removeAsset } = useProject();
  const allAssets = [...capturedAssets, ...generatedAssets];

  if (allAssets.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 z-20">
      <div className="rounded-3xl border border-white/10 bg-brand-obsidian/95 backdrop-blur-2xl shadow-card-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-brand-cyan" />
            <span className="text-sm font-semibold text-white">Asset Library</span>
            <span className="text-xs text-white/40">({allAssets.length})</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
          {allAssets.map((asset) => (
            <div
              key={asset.id}
              className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-brand-cyan/50 transition"
            >
              <img
                src={asset.dataUrl}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  onClick={() => removeAsset(asset.id)}
                  className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-black/70 text-white/80 font-mono">
                {asset.type === 'captured' ? 'CAP' : 'GEN'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetTray;

