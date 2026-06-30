import html2canvas from 'html2canvas';

export async function exportImage(elementId: string, scale: number = 2) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Temporarily reset transform for clean capture if needed, 
    // but html2canvas usually handles it depending on options.
    // We render at 50% scale in UI, but we want 100% or more for export.
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    const canvas = await html2canvas(element, {
      scale: scale, // 2x or 4x high res
      useCORS: true,
      backgroundColor: null, // respect element's background
      logging: false,
    });

    element.style.transform = originalTransform;

    const dataUrl = canvas.toDataURL('image/png');
    
    // Download
    const link = document.createElement('a');
    link.download = `screenshot-studio-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export image:', error);
  }
}

export async function copyToClipboard(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    element.style.transform = originalTransform;

    canvas.toBlob(async (blob) => {
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('Copied to clipboard!');
      }
    });
  } catch (error) {
    console.error('Failed to copy image:', error);
  }
}
