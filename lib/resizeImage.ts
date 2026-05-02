/** Client-side resize + JPEG compress for localStorage-safe product images. */

export async function fileToCompressedDataUrl(
  file: File,
  maxWidth = 1400,
  quality = 0.85
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file');
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error('Image is too large (max 12MB before processing)');
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not process image'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        // Hard cap ~2MB base64 for localStorage stability
        if (dataUrl.length > 2_500_000) {
          const smaller = canvas.toDataURL('image/jpeg', 0.72);
          resolve(smaller);
        } else {
          resolve(dataUrl);
        }
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read image'));
    };
    img.src = objectUrl;
  });
}
