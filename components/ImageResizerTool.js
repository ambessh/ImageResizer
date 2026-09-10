"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PRESETS } from "../config/presets";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { processAndCompressImage } from "../utils/imageProcessor";

export default function ImageResizerTool({ initialPresetSlug }) {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Initial State
  const initialPreset = initialPresetSlug
    ? PRESETS.find((p) => p.slug === initialPresetSlug) || null
    : null;

  const [selectedPreset, setSelectedPreset] = useState(initialPreset);
  const [activeSubDocIndex, setActiveSubDocIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentStep, setCurrentStep] = useState(initialPreset ? 2 : 1);
  const shineEffect =
    "!border-emerald-600 ring-2 ring-emerald-500/20 shadow-md transition-all duration-300";

  const currentDoc = selectedPreset?.subDocs?.[activeSubDocIndex] || null;

  // 2. Specs Defaults
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(450);
  const [maxKB, setMaxKB] = useState(50);
  const [minKB, setMinKB] = useState(20);

  // 3. Image & Processed States
  const [imgSrc, setImgSrc] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [processedResult, setProcessedResult] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  // 4. Granular Loaders
  const [isUploading, setIsUploading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isReCropping, setIsReCropping] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  // 5. Toast & Smooth Scroll Guided Flow
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef(null);
  const stepDocRef = useRef(null);
  const stepUploadRef = useRef(null);
  const stepPreviewRef = useRef(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const smoothScrollTo = (ref) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  };

  const categories = ["All", ...new Set(PRESETS.map((p) => p.category))];

  const filteredPresets = PRESETS.filter((preset) => {
    const matchesCat =
      selectedCategory === "All" || preset.category === selectedCategory;
    const matchesSearch = preset.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sync initialPresetSlug when route changes
  useEffect(() => {
    if (initialPresetSlug) {
      const matched = PRESETS.find((p) => p.slug === initialPresetSlug);
      if (matched) {
        setSelectedPreset(matched);
        setActiveSubDocIndex(0);
        setCurrentStep(2);
      }
    }
  }, [initialPresetSlug]);

  // Handle #tool auto-scroll
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#tool") {
      if (selectedPreset) {
        triggerToast(`✓ ${selectedPreset.title} selected!`);
      }
      const timer = setTimeout(() => {
        if (stepDocRef.current) {
          stepDocRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedPreset, initialPresetSlug]);

  // Sync state whenever current sub-doc updates
  useEffect(() => {
    if (currentDoc) {
      setWidth(currentDoc.width || 350);
      setHeight(currentDoc.height || 450);
      setMaxKB(currentDoc.maxKB || 50);
      setMinKB(currentDoc.minKB || 10);
    }
  }, [selectedPreset, activeSubDocIndex, currentDoc]);

  // STEP 1: PRESET SELECTION
  const handlePresetSelect = (preset, e) => {
    if (e) e.preventDefault();

    setSelectedPreset(preset);
    setActiveSubDocIndex(0);
    setCurrentStep(2);

    window.history.pushState(null, "", `/${preset.slug}`);

    triggerToast(`✓ ${preset.title} selected!`);
    smoothScrollTo(stepDocRef);
  };

  // STEP 2: DOC SELECT
  const handleSubDocSelect = (idx) => {
    setActiveSubDocIndex(idx);
    setCurrentStep(3);
    const docName = selectedPreset?.subDocs?.[idx]?.label || "Document";
    triggerToast(`✓ ${docName} selected!`);
    smoothScrollTo(stepUploadRef);
  };

  const handleCancelCrop = () => {
    setShowCropModal(false);
    if (!processedResult && imgSrc) {
      setProcessedResult({
        dataUrl: imgSrc,
        sizeKB: "Original",
      });
    }
    setCurrentStep(5);
    smoothScrollTo(stepPreviewRef);
  };

  // STEP 3: UPLOAD HANDLER
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setOriginalFileName(file.name);
      setImgSrc("");
      setProcessedResult(null);
      setCurrentStep(4);
      triggerToast("Uploading photo...");

      const reader = new FileReader();
      reader.onload = () => {
        setTimeout(() => {
          setImgSrc(reader.result?.toString() || "");
          setIsUploading(false);
          setShowCropModal(true);
          triggerToast("✓ Image loaded! Align in cropper.");
        }, 150);
      };
      reader.onerror = () => {
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // RE-CROP HANDLER
  const handleReCropClick = () => {
    setIsReCropping(true);
    setTimeout(() => {
      setShowCropModal(true);
      setIsReCropping(false);
    }, 100);
  };

  // STEP 5: DOWNLOAD HANDLER
  const handleDownloadClick = () => {
    setIsDownloading(true);
    triggerToast("✓ Image downloaded successfully!");
    setTimeout(() => {
      setIsDownloading(false);
      setCurrentStep(0);
    }, 1200);
  };

  const getDownloadFileName = () => {
    let raw = originalFileName
      ? originalFileName.substring(0, originalFileName.lastIndexOf(".") || originalFileName.length)
      : "img";
    const name = raw.replace(/[^a-zA-Z0-9]/g, "");

    let exam = "Exam";
    if (selectedPreset) {
      const src = selectedPreset.shortName || selectedPreset.slug || "Exam";
      exam = src.split(/[-_ ]+/)[0].toUpperCase();
    }

    let type = "Doc";
    if (currentDoc?.label) {
      const l = currentDoc.label.toLowerCase();
      if (l.includes("photo")) type = "Photo";
      else if (l.includes("sign")) type = "Sign";
      else if (l.includes("thumb")) type = "Thumb";
    }

    return `${exam}_${type}_${name}.jpg`;
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 py-4 sm:py-6 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 transform scale-100 animate-in fade-in zoom-in-95 duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Dynamic Hero Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {selectedPreset
              ? `Verified Official Specifications • ${selectedPreset.category}`
              : "Official Exam & Portal Formats"}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 transition-all">
            {selectedPreset ? (
              <>
                {selectedPreset.title} <span className="text-emerald-700">Resize</span>
              </>
            ) : (
              <>
                Resize<span className="text-emerald-700">Wala</span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto transition-all">
            {selectedPreset
              ? "Prescribed pixel dimensions & file size caps loaded. Select document type below."
              : "Choose your exam, upload your document, and get the exact dimensions & KB limit verified."}
          </p>
        </div>

        {/* 1. Header & Presets (Step 1) */}
        <div
          className={`bg-slate-50/70 border rounded-2xl p-5 space-y-4 transition-all duration-300 ${
            currentStep === 1 ? shineEffect : "border-slate-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                1. Select Target Exam or Portal
              </h2>
              <p className="text-xs text-slate-500">
                Click an exam below to load prescribed requirements
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search exam (e.g. SSC, UPSC, PAN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white text-slate-900 placeholder-slate-400 transition"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-emerald-700 text-white font-semibold shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
            {filteredPresets.map((preset) => {
              const isSelected = selectedPreset?.id === preset.id;
              const targetUrl = `/${preset.slug}`;

              return (
                <Link
                  key={preset.id}
                  href={targetUrl}
                  onClick={(e) => handlePresetSelect(preset, e)}
                  className={`text-left p-3 rounded-xl border transition relative block ${
                    isSelected
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                      : "bg-white hover:bg-slate-100/80 text-slate-800 border-slate-200"
                  }`}
                >
                  <div
                    className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${
                      isSelected ? "text-emerald-100" : "text-slate-500"
                    }`}
                  >
                    {preset.category}
                  </div>
                  <div className="text-xs font-bold truncate">
                    {preset.title}
                  </div>
                  <div
                    className={`text-[10px] mt-1 ${
                      isSelected ? "text-emerald-100" : "text-slate-500"
                    }`}
                  >
                    {preset.subDocs.length} Documents
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Sub-Documents Selection (Step 2) */}
        <div
          id="tool"
          ref={stepDocRef}
          className={`rounded-2xl p-5 transition-all duration-300 bg-slate-50/70 border border-slate-200 scroll-mt-20 ${
            currentStep === 2 ? shineEffect : ""
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                {selectedPreset ? `Selected: ${selectedPreset.title}` : "Waiting for exam selection"}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 mt-0.5">
                2. Which document do you want to resize?
              </h3>
            </div>
          </div>

          {selectedPreset ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedPreset.subDocs.map((doc, idx) => {
                const isCurrent = activeSubDocIndex === idx;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSubDocSelect(idx)}
                    className={`p-3 rounded-xl text-left border transition ${
                      isCurrent
                        ? "bg-white text-slate-900 border-emerald-600 shadow-sm ring-1 ring-emerald-600"
                        : "bg-white hover:bg-slate-100/70 text-slate-700 border-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>{doc.label}</span>
                      {isCurrent && <span className="text-emerald-700 font-bold">✓</span>}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium mt-1">
                      {doc.minKB ? `${doc.minKB} - ${doc.maxKB} KB` : `Max ${doc.maxKB} KB`}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {doc.dimensionsLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-6 px-4 border border-dashed border-slate-300 rounded-xl text-center bg-white text-slate-500 text-xs">
              Please select an exam from step 1 above to view its document types (Photo, Signature, Thumb, etc.)
            </div>
          )}
        </div>

        {/* 3. Upload & Preview Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Upload Box */}
          <div
            ref={stepUploadRef}
            className={`relative border rounded-2xl p-6 bg-slate-50/70 flex flex-col justify-between transition-all duration-300 min-h-[300px] scroll-mt-6 ${
              currentStep === 3 ? shineEffect : "border-slate-200"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!selectedPreset || isUploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor={selectedPreset && !isUploading ? "file-upload" : undefined}
              className={`flex-1 flex flex-col items-center justify-center text-center space-y-3 p-4 border-2 border-dashed rounded-xl transition ${
                selectedPreset && !isUploading
                  ? "cursor-pointer border-slate-300 bg-white hover:border-emerald-600 hover:bg-emerald-50/20"
                  : "cursor-not-allowed border-slate-200 bg-slate-100/60 opacity-70"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold text-emerald-800">Reading image file...</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                    +
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {currentDoc ? `Upload ${currentDoc.label}` : "Upload Document"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {currentDoc
                        ? `Target: ${width} x ${height} px • ${currentDoc.minKB ? `${currentDoc.minKB}-${currentDoc.maxKB}` : `Max ${maxKB}`} KB`
                        : "Select an exam above first"}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-4 py-2 text-white text-xs font-semibold rounded-lg transition shadow-sm ${
                      selectedPreset
                        ? "bg-emerald-700 hover:bg-emerald-800"
                        : "bg-slate-400 pointer-events-none"
                    }`}
                  >
                    Browse Image
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Preview & Download Box */}
          <div
            ref={stepPreviewRef}
            className={`relative border rounded-2xl p-6 flex flex-col justify-between min-h-[300px] transition-all duration-300 bg-slate-50/70 scroll-mt-6 ${
              currentStep === 5 ? shineEffect : "border-slate-200"
            }`}
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                3. Preview & Download
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Review your output before saving.
              </p>

              {isCompressing ? (
                <div className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50/30 text-emerald-800 text-xs space-y-2.5">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <span className="font-semibold animate-pulse">Running binary search compression...</span>
                  <span className="text-[11px] text-slate-500">Enforcing strict dimensions & KB limits</span>
                </div>
              ) : processedResult ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white p-2 max-w-[200px]">
                    <img
                      src={processedResult.dataUrl}
                      alt="Processed Preview"
                      className="max-h-[160px] object-contain rounded-md mx-auto block"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 font-mono bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    File Size: {processedResult.sizeKB} KB
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-200 rounded-xl bg-white text-slate-400 text-xs">
                  <span>No image generated yet</span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Upload and align above to see preview
                  </span>
                </div>
              )}
            </div>

            {processedResult && !isCompressing && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleReCropClick}
                  disabled={isReCropping}
                  className="flex-1 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isReCropping ? (
                    <>
                      <span className="w-3 h-3 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                      <span>Opening...</span>
                    </>
                  ) : (
                    "Re-crop"
                  )}
                </button>

                <a
                  href={processedResult.dataUrl}
                  download={getDownloadFileName()}
                  onClick={handleDownloadClick}
                  className="flex-[2] inline-flex items-center justify-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition shadow-sm active:scale-[0.99] gap-2"
                >
                  {isDownloading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    "Download Image"
                  )}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Portal Target Cap Badge */}
        <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
          <span>Portal Target Cap:</span>
          <span className="font-mono font-semibold text-emerald-700">
            {currentDoc?.minKB ? `${currentDoc.minKB} - ${currentDoc.maxKB} KB` : `Under ${maxKB} KB`} (Auto-optimized)
          </span>
        </div>

        {/* Crop Modal Popup */}
        {/* Crop Modal Popup */}
        {showCropModal && imgSrc && (
          <StudioCropModal
            imgSrc={imgSrc}
            aspectRatio={
              currentDoc?.width && currentDoc?.height
                ? currentDoc.width / currentDoc.height
                : width / height
            }
            onCancel={handleCancelCrop}
            onApplyCrop={async (croppedDataUrl) => {
              if (isCompressing) return;
              setIsCompressing(true);
              setShowCropModal(false);
              triggerToast("Optimizing to exact exam specs...");
              smoothScrollTo(stepPreviewRef);

              await new Promise((resolve) => setTimeout(resolve, 50));

              try {
                const result = await processAndCompressImage(
                  croppedDataUrl,
                  currentDoc?.width || width,
                  currentDoc?.height || height,
                  currentDoc?.maxKB || maxKB,
                  currentDoc?.minKB || minKB
                );

                setProcessedResult(result);
                setCurrentStep(5);
                triggerToast("✓ Ready to download!");
              } finally {
                setIsCompressing(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function StudioCropModal({ imgSrc, aspectRatio = 3.5 / 4.5, onCancel, onApplyCrop }) {
  const imageRef = React.useRef(null);
  const cropperRef = React.useRef(null);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (!imageRef.current) return;

    const cropper = new Cropper(imageRef.current, {
      aspectRatio: aspectRatio,
      viewMode: 1,
      dragMode: "move",
      autoCropArea: 0.85,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      responsive: true,
      zoom: (e) => {
        setZoomLevel(Math.round(e.detail.ratio * 100) / 100);
      },
    });

    cropperRef.current = cropper;
    return () => cropper.destroy();
  }, [imgSrc, aspectRatio]);

  const handleRotate = (deg) => cropperRef.current?.rotate(deg);
  const handleFlip = () => {
    const currentScale = cropperRef.current?.getData().scaleX || 1;
    cropperRef.current?.scaleX(currentScale === 1 ? -1 : 1);
  };
  const handleZoomSlider = (e) => {
    const val = parseFloat(e.target.value);
    cropperRef.current?.zoomTo(val);
    setZoomLevel(val);
  };

  const handleDone = async () => {
    setIsProcessing(true);

    try {
      if (!cropperRef.current) return;
      const canvas = cropperRef.current.getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      });

      // Pass high-quality cropped dataUrl directly to parent
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      await onApplyCrop(dataUrl);
    } catch (error) {
      console.error("Crop export failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6 backdrop-blur-sm">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-xl w-full flex flex-col overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-slate-900 font-semibold text-base sm:text-lg">Adjust & Align Photo</h3>
            <p className="text-xs text-slate-500 mt-0.5">Drag corners to fit or use controls below</p>
          </div>
          <button
            type="button"
            disabled={isProcessing}
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        <div className="relative w-full h-80 sm:h-96 bg-slate-900 flex items-center justify-center overflow-hidden">
          <img ref={imageRef} src={imgSrc} alt="Source" className="max-w-full max-h-full block" />
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600 w-12">Zoom</span>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.05"
              value={zoomLevel}
              onChange={handleZoomSlider}
              disabled={isProcessing}
              className="flex-1 accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-600 w-10 text-right">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRotate(-90)}
                disabled={isProcessing}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg transition disabled:opacity-50"
              >
                ↺ Rotate Left
              </button>
              <button
                type="button"
                onClick={() => handleRotate(90)}
                disabled={isProcessing}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg transition disabled:opacity-50"
              >
                ↻ Rotate Right
              </button>
              <button
                type="button"
                onClick={handleFlip}
                disabled={isProcessing}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg transition disabled:opacity-50"
              >
                ⇄ Flip
              </button>
            </div>
            <button
              type="button"
              onClick={() => cropperRef.current?.reset()}
              disabled={isProcessing}
              className="text-xs text-slate-500 hover:text-slate-800 transition underline disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <button
            type="button"
            disabled={isProcessing}
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={isProcessing}
            className="flex-[2] py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              "Apply Crop"
            )}
          </button>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-700 animate-pulse">
              Optimizing to exact exam specs...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}