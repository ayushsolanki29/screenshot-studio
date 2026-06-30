import React from 'react';
import { Settings, Image as ImageIcon, Layout, Palette, Sliders, Download, Undo2, Redo2, RotateCcw, ZoomIn, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScreenshot } from '@/context/ScreenshotContext';
import { Dropzone } from '@/components/dropzone/Dropzone';
import { Canvas } from '@/components/canvas/Canvas';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { exportImage } from '@/lib/export';

export default function App() {
  const { screenshots } = useScreenshot();
  
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/30">
      
      {/* Sidebar */}
      <aside className="w-80 border-r border-border/40 bg-card/50 backdrop-blur-xl flex flex-col z-20 shadow-xl shadow-black/5">
        <div className="p-6 border-b border-border/40 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Screenshot Studio</h1>
            <p className="text-sm text-muted-foreground mt-1">Compose beautiful shots</p>
          </div>
        </div>
        
        <Sidebar />

        <div className="p-4 border-t border-border/40">
          <button 
            onClick={() => exportImage('export-canvas', 2)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2.5 rounded-lg font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export Image
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-muted/30">
        
        {/* Toolbar */}
        <header className="h-14 border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 z-10 absolute top-0 left-0 right-0">
          <div className="flex items-center gap-2">
            <ToolButton icon={<Undo2 className="w-4 h-4" />} tooltip="Undo" />
            <ToolButton icon={<Redo2 className="w-4 h-4" />} tooltip="Redo" />
            <div className="w-px h-4 bg-border/50 mx-1" />
            <ToolButton icon={<RotateCcw className="w-4 h-4" />} tooltip="Reset" />
          </div>
          <div className="flex items-center gap-2">
            <ToolButton icon={<ZoomIn className="w-4 h-4" />} tooltip="Zoom" />
            <ToolButton icon={<Maximize className="w-4 h-4" />} tooltip="Fit to Screen" />
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-20 pt-32">
          {screenshots.length === 0 ? <Dropzone /> : <Canvas />}
        </div>

      </main>
    </div>
  );
}

function Section({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {title}
      </div>
      <div className="p-4 rounded-xl border border-border/50 bg-background/50 text-xs text-muted-foreground text-center">
        Options coming soon
      </div>
    </div>
  );
}

function ToolButton({ icon, tooltip }: { icon: React.ReactNode, tooltip: string }) {
  return (
    <button 
      className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
      title={tooltip}
    >
      {icon}
    </button>
  );
}
