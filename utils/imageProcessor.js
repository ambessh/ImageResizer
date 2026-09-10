/**
 * Processes an image/croppedDataUrl to exact target dimensions
 * and compresses it using Binary Search to land just under targetMaxKB.
 * 100% Client-side browser execution.
 */
export async function processAndCompressImage(
  fileOrDataUrl,
  targetWidth = 350,
  targetHeight = 450,
  targetMaxKB = 50
) {
  return new Promise((resolve, reject) => {
    const finalWidth = parseInt(targetWidth, 10) || 350;
    const finalHeight = parseInt(targetHeight, 10) || 450;
    const maxKB = parseInt(targetMaxKB, 10) || 50;

    const processImageElement = (img) => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext("2d");

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Pure white background for official passport/exam photos
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        // Aspect ratio containment logic
        const srcWidth = img.naturalWidth || img.width;
        const srcHeight = img.naturalHeight || img.height;
        const srcRatio = srcWidth / srcHeight;
        const targetRatio = finalWidth / finalHeight;

        let renderWidth = finalWidth;
        let renderHeight = finalHeight;
        let offsetX = 0;
        let offsetY = 0;

        // Agar user ne already cropped aspect use kiya hai toh fill karega, otherwise contain karega
        if (Math.abs(srcRatio - targetRatio) > 0.02) {
          if (srcRatio > targetRatio) {
            renderWidth = finalWidth;
            renderHeight = finalWidth / srcRatio;
            offsetY = (finalHeight - renderHeight) / 2;
          } else {
            renderHeight = finalHeight;
            renderWidth = finalHeight * srcRatio;
            offsetX = (finalWidth - renderWidth) / 2;
          }
        }

        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

        // Binary Search Compression Loop (6 iterations guarantee precision within ~1KB)
        let minQuality = 0.15;
        let maxQuality = 0.98;
        let bestDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        let bestSizeKB = getBase64SizeInKB(bestDataUrl);

        for (let i = 0; i < 6; i++) {
          const midQuality = (minQuality + maxQuality) / 2;
          const dataUrl = canvas.toDataURL("image/jpeg", midQuality);
          const sizeKB = getBase64SizeInKB(dataUrl);

          if (sizeKB <= maxKB) {
            bestDataUrl = dataUrl;
            bestSizeKB = sizeKB;
            minQuality = midQuality; // Try higher quality
          } else {
            maxQuality = midQuality; // Too big, squeeze further
          }
        }

        // Final fallback safeguard agar image tab bhi maxKB se thodi badi ho
        if (bestSizeKB > maxKB) {
          bestDataUrl = canvas.toDataURL("image/jpeg", 0.2);
          bestSizeKB = getBase64SizeInKB(bestDataUrl);
        }

        resolve({
          dataUrl: bestDataUrl,
          sizeKB: bestSizeKB,
          width: finalWidth,
          height: finalHeight,
        });
      } catch (error) {
        reject(error);
      }
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => processImageElement(img);
    img.onerror = () => reject(new Error("Failed to load image source."));

    if (typeof fileOrDataUrl === "string") {
      img.src = fileOrDataUrl;
    } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(fileOrDataUrl);
    } else {
      reject(new Error("Invalid image source provided."));
    }
  });
}

/**
 * Accurate Base64 payload size in KB calculation
 */
export function getBase64SizeInKB(base64String) {
  if (!base64String || typeof base64String !== "string") return 0;
  const parts = base64String.split(",");
  const base64Data = parts[1] || parts[0];
  const padding = (base64Data.match(/=+$/) || [""])[0].length;
  const bytes = (base64Data.length * 3) / 4 - padding;
  return Math.max(1, Math.round(bytes / 1024));
}