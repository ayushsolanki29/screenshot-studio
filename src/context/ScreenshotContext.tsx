import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Screenshot, AppSettings, LayoutType, BackgroundType } from '@/types';
import { detectAndCropImage } from '@/lib/crop';

interface ScreenshotContextType {
  screenshots: Screenshot[];
  settings: AppSettings;
  addScreenshots: (files: File[]) => Promise<void>;
  removeScreenshot: (id: string) => void;
  reorderScreenshots: (startIndex: number, endIndex: number) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  clearAll: () => void;
}

const defaultSettings: AppSettings = {
  padding: 80,
  gap: 20,
  rotation: 0,
  shadowStrength: 30,
  shadowBlur: 50,
  shadowDistance: 20,
  borderRadius: 20,
  borderWidth: 0,
  borderColor: '#ffffff',
  opacity: 100,
  perspective: 0,
  scale: 100,
  noise: 0,
  glass: false,
  glow: false,
  reflection: false,
  autoCrop: true,
  canvasWidth: 1600,
  canvasHeight: 900,
  backgroundType: 'Gradient',
  backgroundValue: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
  layout: 'Hero',
};

const ScreenshotContext = createContext<ScreenshotContextType | undefined>(undefined);

export function ScreenshotProvider({ children }: { children: ReactNode }) {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const addScreenshots = useCallback(async (files: File[]) => {
    const newShots = await Promise.all(
      files.map(async (file) => {
        return new Promise<Screenshot>((resolve) => {
          const url = URL.createObjectURL(file);
          const img = new Image();
          img.onload = async () => {
            const cropResult = await detectAndCropImage(url);
            resolve({
              id: crypto.randomUUID(),
              file,
              previewUrl: url,
              croppedUrl: cropResult.url,
              originalWidth: img.width,
              originalHeight: img.height,
              croppedWidth: cropResult.width,
              croppedHeight: cropResult.height,
            });
          };
          img.src = url;
        });
      })
    );
    
    setScreenshots((prev) => [...prev, ...newShots]);
  }, []);

  const removeScreenshot = useCallback((id: string) => {
    setScreenshots((prev) => {
      const target = prev.find(s => s.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(s => s.id !== id);
    });
  }, []);

  const reorderScreenshots = useCallback((startIndex: number, endIndex: number) => {
    setScreenshots((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const clearAll = useCallback(() => {
    screenshots.forEach(s => URL.revokeObjectURL(s.previewUrl));
    setScreenshots([]);
  }, [screenshots]);

  return (
    <ScreenshotContext.Provider 
      value={{ 
        screenshots, 
        settings, 
        addScreenshots, 
        removeScreenshot, 
        reorderScreenshots, 
        updateSettings, 
        clearAll 
      }}
    >
      {children}
    </ScreenshotContext.Provider>
  );
}

export function useScreenshot() {
  const context = useContext(ScreenshotContext);
  if (context === undefined) {
    throw new Error('useScreenshot must be used within a ScreenshotProvider');
  }
  return context;
}
