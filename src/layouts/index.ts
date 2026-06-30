import { LayoutType, Screenshot, ScreenshotPosition, AppSettings } from '@/types';
import { calculateHeroLayout } from './hero';
import { calculateGridLayout } from './grid';
import { calculateFanLayout } from './fan';
import { calculateFloatingLayout } from './floating';

export type LayoutFunction = (
  screenshots: Screenshot[],
  settings: AppSettings
) => ScreenshotPosition[];

const layouts: Record<LayoutType, LayoutFunction> = {
  Hero: calculateHeroLayout,
  Grid: calculateGridLayout,
  Fan: calculateFanLayout,
  Floating: calculateFloatingLayout,
  // Add placeholders for the rest
  Timeline: calculateHeroLayout,
  Carousel: calculateHeroLayout,
  Stack: calculateHeroLayout,
  Masonry: calculateHeroLayout,
  Comparison: calculateHeroLayout,
  Story: calculateHeroLayout,
};

export function calculateLayout(
  screenshots: Screenshot[],
  settings: AppSettings
): ScreenshotPosition[] {
  if (screenshots.length === 0) return [];
  
  const layoutFn = layouts[settings.layout] || layouts.Hero;
  return layoutFn(screenshots, settings);
}
