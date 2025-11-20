import React, { useState, useRef, useEffect } from 'react';
import { Upload, ScanEye, Image as ImageIcon, Monitor } from 'lucide-react';

const Phase4QC: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in h-full flex flex-col">
      <header className="space-y-2 shrink-0">
        <h2 className="text-3xl font-bold text-white">Phase 4: The Squint Test</h2>
        <p className="text-gray-400">Roast your own work. If it fails here, it fails on YouTube.</p>
      </header>

      {!imageSrc ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors p-12 text-center group cursor-pointer relative">
           <input 
             type="file" 
             accept="image/*" 
             onChange={handleFileChange}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           />
           <div className="w-16 h-16 bg-brand-yellow/10 text-brand-yellow rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Upload className="w-8 h-8" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Upload Thumbnail Candidate</h3>
           <p className="text-sm text-gray-400 max-w-md">
             Upload your 1920x1080 or 1280x720 JPG/PNG. We will run the B&W, Zoom, and Context checks.
           </p>
        </div>
      ) : (
        <div className="space-y-8 pb-12">
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
            <span className="text-sm text-gray-300 font-mono">{fileName}</span>
            <button 
              onClick={() => { setImageSrc(null); setFileName(null); }}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Clear Image
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Test 1: B&W Check */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-white font-bold">
                 <ScanEye className="w-5 h-5 text-brand-yellow" /> The B&W Check
               </div>
               <p className="text-xs text-gray-400 mb-2">Does the subject still stand out? If it's grey soup, fix your values.</p>
               <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 group">
                  <img src={imageSrc} alt="B&W Check" className="w-full h-full object-cover grayscale contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                     <span className="text-xs text-white font-mono">FILTER: GRAYSCALE + CONTRAST</span>
                  </div>
               </div>
            </div>

             {/* Test 2: The Zoom Out */}
             <div className="space-y-3">
               <div className="flex items-center gap-2 text-white font-bold">
                 <ImageIcon className="w-5 h-5 text-blue-400" /> The Mobile/Zoom Check
               </div>
               <p className="text-xs text-gray-400 mb-2">Can you read the text at 10% size? Simulates mobile browsing.</p>
               <div className="relative aspect-video bg-brand-black rounded-lg border border-white/10 flex items-center justify-center p-8">
                  {/* Mobile Simulation Container */}
                  <div className="w-[160px] md:w-[200px] rounded overflow-hidden shadow-2xl ring-1 ring-white/20">
                      <img src={imageSrc} alt="Small Check" className="w-full h-auto" />
                  </div>
               </div>
            </div>

            {/* Test 3: Competitor Context */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-white font-bold">
                 <Monitor className="w-5 h-5 text-purple-400" /> The Context Check
               </div>
               <p className="text-xs text-gray-400 mb-2">Does it disappear against a white background?</p>
               <div className="relative aspect-video bg-[#F9F9F9] rounded-lg overflow-hidden border border-white/10 p-4 flex flex-col gap-2">
                  {/* Fake YouTube UI */}
                  <div className="flex gap-2">
                     <div className="w-1/2 space-y-2 opacity-30 grayscale">
                        <div className="aspect-video bg-gray-400 rounded"></div>
                        <div className="h-2 w-3/4 bg-gray-400 rounded"></div>
                     </div>
                     <div className="w-1/2 space-y-2">
                        <div className="aspect-video rounded overflow-hidden shadow-lg ring-1 ring-black/5 relative group">
                           <img src={imageSrc} className="w-full h-full object-cover" />
                           <div className="absolute bottom-1 right-1 bg-black text-white text-[8px] px-1 rounded">10:24</div>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-400 rounded"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase4QC;