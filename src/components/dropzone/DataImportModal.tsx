import React, { useState, useCallback } from 'react';
import { X, Image as ImageIcon, Link as LinkIcon, CheckCircle2, Circle } from 'lucide-react';
import { useScreenshot } from '@/context/ScreenshotContext';

interface DataImportModalProps {
  onClose: () => void;
}

export function DataImportModal({ onClose }: DataImportModalProps) {
  const { addScreenshots } = useScreenshot();
  const [inputData, setInputData] = useState('');
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [isExtracting, setIsExtracting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const extractUrls = useCallback(() => {
    setIsExtracting(true);
    // Regex to match common image URLs in arbitrary text, supporting query params
    const regex = /https?:\/\/[^\s"'<>()\[\]]+?(?:\.png|\.jpe?g|\.webp|\.gif)[^\s"'<>()\[\]]*/gi;
    const matches = inputData.match(regex) || [];
    
    // Deduplicate
    const uniqueUrls = Array.from(new Set(matches));
    setExtractedUrls(uniqueUrls);
    setSelectedUrls(new Set(uniqueUrls));
    setIsExtracting(false);
  }, [inputData]);

  const toggleUrl = (url: string) => {
    setSelectedUrls(prev => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  };

  const importSelected = async () => {
    setIsImporting(true);
    const urlsToImport = Array.from(selectedUrls);
    const files: File[] = [];

    for (let i = 0; i < urlsToImport.length; i++) {
      try {
        const response = await fetch(urlsToImport[i]);
        const blob = await response.blob();
        const filename = `imported-image-${i}-${Date.now()}.${blob.type.split('/')[1] || 'png'}`;
        files.push(new File([blob], filename, { type: blob.type }));
      } catch (err) {
        console.error('Failed to download image:', urlsToImport[i], err);
      }
    }

    if (files.length > 0) {
      await addScreenshots(files);
    }
    
    setIsImporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-2xl rounded-2xl shadow-xl border border-border/50 flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-border/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary" />
            Import from Data
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {extractedUrls.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Paste URLs, JSON, HTML, Markdown, or any plain text containing image links.
              </p>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Paste data here..."
                className="w-full h-64 p-4 rounded-xl border border-border/50 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
              />
              <button
                onClick={extractUrls}
                disabled={!inputData.trim() || isExtracting}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isExtracting ? 'Extracting...' : 'Extract Images'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">Found {extractedUrls.length} images</h3>
                <button 
                  onClick={() => setSelectedUrls(new Set(selectedUrls.size === extractedUrls.length ? [] : extractedUrls))}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  {selectedUrls.size === extractedUrls.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {extractedUrls.map((url, i) => (
                  <div 
                    key={i} 
                    className={`relative rounded-xl border-2 overflow-hidden cursor-pointer transition-colors ${selectedUrls.has(url) ? 'border-primary' : 'border-border/30 hover:border-border'}`}
                    onClick={() => toggleUrl(url)}
                  >
                    <img src={url} alt={`Found ${i}`} className="w-full h-32 object-cover" />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full">
                      {selectedUrls.has(url) 
                        ? <CheckCircle2 className="w-5 h-5 text-primary" />
                        : <Circle className="w-5 h-5 text-muted-foreground" />
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border/50">
                <button
                  onClick={() => setExtractedUrls([])}
                  className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={importSelected}
                  disabled={selectedUrls.size === 0 || isImporting}
                  className="flex-[2] py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isImporting ? 'Importing...' : `Import ${selectedUrls.size} Images`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
