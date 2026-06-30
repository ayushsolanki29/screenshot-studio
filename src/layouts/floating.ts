import { LayoutFunction } from './index';

export const calculateFloatingLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  return screenshots.map((shot, i) => {
    // Smaller scale
    const scale = Math.min(availableWidth / shot.width, availableHeight / shot.height) * 0.5;
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    // Random but deterministic looking spread based on index
    const angle = (i * 137.5) * (Math.PI / 180);
    const radius = 100 + i * 40;
    
    const x = (canvasWidth - finalWidth) / 2 + Math.cos(angle) * radius;
    const y = (canvasHeight - finalHeight) / 2 + Math.sin(angle) * radius;

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation: (i % 2 === 0 ? 1 : -1) * (10 + i * 2),
      zIndex: i,
    };
  });
};
