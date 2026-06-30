import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useScreenshot } from '@/context/ScreenshotContext';
import { motion, useSpring } from 'framer-motion';
import { calculateLayout } from '@/layouts';
import { useGesture } from '@use-gesture/react';

export function Canvas() {
  const { screenshots, settings } = useScreenshot();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Transform state
  const [{ x, y, scale }, setTransform] = useState({ x: 0, y: 0, scale: 0.5 });

  // Smooth springs for transform
  const springX = useSpring(x, { damping: 30, stiffness: 300 });
  const springY = useSpring(y, { damping: 30, stiffness: 300 });
  const springScale = useSpring(scale, { damping: 40, stiffness: 300 });

  useEffect(() => {
    springX.set(x);
    springY.set(y);
    springScale.set(scale);
  }, [x, y, scale, springX, springY, springScale]);

  // Center canvas on mount or when canvas size changes
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setTransform(prev => ({
        ...prev,
        x: (clientWidth - settings.canvasWidth * prev.scale) / 2,
        y: (clientHeight - settings.canvasHeight * prev.scale) / 2,
      }));
    }
  }, [settings.canvasWidth, settings.canvasHeight]);

  useEffect(() => {
    const handleRecenter = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setTransform(prev => ({
          ...prev,
          x: (clientWidth - settings.canvasWidth * prev.scale) / 2,
          y: (clientHeight - settings.canvasHeight * prev.scale) / 2,
        }));
      }
    };

    const handleFit = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const pad = 40;
        const scaleX = (clientWidth - pad * 2) / settings.canvasWidth;
        const scaleY = (clientHeight - pad * 2) / settings.canvasHeight;
        const newScale = Math.min(scaleX, scaleY, 1);
        setTransform({
          scale: newScale,
          x: (clientWidth - settings.canvasWidth * newScale) / 2,
          y: (clientHeight - settings.canvasHeight * newScale) / 2,
        });
      }
    };

    const handleZoomIn = () => {
      setTransform(prev => {
        const newScale = Math.min(prev.scale + 0.1, 3);
        if (containerRef.current) {
          const { clientWidth, clientHeight } = containerRef.current;
          return {
            scale: newScale,
            x: (clientWidth - settings.canvasWidth * newScale) / 2,
            y: (clientHeight - settings.canvasHeight * newScale) / 2,
          };
        }
        return { ...prev, scale: newScale };
      });
    };

    window.addEventListener('canvas:recenter', handleRecenter);
    window.addEventListener('canvas:fit', handleFit);
    window.addEventListener('canvas:zoom-in', handleZoomIn);

    return () => {
      window.removeEventListener('canvas:recenter', handleRecenter);
      window.removeEventListener('canvas:fit', handleFit);
      window.removeEventListener('canvas:zoom-in', handleZoomIn);
    };
  }, [settings.canvasWidth, settings.canvasHeight]);

  useGesture(
    {
      onDrag: ({ offset: [dx, dy], pinching, cancel }) => {
        if (pinching) return cancel();
        setTransform(prev => ({ ...prev, x: dx, y: dy }));
      },
      onWheel: ({ event, delta: [_, dy], ctrlKey }) => {
        event.preventDefault();
        if (ctrlKey) {
          // Zoom
          setTransform(prev => {
            const newScale = Math.max(0.1, Math.min(prev.scale - dy * 0.01, 3));
            // Adjust pan to keep zooming centered on mouse would be ideal, 
            // but simple center zoom is fine for now
            return { ...prev, scale: newScale };
          });
        } else {
          // Pan
          setTransform(prev => ({
            ...prev,
            y: prev.y - dy,
          }));
        }
      },
      onPinch: ({ offset: [s], event }) => {
        event.preventDefault();
        setTransform(prev => ({ ...prev, scale: s }));
      }
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      drag: {
        from: () => [x, y],
        filterTaps: true,
      },
      pinch: {
        from: () => [scale, 0],
        scaleBounds: { min: 0.1, max: 3 },
      }
    }
  );

  const layoutPositions = useMemo(() => {
    return calculateLayout(screenshots, settings);
  }, [screenshots, settings]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden touch-none"
      style={{ cursor: 'grab' }}
      onMouseDown={(e) => { e.currentTarget.style.cursor = 'grabbing'; }}
      onMouseUp={(e) => { e.currentTarget.style.cursor = 'grab'; }}
      onMouseLeave={(e) => { e.currentTarget.style.cursor = 'grab'; }}
    >
      <motion.div 
        id="export-canvas"
        className="absolute shadow-2xl flex items-center justify-center transition-shadow duration-500"
        style={{
          width: `${settings.canvasWidth}px`,
          height: `${settings.canvasHeight}px`,
          background: settings.backgroundValue,
          borderRadius: `${settings.borderRadius}px`,
          transformOrigin: '0 0',
          x: springX,
          y: springY,
          scale: springScale,
        }}
      >
        {/* Noise Overlay */}
        {settings.noise > 0 && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: settings.noise / 100,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
              zIndex: 50,
            }}
          />
        )}

        {screenshots.map((shot) => {
          const pos = layoutPositions.find(p => p.id === shot.id);
          if (!pos) return null;

          const displayUrl = (settings.autoCrop && shot.croppedUrl) ? shot.croppedUrl : shot.previewUrl;

          return (
            <motion.img
              key={shot.id}
              src={displayUrl}
              alt="Screenshot"
              className="absolute"
              style={{
                width: `${pos.width}px`,
                height: `${pos.height}px`,
                boxShadow: `0 ${settings.shadowDistance}px ${settings.shadowBlur}px rgba(0,0,0,${settings.shadowStrength / 100})`,
                opacity: settings.opacity / 100,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: settings.opacity / 100, 
                scale: 1,
                x: pos.x - settings.canvasWidth / 2 + pos.width / 2,
                y: pos.y - settings.canvasHeight / 2 + pos.height / 2,
                rotate: pos.rotation,
                zIndex: pos.zIndex
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
