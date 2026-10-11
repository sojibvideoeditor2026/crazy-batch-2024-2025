/**
 * Safe LocalStorage helpers with QuotaExceededError protection and image compression
 */

export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[safeSetItem] Storage quota exceeded or error writing ${key}:`, err);
    try {
      // Emergency recovery: clear oversized legacy keys if needed
      // but do not crash the app
      const keysToClear = [
        'pagla_batch_female_friends',
        'pagla_batch_friends_list',
        'pagla_batch_teachers_list',
      ];
      for (const k of keysToClear) {
        if (k !== key) {
          localStorage.removeItem(k);
        }
      }
      localStorage.setItem(key, value);
      return true;
    } catch {
      // If still fails, gracefully ignore to prevent app crash
      return false;
    }
  }
}

export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

/**
 * Compresses an image file to a lightweight data URL (max 256x256 JPEG)
 * to prevent localStorage QuotaExceededError.
 */
export function compressImageFile(file: File, maxWidth = 256, maxHeight = 256, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Failed to read image'));
        return;
      }
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as lightweight JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
