export type LayoutType = 'Hero' | 'Grid' | 'Fan' | 'Floating' | 'Timeline' | 'Carousel' | 'Stack' | 'Masonry' | 'Comparison' | 'Story' | 'Perspective' | 'Layered';
export type BackgroundType = 'Solid' | 'Gradient' | 'Mesh' | 'Noise' | 'Glass';

export interface Screenshot {
  id: string;
  file: File;
  previewUrl: string;
  croppedUrl?: string;
  originalWidth: number;
  originalHeight: number;
  croppedWidth?: number;
  croppedHeight?: number;
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
  shadowStrength: number;
  shadowBlur: number;
  shadowDistance: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  opacity: number;
  perspective: number;
  scale: number;
  noise: number;
  glass: boolean;
  glow: boolean;
  reflection: boolean;
  autoCrop: boolean;
  canvasWidth: number;
  canvasHeight: number;
  backgroundType: BackgroundType;
  backgroundValue: string;
  layout: LayoutType;
}
