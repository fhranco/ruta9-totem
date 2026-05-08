"use client";
import React, { useEffect, useRef } from "react";
import { useTray } from "@/store/useTray";
import { Zap } from "lucide-react";
import { gsap } from "gsap";

interface BurgerCardProps {
  burger: {
    id: string;
    name: string;
    ingredients: string;
    price?: number;
    basePrice?: number;
  };
  factorySelection?: { bread: string; sauce: string };
  setFactorySelection?: React.Dispatch<React.SetStateAction<{ bread: string; sauce: string }>>;
}

export const BurgerCard = ({ burger, factorySelection, setFactorySelection }: BurgerCardProps) => {
  const setActiveProduct = useTray((state) => state.setActiveProduct);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Entrance & Hover Animation
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // Intersection Observer to detect when this burger is centered
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveProduct(burger as any);
          }
        });
      },
      { threshold: [0.5], rootMargin: "-10% 0px -10% 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [burger, setActiveProduct]);

  return (
    <div 
      ref={cardRef}
      className="w-full h-screen h-[100dvh] flex flex-col items-center justify-between pt-[138px] pb-[55vh] px-8 bg-[#0D0D12] text-white border-b border-white/5 relative overflow-hidden group snap-center snap-stop-always"
    >
        {/* Background Accent - Larger Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />

        {/* 1. IDENTITY HEADER */}
        <div className="flex flex-col items-center gap-3 w-full">
           <div className="bg-primary px-6 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(209,35,43,0.4)]">
              <Zap className="w-4 h-4 text-white animate-pulse" />
              <span className="text-[13px] font-black uppercase tracking-[0.4em] text-white italic">{burger.id}</span>
           </div>
           <h2 className="text-5xl sm:text-7xl font-black uppercase text-center tracking-tighter italic leading-none drop-shadow-2xl max-w-2xl">
              {burger.name}
           </h2>
        </div>

        {/* 2. HERO IMAGE XXL */}
        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mt-0">
           <img 
             ref={imageRef}
             src={`/images/products/${burger.id.toLowerCase()}.webp`} 
             alt={burger.name}
             className="w-full h-full object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,1)]"
             onError={(e) => (e.currentTarget.src = "/images/ui/logo.png")}
           />
        </div>

        {/* 3. FOOTER INFO */}
        <div className="flex flex-col items-center w-full mt-0">
           <div className="text-center max-w-[500px]">
              <p className="text-2xl font-black text-white uppercase tracking-tighter leading-tight italic">
                 {burger.ingredients}
              </p>
           </div>
        </div>

        {/* Decorative Texture */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};
