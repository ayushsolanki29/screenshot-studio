import { LayoutFunction } from './index';

export const calculateGridLayout: LayoutFunction = (screenshots, settings) => {
  const { canvasWidth, canvasHeight, padding, gap } = settings;
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  const count = screenshots.length;
  if (count === 0) return [];

  // Simple grid math: find columns and rows
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const cellWidth = (availableWidth - (cols - 1) * gap) / cols;
  const cellHeight = (availableHeight - (rows - 1) * gap) / rows;

  return screenshots.map((shot, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Scale image to fit cell
    const scale = Math.min(cellWidth / shot.width, cellHeight / shot.height);
    const finalWidth = shot.width * scale;
    const finalHeight = shot.height * scale;

    const cellX = padding + col * (cellWidth + gap);
    const cellY = padding + row * (cellHeight + gap);

    // Center image in cell
    const x = cellX + (cellWidth - finalWidth) / 2;
    const y = cellY + (cellHeight - finalHeight) / 2;

    return {
      id: shot.id,
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      rotation: 0,
      zIndex: i,
    };
  });
};
