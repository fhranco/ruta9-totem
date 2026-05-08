"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { Beef, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FixedActionButton = () => {
  const activeProduct = useTray((state) => state.activeProduct);
  const addItem = useTray((state) => state.addItem);
  const openUpsell = useTray((state) => state.openUpsell);
  const activeSection = useTray((state) => state.activeSection);
  const isTrayOpen = useTray((state) => state.isOpen);
  const isUpsellOpen = useTray((state) => state.upsell.isOpen);

  const isFoodSection = activeSection !== "drinks";
  const shouldHide = !activeProduct || !isFoodSection || isTrayOpen || isUpsellOpen;
  
  if (shouldHide) return null;

  const handleAction = (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(activeProduct);
    openUpsell(activeProduct.name);
  };

  return (
    <div className="fixed bottom-[206px] left-1/2 -translate-x-1/2 z-[100] w-full max-w-[400px] px-12 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="w-full"
        >
          <button 
            onPointerDown={handleAction}
            onMouseDown={handleAction}
            style={{ touchAction: 'none' }}
            className="pointer-events-auto w-full bg-primary text-white py-6 rounded-[2.5rem] shadow-[0_30px_80px_rgba(209,35,43,0.7)] border-2 border-white/30 flex flex-col items-center justify-center active:scale-95 transition-all group relative"
          >
             <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] opacity-0 group-active:opacity-100 transition-opacity" />
             
             <span className="text-[11px] font-black tracking-[0.3em] opacity-70 mb-1 italic">AÑADIR</span>
             
             <div className="flex flex-col items-center leading-none mb-2">
                <span className="text-5xl font-black italic tracking-tighter">
                   ${(activeProduct.price || activeProduct.basePrice || 0).toLocaleString('es-CL')}
                </span>
             </div>

             <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden px-4">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] italic truncate">{activeProduct.name}</span>
             </div>

             <div className="absolute -top-2 -right-2 bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-4 border-primary">
                <Plus className="w-6 h-6 stroke-[4]" />
             </div>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
