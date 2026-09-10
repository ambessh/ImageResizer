/**
 * Processes an image/croppedDataUrl to exact target dimensions
 * and compresses it dynamically between targetMinKB and targetMaxKB.
 */
export async function processAndCompressImage(
  fileOrDataUrl,
  targetWidth = 350,
  targetHeight = 450,
  targetMaxKB = 50,
  targetMinKB = null
) {
  return new Promise((resolve, reject) => {
    const finalWidth = parseInt(targetWidth, 10) || 350;
    const finalHeight = parseInt(targetHeight, 10) || 450;
    const maxKB = parseInt(targetMaxKB, 10) || 50;

    // Adaptive fallback agar minKB provide na ho
    const minKB =
      targetMinKB !== null && targetMinKB !== undefined
        ? parseInt(targetMinKB, 10)
        : Math.max(4, Math.floor(maxKB * 0.25));

    const processImageElement = (img) => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Pure white background for official documents/signatures
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        const srcWidth = img.naturalWidth || img.width;
        const srcHeight = img.naturalHeight || img.height;
        const srcRatio = srcWidth / srcHeight;
        const targetRatio = finalWidth / finalHeight;

        let renderWidth = finalWidth;
        let renderHeight = finalHeight;
        let offsetX = 0;
        let offsetY = 0;

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

        // 1. Binary Search Loop
        let minQuality = 0.15;
        let maxQuality = 0.99;
        let bestDataUrl = canvas.toDataURL("image/jpeg", 0.95);
        let bestSizeKB = getBase64SizeInKB(bestDataUrl);

        for (let i = 0; i < 7; i++) {
          const midQuality = (minQuality + maxQuality) / 2;
          const dataUrl = canvas.toDataURL("image/jpeg", midQuality);
          const sizeKB = getBase64SizeInKB(dataUrl);

          if (sizeKB <= maxKB) {
            bestDataUrl = dataUrl;
            bestSizeKB = sizeKB;
            minQuality = midQuality;
          } else {
            maxQuality = midQuality;
          }
        }

        // 2. Minimum KB Auto-Padding
        if (bestSizeKB < minKB) {
          const targetKB = Math.min(
            maxKB - 1,
            minKB + Math.max(2, Math.floor((maxKB - minKB) * 0.2))
          );
          const targetBytes = targetKB * 1024;
          bestDataUrl = padJpegToTargetBytes(bestDataUrl, targetBytes);
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
 * Adds valid safe JPEG comment marker padding to reach minimum required bytes
 */
function padJpegToTargetBytes(jpegDataUrl, targetBytes) {
  try {
    const parts = jpegDataUrl.split(",");
    const binStr = atob(parts[1] || parts[0]);
    const currentLen = binStr.length;

    if (currentLen >= targetBytes) return jpegDataUrl;

    const bytes = new Uint8Array(currentLen);
    for (let i = 0; i < currentLen; i++) {
      bytes[i] = binStr.charCodeAt(i);
    }

    const neededPadding = targetBytes - currentLen;
    const comLength = Math.min(neededPadding + 2, 65500);

    const padded = new Uint8Array(bytes.length + comLength + 2);
    // SOI marker (FF D8)
    padded[0] = bytes[0];
    padded[1] = bytes[1];

    // COM marker (FF FE)
    padded[2] = 0xff;
    padded[3] = 0xfe;
    padded[4] = (comLength >> 8) & 0xff;
    padded[5] = comLength & 0xff;

    // Fill comment payload with safe spaces (0x20)
    padded.fill(0x20, 6, 4 + comLength);

    // Copy original rest of jpeg
    padded.set(bytes.subarray(2), 4 + comLength);

    let binary = "";
    const chunk = 8192;
    for (let i = 0; i < padded.length; i += chunk) {
      binary += String.fromCharCode.apply(null, padded.subarray(i, i + chunk));
    }
    return "data:image/jpeg;base64," + btoa(binary);
  } catch (err) {
    console.error("Padding failed, returning original:", err);
    return jpegDataUrl;
  }
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