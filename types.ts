export enum Phase {
  PRE_PRODUCTION = 'PRE_PRODUCTION',
  ASSET_CAPTURE = 'ASSET_CAPTURE',
  AI_GENERATION = 'AI_GENERATION',
  EDIT = 'EDIT',
  QC = 'QC',
  EXPORT = 'EXPORT'
}

export interface ThumbnailIdea {
  text: string;
  reasoning: string;
  emotion: string;
}

export interface QcImageState {
  original: string | null;
  zoom: number;
  isGrayscale: boolean;
}