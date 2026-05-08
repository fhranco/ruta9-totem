"use client";
import React, { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Reset del contador si pasa más de 1 segundo entre toques
  useEffect(() => {
    if (clickCount === 0) return;
    const timer = setTimeout(() => setClickCount(0), 1000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleToggle = (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    
    if (newCount >= 3) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
      setClickCount(0);
    } else {
      setClickCount(newCount);
    }
  };

  return (
    <button
      onPointerDown={handleToggle}
      className="fixed top-6 right-6 z-[600] p-4 bg-white/5 border border-white/5 rounded-full text-white/10 transition-all active:scale-95"
      title="Admin Fullscreen (Triple Tap)"
    >
      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
    </button>
  );
};
