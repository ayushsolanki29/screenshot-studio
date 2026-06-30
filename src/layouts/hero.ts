import { LayoutFunction } from './index';

export const calculateHeroLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  // Hero layout stacks images mostly centrally.
  // First image is the largest, others are stacked behind or below.
  return screenshots.map((shot, i) => {
    // Basic scaling to fit container
    const scale = Math.min(availableWidth / shot.width, availableHeight / shot.height) * 0.8;
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    const isFirst = i === 0;
    
    // Offset subsequent images slightly
    const offsetX = isFirst ? 0 : (i % 2 === 0 ? 1 : -1) * (i * 40);
    const offsetY = isFirst ? 0 : i * 30;
    
    const x = (canvasWidth - finalWidth) / 2 + offsetX;
    const y = (canvasHeight - finalHeight) / 2 + offsetY;

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation: isFirst ? 0 : (i % 2 === 0 ? 1 : -1) * (i * 2),
      zIndex: screenshots.length - i,
    };
  });
};
