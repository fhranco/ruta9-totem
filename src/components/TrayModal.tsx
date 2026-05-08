"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MapPin, CheckCircle2, UserCircle, Zap, Plus, ChevronRight, MessageSquareDashed, AtSign, Store, Send } from "lucide-react";

export const TrayModal = () => {
  const { items, isOpen, toggleTray, removeItem, removeExtraFromItem, clearTray, userName, setUserName } = useTray();

  const calculateItemTotal = (item: any) => {
    const burgerPrice = item.product.price;
    const extrasPrice = item.extras.reduce((acc: number, extra: any) => acc + extra.price, 0);
    return (burgerPrice + extrasPrice) * item.quantity;
  };

  const totalPrice = items.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  const handleWhatsAppDelivery = () => {
    let text = `*📍 NUEVO PEDIDO DELIVERY RUTA 9*\n`;
    text += `--------------------------\n`;
    
    items.forEach(item => {
      text += `*▶ ${item.quantity}x ${item.product.name}*\n`;
      if (item.product.id === "BF") {
        text += `   [FACT] ${item.product.ingredients}\n`;
      }
      if (item.extras.length > 0) {
        text += `   *Extras:* ${item.extras.map((ex: any) => ex.name).join(", ")}\n`;
      }
      text += `\n`;
    });

    text += `--------------------------\n`;
    text += `*💰 TOTAL: ${totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}*\n\n`;
    text += `_Pedido generado desde la SuperApp_ 📲🍔\n`;

    const phone = "56957636076";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ y: "100%", scale: 1 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: "100%", scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-[550px] h-[100dvh] sm:h-[90vh] bg-black sm:border border-white/10 sm:rounded-[3rem] shadow-4xl flex flex-col overflow-hidden pb-32"
          >
            {/* 1. Header Area: Branding & Exit */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between bg-black border-b border-white/5">
                <div className="flex items-center gap-3">
                    <img src="/images/ui/logo.png" className="w-8 h-8 grayscale brightness-200" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black italic text-white tracking-tighter uppercase leading-none">
                            RUTA <span className="text-primary animate-pulse">9</span>
                        </h2>
                        <div className="flex items-center gap-1 text-primary mt-1">
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">PEDIDO ACTUAL</span>
                        </div>
                    </div>
                </div>
                <button 
                  onClick={toggleTray}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto scrollbar-hide">
                {/* 3. Items Categorized by TICKET BLOCKS */}
                <div className="p-4 pt-2 space-y-3">
                    {items.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center opacity-10 gap-3 border-2 border-dashed border-white/5 rounded-3xl">
                            <MessageSquareDashed className="w-8 h-8" />
                            <span className="text-xs font-bold uppercase tracking-widest italic">Aún no hay nada en tu ruta</span>
                        </div>
                    ) : (
                        items.map((item) => (
                           <motion.div 
                              key={item.id}
                              layout
                              className="bg-black border border-white/10 rounded-3xl p-4 flex flex-col gap-3 shadow-xl relative overflow-hidden"
                           >
                              {/* 1. Burger Line */}
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary text-sm font-black italic shadow-inner">
                                       {item.product.id}
                                    </div>
                                    <div className="flex flex-col">
                                       <h4 className="text-base font-black italic text-white leading-none uppercase tracking-tighter mb-0.5">{item.product.name}</h4>
                                       <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic">{item.product.type || 'Producto Base'}</span>
                                    </div>
                                 </div>
                                 <button 
                                    onClick={() => removeItem(item.id)}
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-red-500 transition-all active:scale-95"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>

                              {/* 2. Extras List (Internal Block) */}
                              {item.extras.length > 0 && (
                                 <div className="bg-black border border-white/5 rounded-2xl p-3 space-y-1.5">
                                    <h5 className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">PERSONALIZACIÓN CON EXTRAS:</h5>
                                      {item.extras.map((extra: any, idx: number) => (
                                       <div key={idx} className="flex items-center justify-between group">
                                          <div className="flex items-center gap-2">
                                             <button 
                                                onClick={() => removeExtraFromItem(item.id, extra.name)}
                                                className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/80 transition-colors shrink-0"
                                             >
                                                <X className="w-2.5 h-2.5 text-white" />
                                             </button>
                                             <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(209,35,43,1)] opacity-50" />
                                             <span className="text-[10px] font-bold text-white/70 uppercase tracking-tight">{extra.name}</span>
                                          </div>
                                          <span className="text-[9px] font-black text-primary">
                                             + {extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                          </span>
                                       </div>
                                    ))}
                                 </div>
                              )}

                              {/* 3. Block Total Line */}
                              <div className="flex items-center justify-between border-t border-white/5 pt-2">
                                 <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Subtotal Ticket</span>
                                 <span className="text-sm font-black italic text-white tracking-tighter">
                                    {calculateItemTotal(item).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                 </span>
                              </div>
                           </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* 4. Grand Total Summary (MAX VISIBILITY) & ACTIONS */}
            <div className="p-6 pb-8 bg-black border-t border-white/10 flex flex-col gap-4 shadow-[0_-25px_60px_rgba(0,0,0,0.8)]">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-1">TOTAL DE LA RUTA</span>
                        <p className="text-5xl font-black text-white tracking-tighter italic leading-none drop-shadow-xl">
                           {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">TICKET ID</span>
                       <span className="text-[10px] font-mono text-white/40">#R9-{Math.floor(Math.random() * 9000) + 1000}</span>
                    </div>
                </div>

                {/* ACTION BUTTONS (SPLIT GRID) */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                   {/* DINE-IN (ANFITRIÓN) */}
                   <div className="bg-white/5 rounded-none p-4 flex flex-col items-center justify-center text-center gap-2 border border-white/10 relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40" />
                       <Store className="w-5 h-5 text-white/40" />
                       <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-1">LOCAL</span>
                           <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.1em] leading-tight">Mostrar pedido <br />al anfitrión</span>
                       </div>
                   </div>
                   
                   {/* DELIVERY (WHATSAPP) */}
                   <button 
                     onClick={handleWhatsAppDelivery}
                     className="bg-primary rounded-none p-4 flex flex-col items-center justify-center text-center gap-2 border border-white/20 shadow-[0_15px_30px_rgba(209,35,43,0.3)] hover:scale-105 active:scale-95 transition-all group overflow-hidden relative"
                   >
                       <Send className="w-5 h-5 text-white -rotate-12 group-hover:rotate-0 transition-transform" />
                       <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-1">DELIVERY</span>
                           <span className="text-[7px] font-bold text-white/80 uppercase tracking-[0.1em] leading-tight">Enviar pedido <br />por WhatsApp</span>
                       </div>
                   </button>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                   <div className="flex items-center justify-between">
                       <span className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black text-white/40 uppercase tracking-[0.1em]">
                           <MapPin className="w-3 h-3 text-primary shrink-0" />
                           <span className="truncate">LAUTARO NAVARRO 1087</span>
                       </span>
                       <span className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black text-white/40 tracking-[0.1em]">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0"></span>
                           +56 9 5763 6076
                       </span>
                   </div>
                   
                   <div className="flex items-center justify-between border-t border-white/5 pt-3">
                       <button 
                           onClick={clearTray}
                           className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] hover:text-red-500 transition-colors flex items-center gap-2"
                       >
                           <Trash2 className="w-3 h-3" /> BORRAR RUTA
                       </button>

                       <a href="https://www.instagram.com/ruta9.burgers" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-[#E1306C] transition-colors">
                           <AtSign className="w-3 h-3" /> @RUTA9.BURGERS
                       </a>
                   </div>
                </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
