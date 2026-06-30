import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, Link } from 'lucide-react';
import { useScreenshot } from '@/context/ScreenshotContext';
import { DataImportModal } from './DataImportModal';

export function Dropzone() {
  const { addScreenshots } = useScreenshot();
  const [showImportModal, setShowImportModal] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      addScreenshots(acceptedFiles);
    }
  }, [addScreenshots]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <>
      <div 
        {...getRootProps()} 
        className={`max-w-md w-full p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border/60 bg-card/30 hover:bg-card/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <ImageIcon className="w-8 h-8 text-primary/80" />
        </div>
        <h3 className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop screenshots here...' : 'Drag & drop screenshots'}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          PNG, JPEG, WEBP up to 10MB
        </p>
        <div className="flex gap-3 w-full max-w-xs mx-auto">
          <button 
            type="button" 
            className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors pointer-events-none"
          >
            Browse
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowImportModal(true);
            }}
            className="flex-1 py-2.5 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
          >
            <Link className="w-4 h-4" />
            Paste URLs
          </button>
        </div>
      </div>

      {showImportModal && (
        <DataImportModal onClose={() => setShowImportModal(false)} />
      )}
    </>
  );
}
