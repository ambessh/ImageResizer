"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { PRESETS } from "../config/presets";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { processAndCompressImage } from "../utils/imageProcessor";

export default function ImageResizerTool({ initialPresetSlug }) {
  const pathname = usePathname();

  // 1. Initial State: Slug hone par match karega, direct Home par null rahega
  const initialPreset = initialPresetSlug
    ? PRESETS.find((p) => p.slug === initialPresetSlug) || null
    : null;

  const [selectedPreset, setSelectedPreset] = useState(initialPreset);
  const [activeSubDocIndex, setActiveSubDocIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Step indicator
  const [currentStep, setCurrentStep] = useState(initialPreset ? 2 : 1);
  const shineEffect =
    "!border-emerald-600 ring-2 ring-emerald-500/20 shadow-md transition-all duration-300";

  const currentDoc = selectedPreset?.subDocs?.[activeSubDocIndex] || null;

  // 2. Sliders / Specs Defaults
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(450);
  const [maxKB, setMaxKB] = useState(50);

  // 3. Image & Crop States
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [processedResult, setProcessedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);

  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const categories = ["All", ...new Set(PRESETS.map((p) => p.category))];

  const filteredPresets = PRESETS.filter((preset) => {
    const matchesCat =
      selectedCategory === "All" || preset.category === selectedCategory;
    const matchesSearch = preset.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sync state whenever selected preset/sub-doc updates
  useEffect(() => {
    if (currentDoc) {
      setWidth(currentDoc.width);
      setHeight(currentDoc.height);
      setMaxKB(currentDoc.maxKB);

      if (imgRef.current && completedCrop) {
        generateCroppedOutput(
          imgRef.current,
          completedCrop,
          currentDoc.width,
          currentDoc.height,
          currentDoc.maxKB
        );
      }
    }
  }, [selectedPreset, activeSubDocIndex]);

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    setActiveSubDocIndex(0);
    setCurrentStep(2);
  };

  const handleSubDocSelect = (idx) => {
    setActiveSubDocIndex(idx);
    setCurrentStep(3);
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
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgSrc("");
      setProcessedResult(null);
      setCurrentStep(4);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
        setShowCropModal(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e) => {
    const img = e.currentTarget || e.target;
    imgRef.current = img;
    const { naturalWidth, naturalHeight } = img;
    const aspect = width / height;

    if (naturalWidth && naturalHeight) {
      const initialCrop = centerCrop(
        makeAspectCrop(
          { unit: "%", width: 90 },
          aspect,
          naturalWidth,
          naturalHeight
        ),
        naturalWidth,
        naturalHeight
      );
      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    }
  };

  const generateCroppedOutput = async (image, pixelCrop, targetW, targetH, targetKB) => {
    if (!pixelCrop || !image) return;
    setIsProcessing(true);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetW, targetH);

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      targetW,
      targetH
    );

    let minQ = 0.05;
    let maxQ = 0.98;
    let bestDataUrl = "";
    let bestSizeKB = 0;

    for (let i = 0; i < 6; i++) {
      const midQ = (minQ + maxQ) / 2;
      const dataUrl = canvas.toDataURL("image/jpeg", midQ);
      const sizeKB = getBase64SizeInKB(dataUrl);

      if (sizeKB <= targetKB) {
        bestDataUrl = dataUrl;
        bestSizeKB = sizeKB;
        minQ = midQ;
      } else {
        maxQ = midQ;
      }
    }

    if (!bestDataUrl) {
      bestDataUrl = canvas.toDataURL("image/jpeg", 0.1);
      bestSizeKB = getBase64SizeInKB(bestDataUrl);
    }

    setProcessedResult({
      dataUrl: bestDataUrl,
      sizeKB: bestSizeKB,
      width: targetW,
      height: targetH,
    });
    setIsProcessing(false);
  };

  const getBase64SizeInKB = (base64Str) => {
    const cleanStr = base64Str.split(",")[1] || base64Str;
    const bufferLen = cleanStr.length * 0.75;
    return Math.round(bufferLen / 1024);
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 py-4 sm:py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
  {/* UNIFIED DYNAMIC HERO HEADER */}
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
                Exam <span className="text-emerald-700">Resize</span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto transition-all">
            {selectedPreset
              ? `Prescribed pixel dimensions & file size caps loaded. Select document type below.`
              : "Choose your exam, upload your document, and get the exact dimensions & KB limit verified."}
          </p>
        </div>

        {/* 1. HEADER & PRESETS (Step 1) */}
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
                  onClick={(e) => {
                    if (pathname === targetUrl) {
                      e.preventDefault();
                    }
                    handlePresetSelect(preset);
                  }}
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

        {/* 2. SUB-DOCUMENTS SELECTION (Step 2) */}
        <div
          className={`rounded-2xl p-5 transition-all duration-300 bg-slate-50/70 border border-slate-200 ${
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
                      Max {doc.maxKB} KB
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

        {/* 3. UPLOAD & PREVIEW WORKSPACE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Upload Box */}
          <div
            className={`border rounded-2xl p-6 bg-slate-50/70 flex flex-col justify-between transition-all duration-300 min-h-[300px] ${
              currentStep === 3 ? shineEffect : "border-slate-200"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!selectedPreset}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor={selectedPreset ? "file-upload" : undefined}
              className={`flex-1 flex flex-col items-center justify-center text-center space-y-3 p-4 border-2 border-dashed rounded-xl transition ${
                selectedPreset
                  ? "cursor-pointer border-slate-300 bg-white hover:border-emerald-600 hover:bg-emerald-50/20"
                  : "cursor-not-allowed border-slate-200 bg-slate-100/60 opacity-70"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                +
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {currentDoc ? `Upload ${currentDoc.label}` : "Upload Document"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {currentDoc
                    ? `Target: ${width} x ${height} px • Max ${maxKB} KB`
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
            </label>
          </div>

          {/* Preview & Download Box */}
          <div
            className={`border rounded-2xl p-6 flex flex-col justify-between min-h-[300px] transition-all duration-300 bg-slate-50/70 ${
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

              {processedResult ? (
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

            {processedResult && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCropModal(true)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Re-crop
                </button>

                <a
                  href={processedResult.dataUrl}
                  download="resized-exam-doc.jpg"
                  onClick={() => setCurrentStep(0)}
                  className="flex-[2] inline-flex items-center justify-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition shadow-sm active:scale-[0.99]"
                >
                  Download Image
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 4. MANUAL FINE-TUNING SLIDERS */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Manual Fine-Tuning (Optional)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
                <span>Width (px)</span>
                <span className="font-semibold text-slate-900 font-mono">{width} px</span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                value={width}
                disabled={!selectedPreset}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWidth(val);
                  if (imgRef.current && completedCrop) {
                    generateCroppedOutput(imgRef.current, completedCrop, val, height, maxKB);
                  }
                }}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer disabled:opacity-50"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
                <span>Height (px)</span>
                <span className="font-semibold text-slate-900 font-mono">{height} px</span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                value={height}
                disabled={!selectedPreset}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHeight(val);
                  if (imgRef.current && completedCrop) {
                    generateCroppedOutput(imgRef.current, completedCrop, width, val, maxKB);
                  }
                }}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer disabled:opacity-50"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
                <span>Max File Size (KB)</span>
                <span className="font-semibold text-slate-900 font-mono">{maxKB} KB</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                value={maxKB}
                disabled={!selectedPreset}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxKB(val);
                  if (imgRef.current && completedCrop) {
                    generateCroppedOutput(imgRef.current, completedCrop, width, height, val);
                  }
                }}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* CROP MODAL POPUP */}
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
              setShowCropModal(false);
              const result = await processAndCompressImage(
                croppedDataUrl,
                currentDoc?.width || width,
                currentDoc?.height || height,
                currentDoc?.maxKB || maxKB || 50
              );
              setProcessedResult(result);
              setCurrentStep(5);
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
  const handleDone = () => {
    if (!cropperRef.current) return;
    const canvas = cropperRef.current.getCroppedCanvas({
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });
    onApplyCrop(canvas.toDataURL("image/jpeg", 0.95));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full flex flex-col overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-slate-900 font-semibold text-base sm:text-lg">Adjust & Align Photo</h3>
            <p className="text-xs text-slate-500 mt-0.5">Drag corners to fit or use controls below</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition"
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
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg transition"
              >
                ↺ Rotate Left
              </button>
              <button
                type="button"
                onClick={() => handleRotate(90)}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg transition"
              >
                ↻ Rotate Right
              </button>
              <button
                type="button"
                onClick={handleFlip}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg transition"
              >
                ⇄ Flip
              </button>
            </div>
            <button
              type="button"
              onClick={() => cropperRef.current?.reset()}
              className="text-xs text-slate-500 hover:text-slate-800 transition underline"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDone}
            className="flex-[2] py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition active:scale-[0.99]"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}