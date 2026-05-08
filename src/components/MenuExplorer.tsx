"use client";
import React, { useEffect, useRef } from "react";
import { BurgerCard } from "./BurgerCard";
import menuData from "@/data/menu.json";
import { useTray } from "@/store/useTray";
import { gsap } from "gsap";

export const MenuExplorer = () => {
  const activeSection = useTray((state) => state.activeSection);
  const openUpsell = useTray((state) => state.openUpsell);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [factorySelection, setFactorySelection] = React.useState({ bread: "Brioche", sauce: "Mayonesa Casera" });

  const currentItems = (menuData as any)[activeSection] || [];
  const isFactorySection = activeSection === "factory";

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
    // Reset scroll when section changes
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  return (
    <main 
      ref={mainRef}
      className="w-full h-screen h-[100dvh] bg-black overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
    >
        {(activeSection === "burgers" || activeSection === "snacks" || activeSection === "postres" || activeSection === "sandwiches" || activeSection === "factory") && (
           <div ref={containerRef} className="flex flex-col w-full">
               {isFactorySection && (
                  <BurgerCard 
                    burger={menuData.factory as any} 
                    factorySelection={factorySelection}
                    setFactorySelection={setFactorySelection}
                    onAdd={(name) => openUpsell(name)}
                  />
               )}

               {!isFactorySection && currentItems.map((item: any) => (
                  <BurgerCard 
                    key={item.id}
                    burger={item} 
                    onAdd={(name) => openUpsell(name)}
                  />
               ))}
           </div>
        )}

        {activeSection === "drinks" && (
            <div className="px-6 pt-28 pb-48 space-y-12">
              <div className="flex flex-col gap-2 mb-8">
                 <h1 className="text-4xl font-black italic text-primary tracking-tighter uppercase leading-none">REPOSTAJE</h1>
                 <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Hidratación para el viajero</p>
              </div>

              {Object.entries(menuData.drinks).map(([category, items]) => (
                <div key={category} className="space-y-6">
                   <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] border-l-2 border-primary pl-4">{category}</h2>
                   <div className="grid grid-cols-1 gap-3">
                      {items.map((drink: any, idx: number) => (
                         <DrinkCard key={idx} drink={drink} />
                      ))}
                   </div>
                </div>
              ))}
            </div>
         )}
    </main>
  );
};

const DrinkCard = ({ drink }: { drink: any }) => {
   const addItem = useTray((state) => state.addItem);
   const items = useTray((state) => state.items);
   const removeProduct = useTray((state) => state.removeProduct);
   const isAdded = items.some(i => i.product.name === drink.name);

   const handleAction = (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAdded) {
         removeProduct(drink.name);
      } else {
         addItem({ ...drink, id: drink.name, ingredients: 'Bebida seleccionada' });
      }
   };

   return (
     <button 
        onPointerDown={handleAction}
        style={{ touchAction: 'none' }}
        className={`bg-black/40 backdrop-blur-md border ${isAdded ? 'border-primary ring-1 ring-primary/30' : 'border-white/10'} rounded-2xl p-6 flex items-center justify-between text-left w-full active:scale-95 transition-all shadow-xl group`}
     >
        <div>
           <h4 className={`text-xl font-black italic uppercase tracking-tighter ${isAdded ? 'text-primary' : 'text-white'}`}>{drink.name}</h4>
           <div className="flex items-center gap-2 mt-1">
              <div className={`w-1 h-1 rounded-full ${isAdded ? 'bg-primary' : 'bg-white/20'}`} />
              <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">TOQUE PARA AÑADIR</span>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-2xl font-black italic text-white tracking-tighter">${drink.price.toLocaleString()}</span>
           <span className="text-[8px] font-bold text-primary uppercase tracking-widest">CLP</span>
        </div>
     </button>
   );
};
