"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "@/data/menu.json";

export const IdleScreen = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const burgers = menuData.burgers;

  // 1. Lógica de Inactividad (30 segundos)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 30000); // 30 segundos
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Iniciar el temporizador

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  // 2. Lógica de Rotación de Productos (cada 5 segundos)
  useEffect(() => {
    if (!isIdle) return;

    const rotationTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % burgers.length);
    }, 5000);

    return () => clearInterval(rotationTimer);
  }, [isIdle, burgers.length]);

  const currentBurger = burgers[currentIndex];

  return (
    <AnimatePresence>
      {isIdle && (
        <div
          className="fixed inset-0 z-[2000] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => setIsIdle(false)}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center p-12">
            {/* 2. PRODUCT IMAGE (CLEAN) */}
            <div className="relative z-10 w-full max-w-[600px] aspect-square flex items-center justify-center mb-12">
              <img 
                src={`/images/products/${currentBurger.id.toLowerCase()}.webp`} 
                alt={currentBurger.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 3. PRODUCT INFO BLOCK */}
            <div className="relative z-20 text-center flex flex-col items-center max-w-[800px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary text-white text-xl font-black italic px-4 py-1 rounded-lg">
                  {currentBurger.id}
                </div>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white">
                  {currentBurger.name}
                </h2>
              </div>

              <p className="text-2xl font-bold text-white/60 uppercase tracking-[0.2em] mb-10 leading-tight">
                {currentBurger.ingredients}
              </p>

              {/* PRICE AT BOTTOM WITH BLACK BG */}
              <div className="bg-black border-2 border-white/10 px-12 py-4 rounded-full">
                 <div className="text-7xl font-black text-primary italic leading-none">
                   ${currentBurger.price.toLocaleString('es-CL')}
                 </div>
              </div>
            </div>

            {/* 4. CALL TO ACTION */}
            <div className="absolute bottom-20 flex flex-col items-center gap-4 opacity-30">
              <div className="w-1 h-12 bg-primary" />
              <span className="text-sm font-black uppercase tracking-[0.6em] text-white">Toca para ordenar</span>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
