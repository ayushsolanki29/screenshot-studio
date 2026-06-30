import { LayoutFunction } from './index';

export const calculateStackLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  return screenshots.map((shot, i) => {
    // Scale down a bit to leave room for the stack offset
    const scale = Math.min(availableWidth / shot.width, availableHeight / shot.height) * 0.7;
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    // Stack them diagonally
    const offsetX = i * 40;
    const offsetY = i * -40;

    const x = (canvasWidth - finalWidth) / 2 + offsetX - (screenshots.length * 20);
    const y = (canvasHeight - finalHeight) / 2 + offsetY + (screenshots.length * 20);

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation: 0,
      zIndex: screenshots.length - i,
    };
  });
};
