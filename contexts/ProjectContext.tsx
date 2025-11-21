import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import localforage from 'localforage';

export interface ThumbnailIdea {
  text: string;
  reasoning: string;
  emotion: string;
}

export interface Asset {
  id: string;
  name: string;
  dataUrl: string;
  type: 'captured' | 'generated';
  timestamp: number;
}

export interface CanvasObject {
  type: 'image' | 'text';
  id: string;
  [key: string]: any;
}

export interface CanvasState {
  objects: CanvasObject[];
  background?: string;
  width: number;
  height: number;
}

export interface Variant {
  id: string;
  name: string;
  canvasState: CanvasState;
  thumbnail: string;
  timestamp: number;
}

interface ProjectContextType {
  // Phase 1
  title: string;
  setTitle: (title: string) => void;
  hookIdeas: ThumbnailIdea[];
  setHookIdeas: (ideas: ThumbnailIdea[]) => void;
  selectedHook: ThumbnailIdea | null;
  setSelectedHook: (hook: ThumbnailIdea | null) => void;

  // Phase 2/2.5
  capturedAssets: Asset[];
  addCapturedAsset: (asset: Omit<Asset, 'id' | 'timestamp' | 'type'>) => void;
  generatedAssets: Asset[];
  addGeneratedAsset: (asset: Omit<Asset, 'id' | 'timestamp' | 'type'>) => void;
  removeAsset: (id: string) => void;

  // Phase 3
  canvasState: CanvasState | null;
  setCanvasState: (state: CanvasState) => void;

  // Phase 5
  variants: Variant[];
  addVariant: (variant: Omit<Variant, 'id' | 'timestamp'>) => void;
  removeVariant: (id: string) => void;

  // Utilities
  resetProject: () => void;
  saveProject: () => Promise<void>;
  loadProject: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = 'thumbwar_project';

// Configure localforage
localforage.config({
  name: 'ThumbWar',
  storeName: 'projects',
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [hookIdeas, setHookIdeas] = useState<ThumbnailIdea[]>([]);
  const [selectedHook, setSelectedHook] = useState<ThumbnailIdea | null>(null);
  const [capturedAssets, setCapturedAssets] = useState<Asset[]>([]);
  const [generatedAssets, setGeneratedAssets] = useState<Asset[]>([]);
  const [canvasState, setCanvasState] = useState<CanvasState | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

  // Auto-save on state changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveProject();
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, hookIdeas, selectedHook, capturedAssets, generatedAssets, canvasState, variants]);

  const addCapturedAsset = (asset: Omit<Asset, 'id' | 'timestamp' | 'type'>) => {
    const newAsset: Asset = {
      ...asset,
      id: `captured-${Date.now()}-${Math.random()}`,
      type: 'captured',
      timestamp: Date.now(),
    };
    setCapturedAssets((prev) => [...prev, newAsset]);
  };

  const addGeneratedAsset = (asset: Omit<Asset, 'id' | 'timestamp' | 'type'>) => {
    const newAsset: Asset = {
      ...asset,
      id: `generated-${Date.now()}-${Math.random()}`,
      type: 'generated',
      timestamp: Date.now(),
    };
    setGeneratedAssets((prev) => [...prev, newAsset]);
  };

  const removeAsset = (id: string) => {
    setCapturedAssets((prev) => prev.filter((a) => a.id !== id));
    setGeneratedAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const addVariant = (variant: Omit<Variant, 'id' | 'timestamp'>) => {
    const newVariant: Variant = {
      ...variant,
      id: `variant-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const resetProject = () => {
    setTitle('');
    setHookIdeas([]);
    setSelectedHook(null);
    setCapturedAssets([]);
    setGeneratedAssets([]);
    setCanvasState(null);
    setVariants([]);
    localforage.removeItem(STORAGE_KEY);
  };

  const saveProject = async () => {
    try {
      const projectData = {
        title,
        hookIdeas,
        selectedHook,
        capturedAssets,
        generatedAssets,
        canvasState,
        variants,
        savedAt: Date.now(),
      };
      await localforage.setItem(STORAGE_KEY, projectData);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const loadProject = async () => {
    try {
      const projectData = await localforage.getItem<any>(STORAGE_KEY);
      if (projectData) {
        setTitle(projectData.title || '');
        setHookIdeas(projectData.hookIdeas || []);
        setSelectedHook(projectData.selectedHook || null);
        setCapturedAssets(projectData.capturedAssets || []);
        setGeneratedAssets(projectData.generatedAssets || []);
        setCanvasState(projectData.canvasState || null);
        setVariants(projectData.variants || []);
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  };

  // Load project on mount
  useEffect(() => {
    loadProject();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        title,
        setTitle,
        hookIdeas,
        setHookIdeas,
        selectedHook,
        setSelectedHook,
        capturedAssets,
        addCapturedAsset,
        generatedAssets,
        addGeneratedAsset,
        removeAsset,
        canvasState,
        setCanvasState,
        variants,
        addVariant,
        removeVariant,
        resetProject,
        saveProject,
        loadProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
