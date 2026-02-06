// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
/* eslint-enable no-unused-vars */
import {
  Upload, X, Copy, Check, Loader2, Moon, Sun,
  Palette, Download, Code, FileJson, ChevronDown,
  History, Share2, Eye
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import './index.css';

// Utility per classi condizionali
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Premium Color Database ---
const COLOR_DB = [
  { hex: "#000000", name: "Obsidian Black" },
  { hex: "#FFFFFF", name: "Pure White" },
  { hex: "#F0F8FF", name: "Alice Blue" },
  { hex: "#FAEBD7", name: "Antique White" },
  { hex: "#00FFFF", name: "Cyan Electric" },
  { hex: "#7FFFD4", name: "Aquamarine Dream" },
  { hex: "#F0FFFF", name: "Azure Mist" },
  { hex: "#F5F5DC", name: "Beige Whisper" },
  { hex: "#FFE4C4", name: "Bisque warmth" },
  { hex: "#0000FF", name: "Absolute Blue" },
  { hex: "#8A2BE2", name: "Blue Violet" },
  { hex: "#A52A2A", name: "Brown Earth" },
  { hex: "#DEB887", name: "Burlywood" },
  { hex: "#5F9EA0", name: "Cadet Blue" },
  { hex: "#7FFF00", name: "Chartreuse Spark" },
  { hex: "#D2691E", name: "Chocolate Rich" },
  { hex: "#FF7F50", name: "Coral Reef" },
  { hex: "#6495ED", name: "Cornflower Blue" },
  { hex: "#DC143C", name: "Crimson Tide" },
  { hex: "#00FFFF", name: "Cyan" },
  { hex: "#00008B", name: "Dark Blue Depth" },
  { hex: "#008B8B", name: "Dark Cyan" },
  { hex: "#B8860B", name: "Dark Goldenrod" },
  { hex: "#A9A9A9", name: "Dark Gray" },
  { hex: "#006400", name: "Dark Green Forest" },
  { hex: "#BDB76B", name: "Dark Khaki" },
  { hex: "#8B008B", name: "Dark Magenta" },
  { hex: "#556B2F", name: "Dark Olive" },
  { hex: "#FF8C00", name: "Dark Orange Sunset" },
  { hex: "#9932CC", name: "Dark Orchid" },
  { hex: "#8B0000", name: "Dark Red Blood" },
  { hex: "#E9967A", name: "Dark Salmon" },
  { hex: "#8FBC8F", name: "Dark Sea Green" },
  { hex: "#483D8B", name: "Dark Slate Blue" },
  { hex: "#2F4F4F", name: "Dark Slate Gray" },
  { hex: "#00CED1", name: "Dark Turquoise" },
  { hex: "#9400D3", name: "Dark Violet" },
  { hex: "#FF1493", name: "Deep Pink" },
  { hex: "#00BFFF", name: "Deep Sky Blue" },
  { hex: "#696969", name: "Dim Gray" },
  { hex: "#1E90FF", name: "Dodger Blue" },
  { hex: "#B22222", name: "Firebrick" },
  { hex: "#FFFAF0", name: "Floral White" },
  { hex: "#228B22", name: "Forest Green" },
  { hex: "#FF00FF", name: "Fuchsia Power" },
  { hex: "#DCDCDC", name: "Gainsboro" },
  { hex: "#F8F8FF", name: "Ghost White" },
  { hex: "#FFD700", name: "Golden Lustre" },
  { hex: "#DAA520", name: "Goldenrod" },
  { hex: "#808080", name: "Gray Neutral" },
  { hex: "#008000", name: "Green Standard" },
  { hex: "#ADFF2F", name: "Green Yellow" },
  { hex: "#F0FFF0", name: "Honeydew" },
  { hex: "#FF69B4", name: "Hot Pink" },
  { hex: "#CD5C5C", name: "Indian Red" },
  { hex: "#4B0082", name: "Indigo Depth" },
  { hex: "#FFFFF0", name: "Ivory Pure" },
  { hex: "#F0E68C", name: "Khaki Sand" },
  { hex: "#E6E6FA", name: "Lavender Soft" },
  { hex: "#FFF0F5", name: "Lavender Blush" },
  { hex: "#7CFC00", name: "Lawn Green" },
  { hex: "#FFFACD", name: "Lemon Chiffon" },
  { hex: "#ADD8E6", name: "Light Blue Sky" },
  { hex: "#F08080", name: "Light Coral" },
  { hex: "#E0FFFF", name: "Light Cyan" },
  { hex: "#FAFAD2", name: "Light Goldenrod" },
  { hex: "#90EE90", name: "Light Green" },
  { hex: "#D3D3D3", name: "Light Gray" },
  { hex: "#FFB6C1", name: "Light Pink" },
  { hex: "#FFA07A", name: "Light Salmon" },
  { hex: "#20B2AA", name: "Light Sea Green" },
  { hex: "#87CEFA", name: "Light Sky Blue" },
  { hex: "#778899", name: "Light Slate Gray" },
  { hex: "#B0C4DE", name: "Light Steel Blue" },
  { hex: "#FFFFE0", name: "Light Yellow" },
  { hex: "#00FF00", name: "Lime Neon" },
  { hex: "#32CD32", name: "Lime Green" },
  { hex: "#FAF0E6", name: "Linen" },
  { hex: "#FF00FF", name: "Magenta" },
  { hex: "#800000", name: "Maroon" },
  { hex: "#66CDAA", name: "Medium Aquamarine" },
  { hex: "#0000CD", name: "Medium Blue" },
  { hex: "#BA55D3", name: "Medium Orchid" },
  { hex: "#9370DB", name: "Medium Purple" },
  { hex: "#3CB371", name: "Medium Sea Green" },
  { hex: "#7B68EE", name: "Medium Slate Blue" },
  { hex: "#00FA9A", name: "Medium Spring" },
  { hex: "#48D1CC", name: "Medium Turquoise" },
  { hex: "#C71585", name: "Medium Violet" },
  { hex: "#191970", name: "Midnight Blue" },
  { hex: "#F5FFFA", name: "Mint Cream" },
  { hex: "#FFE4E1", name: "Misty Rose" },
  { hex: "#FFE4B5", name: "Moccasin" },
  { hex: "#FFDEAD", name: "Navajo White" },
  { hex: "#000080", name: "Navy Deep" },
  { hex: "#FDF5E6", name: "Old Lace" },
  { hex: "#808000", name: "Olive" },
  { hex: "#6B8E23", name: "Olive Drab" },
  { hex: "#FFA500", name: "Orange Zest" },
  { hex: "#FF4500", name: "Orange Red" },
  { hex: "#DA70D6", name: "Orchid" },
  { hex: "#EEE8AA", name: "Pale Goldenrod" },
  { hex: "#98FB98", name: "Pale Green" },
  { hex: "#AFEEEE", name: "Pale Turquoise" },
  { hex: "#DB7093", name: "Pale Violet Red" },
  { hex: "#FFEFD5", name: "Papaya Whip" },
  { hex: "#FFDAB9", name: "Peach Puff" },
  { hex: "#CD853F", name: "Peru" },
  { hex: "#FFC0CB", name: "Pink Soft" },
  { hex: "#DDA0DD", name: "Plum" },
  { hex: "#B0E0E6", name: "Powder Blue" },
  { hex: "#800080", name: "Purple Royal" },
  { hex: "#663399", name: "Rebecca Purple" },
  { hex: "#FF0000", name: "Red Intense" },
  { hex: "#BC8F8F", name: "Rosy Brown" },
  { hex: "#4169E1", name: "Royal Blue" },
  { hex: "#8B4513", name: "Saddle Brown" },
  { hex: "#FA8072", name: "Salmon" },
  { hex: "#F4A460", name: "Sandy Brown" },
  { hex: "#2E8B57", name: "Sea Green" },
  { hex: "#FFF5EE", name: "Seashell" },
  { hex: "#A0522D", name: "Sienna" },
  { hex: "#C0C0C0", name: "Silver Light" },
  { hex: "#87CEEB", name: "Sky Blue" },
  { hex: "#6A5ACD", name: "Slate Blue" },
  { hex: "#708090", name: "Slate Gray" },
  { hex: "#FFFAFA", name: "Snow" },
  { hex: "#00FF7F", name: "Spring Green" },
  { hex: "#4682B4", name: "Steel Blue" },
  { hex: "#D2B48C", name: "Tan" },
  { hex: "#008080", name: "Teal" },
  { hex: "#D8BFD8", name: "Thistle" },
  { hex: "#FF6347", name: "Tomato" },
  { hex: "#40E0D0", name: "Turquoise" },
  { hex: "#EE82EE", name: "Violet" },
  { hex: "#F5DEB3", name: "Wheat" },
  { hex: "#FFFFFF", name: "White Snow" },
  { hex: "#F5F5F5", name: "White Smoke" },
  { hex: "#FFFF00", name: "Yellow Sun" },
  { hex: "#9ACD32", name: "Yellow Green" },
  { hex: "#243c5a", name: "Celestial Blue" },
  { hex: "#1a1a2e", name: "Midnight Void" },
  { hex: "#16213e", name: "Abyssal Blue" },
  { hex: "#0f3460", name: "Oceanic Depths" },
  { hex: "#e94560", name: "Cyber Red" },
  { hex: "#6a0572", name: "Nebula Purple" },
  { hex: "#ab1c58", name: "Cosmic Raspberry" },
  { hex: "#ea8f3d", name: "Martian Orange" },
  { hex: "#f8f3d4", name: "Stardust Beige" },
  { hex: "#00b894", name: "Mint Future" },
  { hex: "#fdcb6e", name: "Solar Flare" },
  { hex: "#e17055", name: "Terra Cotta" },
  { hex: "#d63031", name: "Crimson Error" },
  { hex: "#6c5ce7", name: "Royal Amethyst" },
  { hex: "#0984e3", name: "Electron Blue" },
  { hex: "#2d3436", name: "Dark Matter" }
];

// ----------------------------------------------------
// COLOR MATH & HELPERS
// ----------------------------------------------------

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function hexToRgbString(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function hexToHslString(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// Simplified Euclidean Distance
function getColorDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

function getClosestColorName(hex) {
  const inputRgb = hexToRgb(hex);
  if (!inputRgb) return "Unknown";

  let closestColor = COLOR_DB[0];
  let minDistance = Infinity;

  for (const dbColor of COLOR_DB) {
    const dbRgb = hexToRgb(dbColor.hex);
    if (dbRgb) {
      const distance = getColorDistance(inputRgb, dbRgb);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = dbColor;
      }
    }
  }
  return closestColor.name;
}

// --- Accessibility Helpers ---
function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(lum1, lum2) {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function checkContrast(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return { black: 0, white: 0 };
  const lum = getLuminance(rgb.r, rgb.g, rgb.b);
  const whiteLum = 1.0;
  const blackLum = 0.0;
  return {
    white: getContrastRatio(lum, whiteLum),
    black: getContrastRatio(lum, blackLum)
  };
}

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [palette, setPalette] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [colorFormat, setColorFormat] = useState('hex'); // 'hex' | 'rgb' | 'hsl'

  // History State
  const [history, setHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('palette_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showHistory, setShowHistory] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const fileInputRef = useRef(null);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist History
  useEffect(() => {
    localStorage.setItem('palette_history', JSON.stringify(history));
  }, [history]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Add to History (Max 10)
  const addToHistory = (newPalette, img) => {
    setHistory(prev => {
      const newItem = {
        id: Date.now(),
        colors: newPalette,
        // Save a tiny extracted timestamp or color strip instead of full image to save space
        // For now, we will just save the colors
        date: new Date().toLocaleDateString()
      };

      // Filter duplicates?
      const filtered = prev.filter(p => JSON.stringify(p.colors) !== JSON.stringify(newPalette));
      return [newItem, ...filtered].slice(0, 10);
    });
  };

  // ----------------------------------------------------
  // PASTE LISTENER
  // ----------------------------------------------------
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            handleFiles(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFiles = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsExtracting(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
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
      canvas.width = 100;
      canvas.height = (img.height * 100) / img.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const pixelColors = [];

      for (let i = 0; i < imageData.length; i += 40) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a > 128) {
          pixelColors.push({ r, g, b });
        }
      }

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
      addToHistory(uniqueColors);
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

  const restorePalette = (item) => {
    setImageSrc(null); // Assuming we don't store full image for history to save localStorage
    setPalette(item.colors);
    setShowHistory(false);
  };

  // Drag & Drop
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

  // ----------------------------------------------------
  // EXPORT FUNCTIONS
  // ----------------------------------------------------
  const copyAsCSS = () => {
    const css = palette.map((hex, i) => `  --color-${i + 1}: ${hex};`).join('\n');
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
  };

  const copyAsTailwind = () => {
    const tw = palette.map((hex, i) => `        'custom-${i + 1}': '${hex}',`).join('\n');
    navigator.clipboard.writeText(`colors: {\n${tw}\n}`);
  };
  const copyAsJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
  };

  // Social Share (Canvas Gen - V5 Dynamic Height)
  const downloadSocialCard = () => {
    // Shared Constants
    const width = 1080;
    const outerMargin = 80;
    const contentW = width - (outerMargin * 2);
    const cornerRadius = 40;
    const rowHeight = 140;

    // Palette Size Calculation
    const maxColors = palette.length;
    const paletteListHeight = maxColors * rowHeight;
    const titleBlockHeight = 140; // Title + Date
    const footerHeight = 120; // Footer text + margin
    const gapBetweenSections = 100;

    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        // 1. Calculate Image Dimensions (Fit Width, Natural Height)
        const imgAspect = img.width / img.height;
        const renderW = contentW;
        const renderH = contentW / imgAspect; // Height adapts to image

        // 2. Calculate Total Canvas Height
        const totalHeight = outerMargin + renderH + gapBetweenSections + titleBlockHeight + paletteListHeight + outerMargin;

        // 3. Setup Canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = totalHeight;
        const ctx = canvas.getContext("2d");

        // 4. Draw Background
        const grd = ctx.createLinearGradient(0, 0, 0, totalHeight);
        if (theme === 'dark') {
          grd.addColorStop(0, "#0f172a");
          grd.addColorStop(1, "#020617");
        } else {
          grd.addColorStop(0, "#f8fafc");
          grd.addColorStop(1, "#f1f5f9");
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, totalHeight);

        // 5. Draw Image (No Cropping)
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(outerMargin, outerMargin, renderW, renderH, cornerRadius);
        ctx.clip();
        ctx.drawImage(img, outerMargin, outerMargin, renderW, renderH);

        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // 6. Draw Palette & Footer
        drawPaletteOnCanvas(ctx, width, outerMargin + renderH + gapBetweenSections, totalHeight);
        triggerDownload(canvas);
      };
      img.src = imageSrc;

    } else {
      // Fallback: Fixed 9:16 (1920px) for pattern views
      const height = 1920;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Background
      const grd = ctx.createLinearGradient(0, 0, 0, height);
      if (theme === 'dark') {
        grd.addColorStop(0, "#0f172a"); grd.addColorStop(1, "#020617");
      } else {
        grd.addColorStop(0, "#f8fafc"); grd.addColorStop(1, "#f1f5f9");
      }
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // Geometric Pattern (Fixed Size)
      const patternH = height * 0.45;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(outerMargin, outerMargin, contentW, patternH, cornerRadius);
      ctx.clip();
      if (palette.length > 0) {
        const patternGrd = ctx.createLinearGradient(outerMargin, outerMargin, width, patternH);
        patternGrd.addColorStop(0, palette[0]);
        patternGrd.addColorStop(1, palette[1] || palette[0]);
        ctx.fillStyle = patternGrd;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.arc(width * 0.8, patternH * 0.8, 300, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.restore();

      drawPaletteOnCanvas(ctx, width, outerMargin + patternH + gapBetweenSections, height);
      triggerDownload(canvas);
    }

    function drawPaletteOnCanvas(ctx, w, startY, totalH) {
      let y = startY;
      const cardW = w - (outerMargin * 2);

      // Title Section
      ctx.fillStyle = theme === 'dark' ? "#ffffff" : "#0f172a";
      ctx.font = "bold 56px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Palette Collection", outerMargin, y);

      // Date
      ctx.font = "500 28px Inter, sans-serif";
      ctx.fillStyle = theme === 'dark' ? "#94a3b8" : "#64748b";
      ctx.textAlign = "right";
      ctx.fillText(new Date().toLocaleDateString(), w - outerMargin, y);

      y += 80; // Gap after title

      palette.forEach((hex, i) => {
        // Row Background
        ctx.fillStyle = theme === 'dark' ? "#1e293b" : "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.08)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 8;

        ctx.beginPath();
        ctx.roundRect(outerMargin, y, cardW, 110, 24);
        ctx.fill();
        ctx.shadowColor = "transparent";

        // Swatch
        ctx.fillStyle = hex;
        ctx.beginPath();
        ctx.arc(outerMargin + 60, y + 55, 30, 0, 2 * Math.PI);
        ctx.fill();

        // Hex
        ctx.font = "bold 36px monospace";
        ctx.fillStyle = theme === 'dark' ? "#f1f5f9" : "#334155";
        ctx.textAlign = "left";
        ctx.fillText(hex, outerMargin + 110, y + 68);

        // Name
        ctx.font = "500 32px Inter, sans-serif";
        ctx.fillStyle = theme === 'dark' ? "#94a3b8" : "#64748b";
        ctx.textAlign = "right";
        const name = getClosestColorName(hex);
        ctx.fillText(name, w - outerMargin - 30, y + 68);

        y += 140;
      });

      // Footer (Always at absolute bottom of calculated canvas)
      ctx.fillStyle = theme === 'dark' ? "#475569" : "#94a3b8";
      ctx.font = "600 28px Inter, sans-serif";
      ctx.textAlign = "center";

      // If dynamic, use totalH, if fixed, use passed height
      // Ensure footer is at bottom
      ctx.fillText("CHROMATIC AI", w / 2, totalH - 60);
    }

    function triggerDownload(canvas) {
      const link = document.createElement('a');
      link.download = `chromatic-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col items-center justify-center p-6 transition-colors duration-500 overflow-hidden">

      {/* Top Buttons */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
        <button
          onClick={() => setShowHistory(true)}
          className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform shadow-sm"
        >
          <History size={20} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:scale-110 transition-transform shadow-sm"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -45, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 45, scale: 0.5 }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setShowHistory(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 p-6 overflow-y-auto border-l border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-tight">History</h2>
                <button onClick={() => setShowHistory(false)}><X size={20} /></button>
              </div>
              <div className="space-y-4">
                {history.length === 0 && <p className="text-sm text-slate-400">No palettes yet.</p>}
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => restorePalette(item)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex h-8 rounded-md overflow-hidden mb-2">
                      {item.colors.map(c => <div key={c} style={{ background: c }} className="flex-1" />)}
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                      {item.date} • {item.colors.length} Colors
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header (Only show if no image AND no palette) */}
      <AnimatePresence>
        {!imageSrc && palette.length === 0 && (
          <motion.header
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-10 md:top-20 text-center z-10"
          >
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-slate-900 dark:text-white mb-4">
              Chromatic.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
              Drop an image or paste with <kbd className="font-sans px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">Ctrl+V</kbd>
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="w-full max-w-5xl relative flex flex-col items-center">

        {/* Upload Zone (Only show if no image AND no palette) */}
        <AnimatePresence>
          {!imageSrc && palette.length === 0 && (
            <motion.div
              layoutId="upload-container"
              className={cn(
                "relative w-full max-w-xl aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group",
                dragActive
                  ? "border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-900 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files[0])}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-slate-400 dark:text-slate-300" strokeWidth={1.5} />
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">Click or Drop Image</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result View (Show if imageSrc OR palette exists) */}
        <AnimatePresence mode="wait">
          {(imageSrc || palette.length > 0) && (
            <motion.div
              key="result-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center"
            >
              {/* Left Column: Image (Only show if imageSrc exists) */}
              {imageSrc && (
                <div className="flex justify-center md:flex-1 w-full">
                  <motion.div
                    layoutId="upload-container"
                    className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 bg-white dark:bg-slate-800 ring-1 ring-black/5"
                  >
                    <img
                      src={imageSrc}
                      alt="Source"
                      className={cn(
                        "w-full max-h-[70vh] object-contain transition-all duration-700",
                        isExtracting ? "blur-xl scale-105" : "blur-0 scale-100"
                      )}
                    />
                    <button
                      onClick={reset}
                      className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-all z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Right Column: Palette & Tools */}
              <div className={cn(
                "flex flex-col justify-start md:flex-1 w-full max-w-md",
                !imageSrc && "md:flex-none md:w-full md:max-w-2xl" // Center and widen if no image
              )}>
                {/* ... Keep Toolbars & Palette Rendering Same ... */}
                {isExtracting ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-20 text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-sm font-medium tracking-widest uppercase">
                      Distilling Colors...
                    </span>
                  </div>
                ) : (
                  <motion.div className="space-y-3">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                          {/* Format Toggle */}
                          {['hex', 'rgb', 'hsl'].map((fmt) => (
                            <button
                              key={fmt}
                              onClick={() => setColorFormat(fmt)}
                              className={cn(
                                "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                                colorFormat === fmt
                                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                              )}
                            >
                              {fmt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Close Button (Only for History Mode) */}
                        {!imageSrc && (
                          <button
                            onClick={reset}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors mr-2"
                            title="Close Palette"
                          >
                            <X size={18} />
                          </button>
                        )}

                        <button
                          onClick={downloadSocialCard}
                          className="p-2 text-slate-400 hover:text-purple-500 transition-colors"
                          title="Download Social Card"
                        >
                          <Share2 size={18} />
                        </button>
                        <ActionDropdown
                          icon={<Download size={14} />}
                          label="Export"
                          actions={[
                            { label: "Copy CSS", icon: Code, onClick: copyAsCSS },
                            { label: "Copy Tailwind", icon: Palette, onClick: copyAsTailwind },
                            { label: "Copy JSON", icon: FileJson, onClick: copyAsJSON },
                          ]}
                        />
                      </div>
                    </div>

                    {/* Grid layout for History Mode (optional) or just list? Keeping list for consistency */}
                    <div className={cn(!imageSrc && "grid grid-cols-1 md:grid-cols-2 gap-4")}>
                      {palette.map((hex, i) => (
                        <ColorRow key={`${hex}-${i}`} hex={hex} format={colorFormat} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 text-[10px] text-slate-300 dark:text-slate-700 tracking-wider pointer-events-none transition-colors">
        DESIGNED FOR PURISTS
      </footer>
    </div>
  );
}

// ----------------------------------------------------
// SUB COMPONENTS
// ----------------------------------------------------

function ColorRow({ hex, format }) {
  const [copied, setCopied] = useState(false);
  const colorName = getClosestColorName(hex);
  const contrast = checkContrast(hex);

  // Determine what string to show/copy based on format
  const getValue = () => {
    switch (format) {
      case 'rgb': return hexToRgbString(hex);
      case 'hsl': return hexToHslString(hex);
      default: return hex;
    }
  };

  const displayValue = getValue();

  const handleCopy = () => {
    navigator.clipboard.writeText(displayValue);
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
      className={cn(
        "group relative flex items-center gap-4 p-3 rounded-xl",
        "hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-transparent",
        "bg-transparent", // Default transparent
        "hover:bg-white dark:hover:bg-slate-800",
        "hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-black/30",
        "hover:border-slate-100 dark:hover:border-slate-700"
      )}
    >
      {/* Color Swatch */}
      <div
        className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-inner ring-1 ring-black/5 dark:ring-white/10 shrink-0"
        style={{ backgroundColor: hex }}
      />

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-lg md:text-xl font-medium tracking-tight font-mono truncate",
            "text-slate-800 dark:text-slate-100"
          )}>
            {displayValue}
          </span>
          {/* Contrast Badge */}
          <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {contrast.white >= 4.5 && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-transparent text-slate-400 border-slate-200"
                title={`Contrast with White: ${contrast.white.toFixed(1)}`}
              >
                AA
              </span>
            )}
            {contrast.black >= 4.5 && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-slate-800 text-slate-200 border-slate-600"
                title={`Contrast with Black: ${contrast.black.toFixed(1)}`}
              >
                AA
              </span>
            )}
          </div>
        </div>

        <span className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors">
          {colorName}
        </span>
      </div>

      {/* Action/Feedback */}
      <div className="px-4 text-slate-300 dark:text-slate-600 shrink-0">
        {copied ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-emerald-500"
          >
            <Check className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Copied</span>
          </motion.div>
        ) : (
          <Copy className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
    </motion.div>
  );
}

function ActionDropdown({ icon, label, actions }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors"
      >
        {icon}
        <span>{label}</span>
        <ChevronDown size={12} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700 z-50 overflow-hidden"
          >
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                title={action.label}
              >
                <action.icon size={14} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {action.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}