import React from 'react';
import { useScreenshot } from '@/context/ScreenshotContext';
import { LayoutType } from '@/types';
import { Layout, Palette, Sliders, Image as ImageIcon } from 'lucide-react';
import { backgrounds, topDefaults } from '@/data/backgrounds';

const layouts: LayoutType[] = ['Hero', 'Grid', 'Fan', 'Floating', 'Stack', 'Perspective', 'Layered'];

export function Sidebar() {
  const { settings, updateSettings, screenshots, clearAll } = useScreenshot();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-8">
      {/* Upload Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Screenshots
          </div>
          {screenshots.length > 0 && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {screenshots.length}
            </span>
          )}
        </div>
        {screenshots.length > 0 ? (
          <div className="space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {screenshots.map((shot, i) => (
                <img 
                  key={shot.id} 
                  src={shot.previewUrl} 
                  alt={`shot-${i}`}
                  className="h-12 w-12 object-cover rounded-md border border-border/50 shrink-0" 
                />
              ))}
            </div>
            <button 
              onClick={clearAll}
              className="text-xs text-destructive hover:text-destructive/80 transition-colors w-full text-left"
            >
              Clear All
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 text-xs text-muted-foreground text-center">
            No screenshots uploaded
          </div>
        )}
      </div>

      {/* Layouts */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Layout className="w-4 h-4" />
          Layout
        </div>
        <div className="grid grid-cols-2 gap-2">
          {layouts.map((layout) => (
            <button
              key={layout}
              onClick={() => updateSettings({ layout })}
              className={`p-2 text-sm rounded-lg border transition-colors ${
                settings.layout === layout 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border/50 bg-background/50 text-muted-foreground hover:bg-secondary'
              }`}
            >
              {layout}
            </button>
          ))}
        </div>
      </div>

      {/* Backgrounds */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Palette className="w-4 h-4" />
          Background
        </div>

        {/* Top Picks */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground font-medium">Top Picks</span>
          <div className="grid grid-cols-5 gap-2">
            {topDefaults.map((bg, i) => (
              <button
                key={i}
                onClick={() => updateSettings({ backgroundValue: bg.gradient, backgroundType: bg.gradient.includes('gradient') ? 'Gradient' : 'Solid' })}
                className={`h-8 rounded-lg border-2 transition-transform hover:scale-105 ${
                  settings.backgroundValue === bg.gradient ? 'border-primary' : 'border-transparent'
                }`}
                style={{ background: bg.gradient }}
                title={bg.name}
              />
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          {backgrounds.map((cat, i) => (
            <div key={i} className="space-y-2">
              <span className="text-xs text-muted-foreground font-medium">{cat.category}</span>
              <div className="grid grid-cols-5 gap-2">
                {cat.options.map((bg, j) => (
                  <button
                    key={j}
                    onClick={() => updateSettings({ backgroundValue: bg.gradient, backgroundType: bg.gradient.includes('gradient') ? 'Gradient' : 'Solid' })}
                    className={`h-8 rounded-lg border-2 transition-transform hover:scale-105 ${
                      settings.backgroundValue === bg.gradient ? 'border-primary shadow-sm' : 'border-border/20 shadow-sm'
                    }`}
                    style={{ background: bg.gradient }}
                    title={bg.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Sliders className="w-4 h-4" />
          Appearance
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Padding</span>
            <span>{settings.padding}px</span>
          </div>
          <input 
            type="range" 
            min="0" max="200" 
            value={settings.padding}
            onChange={(e) => updateSettings({ padding: parseInt(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Border Radius</span>
            <span>{settings.borderRadius}px</span>
          </div>
          <input 
            type="range" 
            min="0" max="40" 
            value={settings.borderRadius}
            onChange={(e) => updateSettings({ borderRadius: parseInt(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Gap</span>
            <span>{settings.gap}px</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={settings.gap}
            onChange={(e) => updateSettings({ gap: parseInt(e.target.value) })}
            className="w-full accent-primary"
          />
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Noise</span>
            <span>{settings.noise}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={settings.noise}
            onChange={(e) => updateSettings({ noise: parseInt(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>

      </div>
    </div>
  );
}
