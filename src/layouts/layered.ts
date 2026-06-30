import { LayoutFunction } from './index';

export const calculateLayeredLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  return screenshots.map((shot, i) => {
    // Large prominent center image, others scattered/layered behind
    const isFirst = i === 0;
    const scale = Math.min(availableWidth / shot.width, availableHeight / shot.height) * (isFirst ? 0.75 : 0.5);
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    const offsetX = isFirst ? -40 : 120 * i;
    const offsetY = isFirst ? 0 : 80 * i;
    const rotation = isFirst ? 0 : 5 + (i * 2);

    const x = (canvasWidth - finalWidth) / 2 + offsetX;
    const y = (canvasHeight - finalHeight) / 2 + offsetY;

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation,
      zIndex: screenshots.length - i,
    };
  });
};
