"use client";
import React from "react";
import { Navigation } from "@/components/Navigation";
import { MenuExplorer } from "@/components/MenuExplorer";
import { TrayModal } from "@/components/TrayModal";
import { UpsellDrawer } from "@/components/UpsellDrawer";
import { FixedActionButton } from "@/components/FixedActionButton";
import { FullscreenButton } from "@/components/FullscreenButton";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { IdleScreen } from "@/components/IdleScreen";

export default function Home() {
  const [showWelcome, setShowWelcome] = React.useState(true);

  React.useEffect(() => {
    // 1. Fullscreen logic
    const enterFullscreen = () => {
      const doc = window.document.documentElement;
      if (doc.requestFullscreen) {
        doc.requestFullscreen().catch(() => {});
      }
    };

    // 2. Prevent Context Menu (Bloqueo de menú derecho/largo)
    const preventContext = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", preventContext);

    // 3. Wake Lock (Evitar que la pantalla se duerma)
    let wakeLock: any = null;
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err) {}
    };

    window.addEventListener("click", enterFullscreen);
    window.addEventListener("touchstart", enterFullscreen);
    requestWakeLock();

    return () => {
      window.removeEventListener("click", enterFullscreen);
      window.removeEventListener("touchstart", enterFullscreen);
      window.removeEventListener("contextmenu", preventContext);
      if (wakeLock) wakeLock.release();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0D0D12]">
      {/* 7. ATTRACT MODE (IDLE SCREEN) */}
      <IdleScreen />

      {/* 6. WELCOME SCREEN OVERLAY */}
      <WelcomeScreen onStart={() => setShowWelcome(false)} />

      {/* 0. ADMINISTRATIVE CONTROLS */}
      <FullscreenButton />

      {/* 1. PERSISTENT ACTION BUTTON (THE CONVERSION ENGINE) */}
      <FixedActionButton />

      {/* 2. THE NAVIGATION COMPASS (FIXED) */}
      <Navigation />
      
      {/* 3. THE DISCOVERY ENGINE (NATURAL SCROLL) */}
      <MenuExplorer />
      
      {/* 4. MODALS & DRAWERS */}
      <TrayModal />
      <UpsellDrawer />

      {/* TEXTURE OVERLAY */}
      <div className="noise-overlay" />
    </div>
  );
}
