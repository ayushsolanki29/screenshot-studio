/**
 * Utility to intelligently crop screenshots to remove browser chrome and taskbars.
 */

export async function detectAndCropImage(imageUrl: string): Promise<{ url: string, width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({ url: imageUrl, width: img.width, height: img.height });
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Simple heuristic for now: 
      // Most Windows taskbars are at the bottom and ~40-48px high.
      // Most browser chromes (Chrome/Edge/Safari) are at the top and ~80-120px high.
      // We will do a simple preset crop for demonstration until we build a full edge-detection pixel scanner.
      
      const cropTop = 80; // approximate browser chrome
      const cropBottom = 48; // approximate windows 11 taskbar
      
      const newWidth = img.width;
      const newHeight = img.height - cropTop - cropBottom;

      if (newHeight <= 0) {
        // Fallback if image is too small
        resolve({ url: imageUrl, width: img.width, height: img.height });
        return;
      }

      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = newWidth;
      croppedCanvas.height = newHeight;
      const croppedCtx = croppedCanvas.getContext('2d');
      
      if (croppedCtx) {
        croppedCtx.drawImage(
          canvas,
          0, cropTop, img.width, newHeight, // Source
          0, 0, newWidth, newHeight // Destination
        );
        const dataUrl = croppedCanvas.toDataURL('image/png');
        resolve({ url: dataUrl, width: newWidth, height: newHeight });
      } else {
        resolve({ url: imageUrl, width: img.width, height: img.height });
      }
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}
