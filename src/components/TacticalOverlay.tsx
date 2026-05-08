"use client";
import React from "react";
import { motion } from "framer-motion";

export const TacticalOverlay = () => {
  return (
    <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden">
      {/* 1. HUD BORDERS - PRECISIÓN MILITAR */}
      <div className="absolute inset-4 sm:inset-8 border border-white/[0.03] rounded-[3rem] pointer-events-none">
        {/* Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-3xl" />
      </div>

      {/* 2. SCANNING LINE - SUTIL */}
      <motion.div 
        animate={{ 
          y: ["-100%", "200%"],
          opacity: [0, 0.05, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-transparent via-white to-transparent opacity-[0.02]"
      />

      {/* 3. VIGNETTE - ABSOLUTE BLACK COMPATIBLE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* 4. TECHNICAL DATA LABELS */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-[0.05]">
        <span className="text-[7px] font-black tracking-widest text-white uppercase">System: Ruta9_Super_v3.0</span>
        <span className="text-[7px] font-black tracking-widest text-white uppercase">Status: Tactical_Active</span>
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-4 opacity-[0.05]">
         {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white" />)}
      </div>
    </div>
  );
};
