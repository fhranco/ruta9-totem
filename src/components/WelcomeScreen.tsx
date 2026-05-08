"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { SparkParticles } from "./SparkParticles";

export const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    // Pequeño delay para que la animación de salida se vea
    setTimeout(onStart, 800);
  };

  return (
    <AnimatePresence>
      {!isStarted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={handleStart}
          onTouchStart={handleStart}
          className="fixed inset-0 z-[1000] bg-[#0D0D12] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Background Image with Cinematic Scale */}
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src="/images/bg/road.jpg" 
              className="w-full h-full object-cover" 
              alt="Patagonian Road"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12] via-transparent to-[#0D0D12]" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Ambient Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" 
          />

          {/* Logo & Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ 
                y: [0, -15, 0], 
                opacity: 1, 
                scale: 1 
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.2 },
                scale: { duration: 1, delay: 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="mb-12"
            >
              <img 
                src="/images/ui/logo.png" 
                alt="Ruta 9 Logo" 
                className="w-[350px] h-auto drop-shadow-[0_0_40px_rgba(209,35,43,0.3)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-sm font-black uppercase tracking-[0.4em] mb-32"
            >
              Premium Burger Co.
            </motion.p>

            <motion.div
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent shadow-[0_0_20px_rgba(209,35,43,0.8)]" />
              <span className="text-2xl font-black uppercase tracking-[0.6em] text-white italic drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Toca para comenzar
              </span>
            </motion.div>
          </div>

          {/* Author Credit - High Authority Signature */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <div className="w-8 h-[1px] bg-white/10" />
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">
              Designed & Developed by <span className="text-white/40">Agencia Patagoniacoach</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
