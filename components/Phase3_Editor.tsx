import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { useProject } from '../contexts/ProjectContext';
import {
  Layers,
  Type,
  Image as ImageIcon,
  Trash2,
  Download,
  ArrowUp,
  ArrowDown,
  Sun,
  Contrast,
} from 'lucide-react';

const Phase3_Editor: React.FC = () => {
  const { capturedAssets, generatedAssets, selectedHook, canvasState, setCanvasState } = useProject();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  
  const allAssets = [...capturedAssets, ...generatedAssets];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1920,
      height: 1080,
      backgroundColor: '#0A0A0A',
    });

    fabricRef.current = canvas;

    // Load saved state if available
    if (canvasState) {
      canvas.loadFromJSON(canvasState as any, () => {
        canvas.renderAll();
      });
    }

    // Track selection
    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    // Auto-save canvas state
    canvas.on('object:modified', () => {
      saveCanvasState();
    });

    canvas.on('object:added', () => {
      saveCanvasState();
    });

    canvas.on('object:removed', () => {
      saveCanvasState();
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  const saveCanvasState = () => {
    if (!fabricRef.current) return;
    const json = fabricRef.current.toJSON();
    setCanvasState({
      objects: json.objects,
      background: json.background,
      width: 1920,
      height: 1080,
    });
  };

  const addImage = async (dataUrl: string) => {
    if (!fabricRef.current) return;

    try {
      const img = await fabric.FabricImage.fromURL(dataUrl, {
        crossOrigin: 'anonymous',
      });
      
      img.scaleToWidth(800);
      img.set({
        left: 100,
        top: 100,
      });
      
      fabricRef.current.add(img);
      fabricRef.current.setActiveObject(img);
      fabricRef.current.renderAll();
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const addText = (text?: string) => {
    if (!fabricRef.current) return;

    const textObj = new fabric.IText(text || selectedHook?.text || 'Your Text Here', {
      left: 100,
      top: 100,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontSize: 120,
      fill: '#FFD700',
      stroke: '#000000',
      strokeWidth: 6,
      fontWeight: 'bold',
      textAlign: 'center',
      shadow: {
        color: 'rgba(0,0,0,0.8)',
        blur: 15,
        offsetX: 4,
        offsetY: 4,
      },
    });

    fabricRef.current.add(textObj);
    fabricRef.current.setActiveObject(textObj);
    fabricRef.current.renderAll();
  };

  const deleteSelected = () => {
    if (!fabricRef.current || !selectedObject) return;
    fabricRef.current.remove(selectedObject);
    fabricRef.current.renderAll();
    setSelectedObject(null);
  };

  const bringForward = () => {
    if (!fabricRef.current || !selectedObject) return;
    fabricRef.current.bringForward(selectedObject);
    fabricRef.current.renderAll();
  };

  const sendBackward = () => {
    if (!fabricRef.current || !selectedObject) return;
    fabricRef.current.sendBackwards(selectedObject);
    fabricRef.current.renderAll();
  };

  const adjustBrightness = (delta: number) => {
    if (!fabricRef.current || !selectedObject || !(selectedObject instanceof fabric.FabricImage)) return;
    const imgObj = selectedObject as any;
    
    const currentBrightness = (imgObj.filters?.find((f: any) => f.type === 'Brightness') as any)?.brightness || 0;
    const newBrightness = Math.max(-1, Math.min(1, currentBrightness + delta));
    
    if (!imgObj.filters) imgObj.filters = [];
    imgObj.filters = imgObj.filters.filter((f: any) => f.type !== 'Brightness');
    imgObj.filters.push(new fabric.filters.Brightness({ brightness: newBrightness }));
    imgObj.applyFilters();
    fabricRef.current.renderAll();
  };

  const adjustContrast = (delta: number) => {
    if (!fabricRef.current || !selectedObject || !(selectedObject instanceof fabric.FabricImage)) return;
    const imgObj = selectedObject as any;
    
    const currentContrast = (imgObj.filters?.find((f: any) => f.type === 'Contrast') as any)?.contrast || 0;
    const newContrast = Math.max(-1, Math.min(1, currentContrast + delta));
    
    if (!imgObj.filters) imgObj.filters = [];
    imgObj.filters = imgObj.filters.filter((f: any) => f.type !== 'Contrast');
    imgObj.filters.push(new fabric.filters.Contrast({ contrast: newContrast }));
    imgObj.applyFilters();
    fabricRef.current.renderAll();
  };

  const exportCanvas = () => {
    if (!fabricRef.current) return;
    const dataUrl = fabricRef.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
    
    const link = document.createElement('a');
    link.download = `thumbnail_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="max-w-full mx-auto space-y-6 animate-fade-in">
      <section className="rounded-3xl border border-white/10 bg-brand-carbon/60 backdrop-blur-xl p-6 md:p-8 shadow-card-lg space-y-3">
        <div className="flex items-center gap-3 text-brand-cyan">
          <Layers className="w-6 h-6" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/60">Phase 03 — Visual Editor</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display text-white">Compose your thumbnail</h2>
        <p className="text-white/70">
          Drag assets from your library, add text layers, adjust filters, and export when ready. Your work auto-saves.
        </p>
      </section>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Canvas Area */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-card-lg">
            <div className="aspect-video bg-brand-midnight rounded-2xl overflow-hidden relative">
              <canvas ref={canvasRef} className="w-full h-full" style={{ maxWidth: '100%' }} />
            </div>
          </div>

          {/* Toolbar */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => addText()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-red text-brand-obsidian font-semibold shadow-glow"
            >
              <Type className="w-4 h-4" />
              Add Text
            </button>

            {selectedObject && (
              <>
                <div className="w-px h-6 bg-white/10"></div>
                
                <button
                  onClick={bringForward}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition"
                  title="Bring Forward"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  onClick={sendBackward}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition"
                  title="Send Backward"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {selectedObject instanceof fabric.FabricImage && (
                  <>
                    <div className="w-px h-6 bg-white/10"></div>
                    
                    <button
                      onClick={() => adjustBrightness(0.1)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition"
                      title="Increase Brightness"
                    >
                      <Sun className="w-4 h-4" /> +
                    </button>

                    <button
                      onClick={() => adjustBrightness(-0.1)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition"
                      title="Decrease Brightness"
                    >
                      <Sun className="w-4 h-4" /> -
                    </button>

                    <button
                      onClick={() => adjustContrast(0.1)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition"
                      title="Increase Contrast"
                    >
                      <Contrast className="w-4 h-4" /> +
                    </button>

                    <button
                      onClick={() => adjustContrast(-0.1)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition"
                      title="Decrease Contrast"
                    >
                      <Contrast className="w-4 h-4" /> -
                    </button>
                  </>
                )}

                <div className="w-px h-6 bg-white/10"></div>

                <button
                  onClick={deleteSelected}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}

            <div className="ml-auto">
              <button
                onClick={exportCanvas}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-brand-obsidian font-semibold"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Assets Panel */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ImageIcon className="w-5 h-5 text-brand-cyan" />
              <h3 className="font-display text-lg">Asset Library</h3>
              <span className="text-xs text-white/40">({allAssets.length})</span>
            </div>

            {allAssets.length === 0 ? (
              <div className="text-center py-8 text-white/40 text-sm">
                No assets yet. Generate or upload images in earlier phases.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
                {allAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => addImage(asset.dataUrl)}
                    className="aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-brand-cyan/50 transition group relative"
                  >
                    <img
                      src={asset.dataUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">Add to Canvas</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedHook && (
            <div className="rounded-3xl border border-brand-teal/30 bg-brand-teal/10 backdrop-blur-xl p-5 space-y-3">
              <h3 className="font-display text-lg text-white">Selected Hook</h3>
              <p className="text-2xl font-display text-white">"{selectedHook.text}"</p>
              <button
                onClick={() => addText(selectedHook.text)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-brand-teal text-brand-obsidian font-semibold"
              >
                <Type className="w-4 h-4" />
                Add as Text Layer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Phase3_Editor;

