// src/App.jsx
import React, { useState, useRef } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
/* eslint-enable no-unused-vars */
import { Upload, X, Copy, Check, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import './index.css';

// Utility per classi condizionali
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Mappatura nomi colori (Sample)
const colorNames = {
  // ... (puoi espandere questa lista o usare una libreria come 'namer')
  fallback: "Unknown Tone"
};

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [palette, setPalette] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // --- Logic ---
  const handleFiles = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsExtracting(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      // Piccola pausa artificiale per dare peso all'operazione (UX perceive value)
      setTimeout(() => extractPalette(e.target.result), 600);
    };
    reader.readAsDataURL(file);
  };

  const extractPalette = (src) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // Ridimensiona per performance ma mantieni qualità sufficiente
      canvas.width = 100; 
      canvas.height = (img.height * 100) / img.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const pixelColors = [];

      // Algoritmo semplificato (campionamento)
      for (let i = 0; i < imageData.length; i += 40) { // Salta pixel per velocità
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        // Ignora trasparenti o troppo scuri/chiari se vuoi
        if (a > 128) {
             pixelColors.push({ r, g, b });
        }
      }

      // Logica semplice di unicità
      const uniqueColors = [];
      const seen = new Set();
      
      for (const p of pixelColors) {
        const hex = rgbToHex(p.r, p.g, p.b);
        if (!seen.has(hex)) {
          seen.add(hex);
          uniqueColors.push(hex);
          if (uniqueColors.length >= 6) break;
        }
      }

      setPalette(uniqueColors);
      setIsExtracting(false);
    };
    img.src = src;
  };

  const rgbToHex = (r, g, b) =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  const reset = () => {
    setImageSrc(null);
    setPalette([]);
  };

  // --- Drag & Drop Handlers ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col items-center justify-center p-6 transition-colors duration-700">
      
      {/* Header Minimalista (Scompare quando c'è l'immagine per immersività) */}
      <AnimatePresence>
        {!imageSrc && (
          <motion.header 
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-10 md:top-20 text-center z-10"
          >
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-slate-900 mb-4">
              Chromatic.
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
              Drop an image. Extract the soul. <br/>
              <span className="opacity-50">Pure color extraction for designers.</span>
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="w-full max-w-5xl relative flex flex-col items-center">
        
        {/* Upload State / Drag Zone */}
        <AnimatePresence>
          {!imageSrc && (
            <motion.div
              key="upload-zone"
              layoutId="upload-container"
              className={cn(
                "relative w-full max-w-xl aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group",
                dragActive 
                  ? "border-slate-900 bg-slate-50 scale-[1.02]" 
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files[0])}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
              </div>
              <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
              <p className="text-slate-400 text-xs mt-2">JPG, PNG, WEBP</p>
            </motion.div>
          )}
        </AnimatePresence>
{/* Result State */}
<AnimatePresence mode="wait">
  {imageSrc && (
    <motion.div
      key="result-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center"
    >
      {/* Image Column */}
      <div className="flex justify-center md:flex-1">
        <motion.div
          layoutId="upload-container"
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-white ring-1 ring-black/5 max-w-full"
        >
          <img
            src={imageSrc}
            alt="Source"
            className={cn(
              "max-w-full max-h-[70vh] object-contain transition-all duration-700",
              isExtracting ? "blur-xl scale-105" : "blur-0 scale-100"
            )}
          />

          {/* Reset Button (Floating) */}
          <button
            onClick={reset}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Palette Column */}
      <div className="flex flex-col justify-start md:flex-1 w-full max-w-md">
        {isExtracting ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium tracking-widest uppercase">
              Distilling Colors...
            </span>
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Extracted Palette
              </h3>
              <span className="text-xs text-slate-300 font-mono">
                {palette.length} COLORS
              </span>
            </div>

            {palette.map((hex, i) => (
              <ColorRow key={`${hex}-${i}`} hex={hex} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </main>

      {/* Footer discreto */}
      <footer className="fixed bottom-6 text-[10px] text-slate-300 tracking-wider pointer-events-none">
        DESIGNED FOR PURISTS
      </footer>
    </div>
  );
}
function ColorRow({ hex }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
      }}
      onClick={handleCopy}
      className="group relative flex items-center gap-4 p-3 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-transparent hover:border-slate-100"
    >
      {/* Color Swatch */}
      <div 
        className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-inner ring-1 ring-black/5" 
        style={{ backgroundColor: hex }} 
      />
      
      {/* Info */}
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-lg md:text-xl font-medium text-slate-800 tracking-tight font-mono">
          {hex}
        </span>
        <span className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
          {colorNames[hex] || "Auto-generated"}
        </span>
      </div>

      {/* Action/Feedback */}
      <div className="px-4 text-slate-300">
        {copied ? (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-emerald-500"
          >
            <Check className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Copied</span>
          </motion.div>
        ) : (
          <Copy className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
    </motion.div>
  );
}