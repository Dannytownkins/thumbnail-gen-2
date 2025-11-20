import React, { useState, useRef } from 'react';
import { generateThumbnailImage } from '../services/geminiService';
import { Sparkles, Download, Image as ImageIcon, AlertCircle, Wand2, X, Upload } from 'lucide-react';

const Phase2bGenAI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '9:16'>('16:9');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Pass reference image if available (switches to Gemini 2.5 Flash Image mode)
      const result = await generateThumbnailImage(prompt, aspectRatio, referenceImage || undefined);
      setGeneratedImage(result);
    } catch (e: any) {
      setError(e.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setReferenceImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearReferenceImage = () => {
    setReferenceImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
           <Sparkles className="w-8 h-8 text-brand-accent" /> 
           Phase 2.5: AI Generator
        </h2>
        <p className="text-gray-400">If reality fails, generate it. Create high-fidelity assets for your composite.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
                {/* Reference Image Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                        Reference Image <span className="text-gray-600 font-normal normal-case">(Optional)</span>
                    </label>
                    
                    {!referenceImage ? (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 rounded-lg p-4 hover:bg-white/5 cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group text-gray-500 hover:text-gray-300 h-24"
                        >
                            <Upload className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                            <span className="text-xs">Click to upload image</span>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                        </div>
                    ) : (
                        <div className="relative group rounded-lg overflow-hidden border border-white/20">
                            <img src={referenceImage} alt="Reference" className="w-full h-24 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={clearReferenceImage}
                                    className="bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white font-mono pointer-events-none">
                                REF
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prompt</label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={referenceImage ? "Describe how to edit this image (e.g. 'Add a glowing red aura', 'Turn into a cartoon')" : "Describe the image detail (e.g. 'A terrified astronaut floating in deep space, cinematic lighting, 8k resolution')"}
                        className="w-full bg-black border border-white/20 text-white p-3 rounded-lg focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all h-32 resize-none text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(['16:9', '1:1', '9:16'] as const).map((ratio) => (
                            <button
                                key={ratio}
                                onClick={() => setAspectRatio(ratio)}
                                className={`py-2 px-3 rounded text-xs font-bold border transition-all ${
                                    aspectRatio === ratio 
                                    ? 'bg-brand-yellow text-black border-brand-yellow' 
                                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
                                }`}
                            >
                                {ratio}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className={`w-full text-black font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors ${
                        referenceImage ? 'bg-brand-yellow hover:bg-yellow-400' : 'bg-brand-accent hover:bg-cyan-400'
                    }`}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <Wand2 className="w-4 h-4" /> {referenceImage ? 'Edit Image' : 'Generate Asset'}
                        </>
                    )}
                </button>
                
                {error && (
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {error}
                    </div>
                )}
            </div>

            <div className={`p-4 border rounded-xl ${referenceImage ? 'border-brand-yellow/20 bg-brand-yellow/5' : 'border-brand-accent/20 bg-brand-accent/5'}`}>
                <h4 className={`${referenceImage ? 'text-brand-yellow' : 'text-brand-accent'} font-bold text-sm mb-2`}>
                    {referenceImage ? 'Editing Tips' : 'Generation Tips'}
                </h4>
                <ul className="text-xs text-gray-400 space-y-2">
                    {referenceImage ? (
                        <>
                             <li>• Describe the <strong>change</strong> clearly (e.g., "Make it raining").</li>
                             <li>• Keep the rest of the description consistent if you want to preserve style.</li>
                             <li>• Works best for adding objects or changing styles.</li>
                        </>
                    ) : (
                        <>
                            <li>• Be specific about lighting (e.g. "Rim lighting", "Neon glow").</li>
                            <li>• Mention the emotion ("Shocked expression").</li>
                            <li>• Use this for background elements or specific props you can't photograph.</li>
                        </>
                    )}
                </ul>
            </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
            <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden min-h-[500px] flex flex-col h-full relative group shadow-inner">
                {/* Grid Pattern Background for Empty State */}
                {!generatedImage && (
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                         style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                    </div>
                )}
                
                {generatedImage ? (
                    <>
                        <div className="flex-1 flex items-center justify-center bg-neutral-900/50 p-4 relative">
                            <img 
                                src={generatedImage} 
                                alt="Generated Asset" 
                                className="max-w-full max-h-[600px] object-contain rounded shadow-2xl ring-1 ring-white/10"
                            />
                        </div>
                        <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-mono">
                                {referenceImage ? 'EDITED_ASSET_V1.PNG' : 'GENERATED_ASSET_V1.JPG'}
                            </span>
                            <a 
                                href={generatedImage} 
                                download={`thumbwar_${referenceImage ? 'edit' : 'gen'}_${Date.now()}.png`}
                                className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-gray-200 flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Download
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 p-8 text-center z-10">
                        {loading ? (
                            <div className="space-y-4">
                                <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto ${referenceImage ? 'border-brand-yellow' : 'border-brand-accent'}`}></div>
                                <p className={`${referenceImage ? 'text-brand-yellow' : 'text-brand-accent'} animate-pulse`}>
                                    {referenceImage ? 'Refining reality...' : 'Dreaming up pixels...'}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                                    <ImageIcon className="w-8 h-8 opacity-40" />
                                </div>
                                <p className="text-lg font-bold opacity-50 text-white">Canvas Empty</p>
                                <p className="text-sm opacity-30 max-w-xs mx-auto mt-2">
                                    Enter a prompt {referenceImage ? 'and reference image' : ''} to create high-quality assets.
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Phase2bGenAI;