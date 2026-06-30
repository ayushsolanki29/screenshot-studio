import { LayoutFunction } from './index';

export const calculatePerspectiveLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  const count = screenshots.length;

  return screenshots.map((shot, i) => {
    const isCenter = Math.floor(count / 2) === i;
    const distanceToCenter = i - Math.floor(count / 2);
    
    // Center is largest, sides are scaled down
    const scaleFactor = isCenter ? 0.7 : 0.55 - Math.abs(distanceToCenter) * 0.05;
    const scale = Math.min(availableWidth / shot.width, availableHeight / shot.height) * scaleFactor;
    
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    // Fan them out symmetrically
    const offsetX = distanceToCenter * (finalWidth * 0.8);
    const offsetY = Math.abs(distanceToCenter) * 40;
    
    // Rotate based on side
    const rotation = distanceToCenter * 5;

    const x = (canvasWidth - finalWidth) / 2 + offsetX;
    const y = (canvasHeight - finalHeight) / 2 + offsetY;

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation,
      zIndex: isCenter ? 10 : 10 - Math.abs(distanceToCenter),
    };
  });
};
