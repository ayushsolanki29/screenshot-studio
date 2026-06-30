import { LayoutType, Screenshot, ScreenshotPosition, AppSettings } from '@/types';
import { calculateHeroLayout } from './hero';
import { calculateGridLayout } from './grid';
import { calculateFanLayout } from './fan';
import { calculateFloatingLayout } from './floating';
import { calculateStackLayout } from './stack';
import { calculatePerspectiveLayout } from './perspective';
import { calculateLayeredLayout } from './layered';

export type LayoutFunction = (
  screenshots: Screenshot[],
  settings: AppSettings
) => ScreenshotPosition[];

const layouts: Record<LayoutType, LayoutFunction> = {
  Hero: calculateHeroLayout,
  Grid: calculateGridLayout,
  Fan: calculateFanLayout,
  Floating: calculateFloatingLayout,
  Stack: calculateStackLayout,
  Timeline: calculateHeroLayout,
  Carousel: calculateHeroLayout,
  Masonry: calculateHeroLayout,
  Comparison: calculateHeroLayout,
  Story: calculateHeroLayout,
  Perspective: calculatePerspectiveLayout,
  Layered: calculateLayeredLayout,
};

export function calculateLayout(
  screenshots: Screenshot[],
  settings: AppSettings
): ScreenshotPosition[] {
  if (screenshots.length === 0) return [];
  
  // Normalize screenshots for the layout engine based on autoCrop setting
  const normalizedShots = screenshots.map(shot => {
    const useCrop = settings.autoCrop && shot.croppedUrl && shot.croppedWidth && shot.croppedHeight;
    return {
      ...shot,
      width: useCrop ? shot.croppedWidth! : shot.originalWidth,
      height: useCrop ? shot.croppedHeight! : shot.originalHeight,
    } as Screenshot & { width: number, height: number };
  });

  const layoutFn = layouts[settings.layout] || layouts.Hero;
  return layoutFn(normalizedShots, settings);
}
