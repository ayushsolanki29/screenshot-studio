export type LayoutType = 'Hero' | 'Grid' | 'Fan' | 'Floating' | 'Timeline' | 'Carousel' | 'Stack' | 'Masonry' | 'Comparison' | 'Story';
export type BackgroundType = 'Solid' | 'Gradient' | 'Mesh' | 'Noise' | 'Glass';

export interface Screenshot {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

export interface ScreenshotPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  scale?: number;
}

export interface AppSettings {
  padding: number;
  gap: number;
  rotation: number;
  shadow: string;
  borderRadius: number;
  canvasWidth: number;
  canvasHeight: number;
  backgroundType: BackgroundType;
  backgroundValue: string;
  layout: LayoutType;
}
