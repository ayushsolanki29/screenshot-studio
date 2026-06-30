import React, { useMemo } from 'react';
import { useScreenshot } from '@/context/ScreenshotContext';
import { motion } from 'framer-motion';
import { calculateLayout } from '@/layouts';

export function Canvas() {
  const { screenshots, settings } = useScreenshot();

  // Calculate layout using the engine
  const layoutPositions = useMemo(() => {
    return calculateLayout(screenshots, settings);
  }, [screenshots, settings]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-auto p-10">
      <motion.div 
        id="export-canvas"
        className="relative shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-500 ease-out"
        style={{
          width: `${settings.canvasWidth / 2}px`, // 50% scale for preview
          height: `${settings.canvasHeight / 2}px`, // 50% scale for preview
          background: settings.backgroundValue,
          borderRadius: `${settings.borderRadius}px`,
          transformOrigin: 'center center'
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {screenshots.map((shot) => {
          const pos = layoutPositions.find(p => p.id === shot.id);
          if (!pos) return null;

          return (
            <motion.img
              key={shot.id}
              src={shot.previewUrl}
              alt="Screenshot"
              className="absolute"
              style={{
                width: `${pos.width / 2}px`,
                height: `${pos.height / 2}px`,
                // Calculate position relative to center since canvas uses flex center
                // But wait, the layout engine gives absolute x,y relative to top-left of canvas.
                // So we should remove 'flex items-center justify-center' from canvas and use top-left positioning.
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                x: (pos.x - settings.canvasWidth / 2 + pos.width / 2) / 2,
                y: (pos.y - settings.canvasHeight / 2 + pos.height / 2) / 2,
                rotate: pos.rotation,
                zIndex: pos.zIndex
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
