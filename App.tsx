import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { Phase } from './types';
import Phase1Hook from './components/Phase1_Hook';
import Phase2Capture from './components/Phase2_Capture';
import Phase2bGenAI from './components/Phase2b_GenAI';
import Phase3Edit from './components/Phase3_Edit';
import Phase4QC from './components/Phase4_QC';
import Phase5Export from './components/Phase5_Export';

const App: React.FC = () => {
  const [currentPhase, setPhase] = useState<Phase>(Phase.PRE_PRODUCTION);

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
    <div className="flex h-screen w-full bg-brand-black overflow-hidden selection:bg-brand-yellow selection:text-black">
      <Sidebar currentPhase={currentPhase} setPhase={setPhase} />
      
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
        
        <div className="p-6 md:p-12 relative z-10 pb-24">
          {renderPhase()}
        </div>

        {/* Mobile Floating Navigation Helper (only visible if sidebar is hidden on small screens, though sidebar logic handles responsiveness) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-gray border-t border-white/10 p-4 flex justify-between items-center z-50">
          <span className="text-xs text-gray-400">Step {Object.keys(Phase).indexOf(currentPhase) + 1} of 6</span>
          <div className="flex gap-2">
             <button 
               onClick={() => {
                 const phases = Object.values(Phase);
                 const currIdx = phases.indexOf(currentPhase);
                 if (currIdx > 0) setPhase(phases[currIdx - 1]);
               }}
               disabled={currentPhase === Phase.PRE_PRODUCTION}
               className="px-4 py-2 bg-white/10 rounded text-sm disabled:opacity-50"
             >
               Prev
             </button>
             <button 
               onClick={() => {
                 const phases = Object.values(Phase);
                 const currIdx = phases.indexOf(currentPhase);
                 if (currIdx < phases.length - 1) setPhase(phases[currIdx + 1]);
               }}
               disabled={currentPhase === Phase.EXPORT}
               className="px-4 py-2 bg-brand-yellow text-black font-bold rounded text-sm disabled:opacity-50"
             >
               Next
             </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;