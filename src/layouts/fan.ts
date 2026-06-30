import { LayoutFunction } from './index';

export const calculateFanLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  const count = screenshots.length;

  return screenshots.map((shot, i) => {
    const scale = Math.min(availableWidth / shot.width, availableHeight / shot.height) * 0.7;
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    // Spread fan
    const maxAngle = 30;
    const angleStep = count > 1 ? (maxAngle * 2) / (count - 1) : 0;
    const rotation = -maxAngle + i * angleStep;

    const x = (canvasWidth - finalWidth) / 2 + (i - (count - 1) / 2) * 40;
    const y = (canvasHeight - finalHeight) / 2 + Math.abs(i - (count - 1) / 2) * 20;

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation,
      zIndex: i,
    };
  });
};
