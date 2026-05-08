"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Smartphone } from "lucide-react";

export const VerticalEnforcer = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Consider landscape if width > height and it's a mobile-like screen
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1024);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <AnimatePresence>
      {isLandscape && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-10 text-center select-none"
        >
           {/* Cinematic Background for Warning */}
           <div className="absolute inset-0 opacity-20">
              <img src="/images/bg/road.jpg" className="w-full h-full object-cover grayscale" alt="Road" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
           </div>

           <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="relative">
                 <Smartphone className="w-20 h-20 text-primary rotate-90 animate-pulse" />
                 <motion.div 
                   animate={{ rotate: [90, 0, 90] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 flex items-center justify-center"
                 >
                    <RotateCcw className="w-10 h-10 text-white" />
                 </motion.div>
              </div>

              <div className="space-y-2">
                 <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                    MODO <span className="text-primary">VERTICAL</span> <br /> REQUERIDO
                 </h2>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                    Ruta 9 Original Experience
                 </p>
              </div>

              <div className="w-48 h-[1px] bg-white/10" />
              
              <p className="text-sm font-medium text-white/60 max-w-[250px] leading-relaxed">
                 Esta experiencia está diseñada exclusivamente para tótems y dispositivos móviles en posición vertical.
              </p>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
