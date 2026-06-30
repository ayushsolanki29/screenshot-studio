/**
 * Utility to intelligently crop screenshots to remove browser chrome and taskbars.
 */

export async function detectAndCropImage(imageUrl: string): Promise<{ url: string, width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        resolve({ url: imageUrl, width: img.width, height: img.height });
        return;
      }

      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Helper to check if a row is very uniform (e.g. solid border or solid background)
      const isSolidRow = (y: number, maxVariance = 10) => {
        if (y < 0 || y >= height) return false;
        const offset = y * width * 4;
        let diffSum = 0;
        const r = data[offset], g = data[offset + 1], b = data[offset + 2];
        for (let x = 1; x < width; x++) {
          const idx = offset + x * 4;
          diffSum += Math.abs(data[idx] - r) + Math.abs(data[idx+1] - g) + Math.abs(data[idx+2] - b);
        }
        return (diffSum / width) < maxVariance;
      };

      let cropTop = 0;
      let cropBottom = 0;

      // 1. Detect Top Browser Chrome (typically between 40px and 160px)
      // We look for the first highly uniform row which usually indicates the start of the webpage content.
      for (let y = 40; y < Math.min(160, height / 3); y++) {
        if (isSolidRow(y, 15)) {
          cropTop = y;
          // If it's a 1px border, we might want to include/exclude it. We'll just crop right above/at it.
          break;
        }
      }

      // Fallback preset if no distinct uniform line found (common Windows chrome ~80px)
      if (cropTop === 0 && height > 400) {
        cropTop = 80;
      }

      // 2. Detect Bottom Taskbar/Dock (typically between 40px and 80px)
      // We scan from bottom up. Look for a solid line which indicates the top of the taskbar.
      for (let y = height - 30; y > Math.max(height - 120, height * 0.7); y--) {
        if (isSolidRow(y, 15)) {
          cropBottom = height - y;
          break;
        }
      }

      // Fallback preset for taskbar (Windows taskbar ~48px)
      if (cropBottom === 0 && height > 400) {
        cropBottom = 48;
      }

      // Sanity check to avoid cropping too much
      if (cropTop + cropBottom >= height * 0.8) {
        cropTop = 0;
        cropBottom = 0;
      }

      const newWidth = width;
      const newHeight = height - cropTop - cropBottom;

      if (newHeight <= 0 || (cropTop === 0 && cropBottom === 0)) {
        resolve({ url: imageUrl, width, height });
        return;
      }

      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = newWidth;
      croppedCanvas.height = newHeight;
      const croppedCtx = croppedCanvas.getContext('2d');
      
      if (croppedCtx) {
        croppedCtx.drawImage(
          canvas,
          0, cropTop, width, newHeight, // Source
          0, 0, newWidth, newHeight // Destination
        );
        const dataUrl = croppedCanvas.toDataURL('image/png');
        resolve({ url: dataUrl, width: newWidth, height: newHeight });
      } else {
        resolve({ url: imageUrl, width, height });
      }
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}
