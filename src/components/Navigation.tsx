"use client";
import React from "react";
import { Gauge } from "./Gauge";
import { ShoppingBag, Factory, Beef, Flame, IceCream, CupSoda, Zap } from "lucide-react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "factory", icon: <Factory className="w-5 h-5 block" strokeWidth={1.5} />, label: "Factory" },
  { id: "burgers", icon: <Beef className="w-5 h-5 block" strokeWidth={1.5} />, label: "Burgers" },
  { id: "sandwiches", icon: <Beef className="w-5 h-5 block" strokeWidth={1.5} />, label: "Sandwich" },
  { id: "snacks", icon: <Flame className="w-5 h-5 block" strokeWidth={1.5} />, label: "Snacks" },
  { id: "postres", icon: <IceCream className="w-5 h-5 block" strokeWidth={1.5} />, label: "Postres" },
  { id: "drinks", icon: <CupSoda className="w-5 h-5 block" strokeWidth={1.5} />, label: "Drinks" },
] as const;

export const Navigation = () => {
  const { items, activeSection, setActiveSection, toggleTray, isOpen: trayIsOpen } = useTray();
  
  const totalItems = React.useMemo(() => 
    items.reduce((acc, current) => acc + current.quantity, 0)
  , [items]);

  const totalPrice = React.useMemo(() => 
    items.reduce((acc, item) => {
      const base = item.product.price || item.product.basePrice || 0;
      const extrasTotal = item.extras.reduce((eAcc, e) => eAcc + (e.price || 0), 0);
      return acc + ((base + extrasTotal) * item.quantity);
    }, 0)
  , [items]);

  const handleNav = (id: any, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSection(id);
    // In Totem mode, we might want to reset scroll on the MenuExplorer instead
    const explorer = document.querySelector('main');
    if (explorer) explorer.scrollTop = 0;
  };

  return (
    <>
      {/* Bottom Floating Nav - THE LIQUID HUD */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[50] pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pb-8 flex justify-center w-full max-w-[400px] px-4 pointer-events-none">
        <div className="w-full bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-1.5 flex items-center justify-between shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] pointer-events-auto relative ring-1 ring-white/5">
           
           <div className="flex items-center justify-between flex-1 px-1 gap-0.5">
             {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                   <button 
                     key={section.id}
                     onPointerDown={(e) => handleNav(section.id, e)}
                     style={{ touchAction: 'none' }}
                     className={`relative h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 flex-1 ${isActive ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
                   >
                      {/* Liquid Indicator */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            layoutId="liquid-nav" 
                            className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-full -z-10 shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          >
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary shadow-[0_0_15px_rgba(209,35,43,0.8)]" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className={`transition-all duration-500 ease-out ${isActive ? 'scale-110 text-primary drop-shadow-[0_0_12px_rgba(209,35,43,0.4)]' : 'scale-90'}`}>
                        {section.icon}
                      </div>
                      
                      <span className={`text-[7px] font-black uppercase tracking-[0.25em] absolute -bottom-1 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                         {section.label}
                      </span>
                   </button>
                );
             })}
           </div>
        </div>
      </nav>

      {/* Floating Order Bar - THE CHECKOUT BRIDGE */}
      <AnimatePresence>
        {totalItems > 0 && (
          <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+6.5rem)] left-1/2 -translate-x-1/2 z-[60] flex justify-center w-full max-w-[420px] px-4 pointer-events-none">
            <motion.div 
               initial={{ y: 50, opacity: 0, scale: 0.95 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: 50, opacity: 0, scale: 0.95 }}
               className="pointer-events-auto w-full h-16 bg-black/95 backdrop-blur-3xl border border-white/20 rounded-2xl flex items-center justify-between px-1 shadow-[0_40px_80px_-15px_rgba(0,0,0,1)] overflow-hidden ring-1 ring-emerald-500/20"
            >
               {/* Order Info */}
               <div className="flex flex-col justify-center px-4">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-0.5">Tu Pedido</span>
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-black text-white uppercase tracking-wider">{totalItems} ITEMS</span>
                     <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-xs font-black text-emerald-500">
                        ${totalPrice.toLocaleString('es-CL')}
                     </span>
                  </div>
               </div>

               {/* Action Button */}
               <button 
                  onPointerDown={(e) => { e.preventDefault(); toggleTray(); }}
                  style={{ touchAction: 'none' }}
                  className="h-14 bg-emerald-600 px-8 rounded-xl flex items-center gap-3 active:scale-95 transition-transform group relative overflow-hidden shadow-[0_10px_30px_rgba(16,185,129,0.4)]"
               >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  <span className="relative z-10 text-[11px] font-black text-white uppercase tracking-[0.2em]">Ver Pedido</span>
                  <ShoppingBag className="relative z-10 w-4 h-4 text-white" />
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
