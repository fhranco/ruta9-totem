"use client";
import React from "react";
import { Fuel } from "lucide-react";

export const Gauge = ({ value = 75 }) => {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-default h-full">
      <div className="relative w-14 h-14 flex items-center justify-center p-1 bg-black rounded-full border border-white/10 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
        
        {/* Glow Background */}
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />

        {/* SVG Circle Gauge */}
        <svg className="w-full h-full -rotate-90 relative z-10">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3"
            transform="translate(4,4)"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * value) / 100}
            strokeLinecap="round"
            transform="translate(4,4)"
            className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(209,35,43,0.8)]"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="text-[10px] font-black italic text-primary tracking-tighter leading-none">
            {value}%
          </span>
          <div className="w-4 h-[1px] bg-primary/30 my-0.5" />
          <Fuel className="w-2 h-2 text-white/20" />
        </div>
      </div>
      <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-primary transition-colors italic">TELEMETRY</span>
    </div>
  );
};
