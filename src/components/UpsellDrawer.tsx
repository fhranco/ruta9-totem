"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check, Zap, ShoppingBag } from "lucide-react";
import menuData from "@/data/menu.json";

export const UpsellDrawer = () => {
  const { upsell, closeUpsell } = useTray();
  const { isOpen, burgerName } = upsell;
  
  const addExtraToLastItem = useTray((state) => state.addExtraToLastItem);
  const items = useTray((state) => state.items);
  
  const currentItem = items[items.length - 1];
  const categories = Object.keys(menuData.extras);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with heavy blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUpsell}
            className="fixed inset-0 z-[990] bg-black/80 backdrop-blur-md"
          />

          {/* Drawer - Higher and more robust */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[1000] bg-black border-t-4 border-primary rounded-none h-[80vh] flex flex-col shadow-[0_-30px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* 1. Header Area: Branding & Exit */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between bg-black border-b border-white/5">
                <div className="flex flex-col gap-0.5">
                   <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary animate-pulse" />
                      <h3 className="text-[8px] uppercase font-black tracking-[0.3em] text-primary">POTENCIADOR TÁCTICO</h3>
                   </div>
                   <h2 className="text-xl font-black italic text-white tracking-tighter uppercase leading-tight mt-0.5">
                      EXTRAS PARA <span className="text-primary not-italic">{burgerName}</span>
                   </h2>
                </div>
                <button 
                  onClick={closeUpsell}
                  className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* 2. Scrollable Content: All Categories */}
            <div className="flex-grow overflow-y-auto px-6 py-4 scrollbar-hide space-y-8">
                
                {/* SPECIAL CASE: FACTORY OPTIONS (BREAD & SAUCES) */}
                {currentItem?.product.id === "BF" && (
                  <div className="space-y-10">
                     {/* BREAD SELECTOR */}
                     <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-primary/30 pb-2">
                           <h4 className="text-sm font-black italic text-primary uppercase tracking-widest flex items-center gap-2">
                               SELECCIONA TU PAN
                           </h4>
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">REQUERIDO</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                           {menuData.factory.options.bread.map((bread) => {
                              const isAdded = currentItem?.extras.find(i => i.name === bread);
                              return (
                                <button
                                  key={bread}
                                  onClick={() => addExtraToLastItem({ name: bread, price: 0, type: 'extra', id: `B-${bread}` })}
                                  className={`relative bg-black border ${isAdded ? 'border-primary bg-primary/10 shadow-[0_10px_20px_rgba(209,35,43,0.2)]' : 'border-white/10'} rounded-none p-3 flex flex-col items-center gap-2 transition-all active:scale-95`}
                                >
                                   <span className={`text-[10px] font-black uppercase tracking-tighter ${isAdded ? 'text-white' : 'text-white/40'}`}>{bread}</span>
                                </button>
                              );
                           })}
                        </div>
                     </div>

                     {/* SAUCE SELECTOR */}
                     <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-primary/30 pb-2">
                           <h4 className="text-sm font-black italic text-primary uppercase tracking-widest flex items-center gap-2">
                               SALSA BASE (1 INCLUIDA)
                           </h4>
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">INCLUIDA</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           {menuData.factory.options.sauces.map((sauce) => {
                              const isAdded = currentItem?.extras.find(i => i.name === sauce);
                              return (
                                <button
                                  key={sauce}
                                  onClick={() => addExtraToLastItem({ name: sauce, price: 0, type: 'extra', id: `S-${sauce}` })}
                                  className={`relative bg-black border ${isAdded ? 'border-primary bg-primary/10 shadow-[0_10px_20px_rgba(209,35,43,0.2)]' : 'border-white/10'} rounded-none p-3 flex flex-col items-center gap-2 transition-all active:scale-95`}
                                >
                                   <span className={`text-[10px] font-black uppercase tracking-tighter ${isAdded ? 'text-white' : 'text-white/40'}`}>{sauce}</span>
                                </button>
                              );
                           })}
                        </div>
                     </div>
                  </div>
                )}

                {categories.map((cat) => (
                    <div key={cat} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                           <h4 className="text-sm font-black italic text-white/50 uppercase tracking-widest flex items-center gap-2">
                               {cat}
                           </h4>
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">{ (menuData.extras as any)[cat].length } opciones</span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {(menuData.extras as any)[cat].map((extra: any) => {
                                const isAdded = currentItem?.extras.find(i => i.name === extra.name);
                                return (
                                    <button
                                        key={extra.name}
                                        onClick={() => {
                                           addExtraToLastItem({ ...extra, type: 'extra', id: `EX-${extra.name}` });
                                        }}
                                        className={`relative bg-black border ${isAdded ? 'border-green-500 bg-green-500/20 shadow-[0_10px_20px_rgba(34,197,94,0.3)]' : 'border-white/10 hover:border-white/20'} rounded-xl p-3 flex flex-col items-start gap-1 transition-all text-left group active:scale-95`}
                                    >
                                        <div className={`absolute top-2 right-2 w-4 h-4 rounded-none flex items-center justify-center transition-all ${isAdded ? 'bg-green-500 text-white' : 'bg-white/5 text-white/20'}`}>
                                            {isAdded ? <Check className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                                        </div>
                                        <span className={`text-[10px] font-bold leading-tight pr-4 ${isAdded ? 'text-white' : 'text-white/80'} transition-colors`}>
                                            {extra.name}
                                        </span>
                                        <span className={`text-[11px] font-black tracking-tighter ${isAdded ? 'text-green-400' : 'text-primary'}`}>
                                            + {extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Action Footer: Finalize Order */}
            <div className="px-6 py-6 bg-black border-t border-white/10">
                <button 
                    onClick={closeUpsell}
                    className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(209,35,43,0.3)] active:scale-95 transition-all text-sm uppercase tracking-widest group"
                >
                    <ShoppingBag className="w-4 h-4" />
                    LISTO, CONTINUAR <Check className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-6">
                   EXPLORANDO LA RUTA 9 • CHILE
                </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
