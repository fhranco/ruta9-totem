"use client";
import React, { useState } from 'react';
import { Utensils, ShoppingBag } from 'lucide-react';

export const TotemOverlay = () => {
  const [step, setStep] = useState('attract');

  const handleStart = function(e: any) {
    if (e && e.stopPropagation) e.stopPropagation();
    setStep('welcome');
  };

  const selectDineIn = function() { setStep('closed'); };
  const selectTakeAway = function() { setStep('closed'); };

  if (step === 'closed') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#0a0a0a',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
        {step === 'attract' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
               <img 
                  src="/images/bg/road.jpg" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                  alt=""
               />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, black, transparent, black)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <img 
                  src="/images/ui/logo.png" 
                  style={{ width: '300px', marginBottom: '50px' }} 
                  alt="Ruta 9" 
               />
               
               <button 
                  onClick={handleStart}
                  onTouchStart={handleStart}
                  style={{
                    backgroundColor: '#D1232B',
                    color: 'white',
                    fontWeight: '900',
                    fontSize: '2rem',
                    padding: '20px 40px',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    cursor: 'pointer'
                  }}
               >
                  COMENZAR PEDIDO
               </button>
            </div>
          </div>
        )}

        {step === 'welcome' && (
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'white', textAlign: 'center', marginBottom: '50px' }}>
               ¿DONDE VAS A DISFRUTAR?
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%' }}>
               <button 
                  onClick={selectDineIn}
                  style={{ height: '300px', backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '30px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
               >
                  <Utensils size={64} style={{ marginBottom: '20px' }} />
                  <span style={{ fontSize: '2rem', fontWeight: '900' }}>COMER AQUÍ</span>
               </button>

               <button 
                  onClick={selectTakeAway}
                  style={{ height: '300px', backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '30px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
               >
                  <ShoppingBag size={64} style={{ marginBottom: '20px' }} />
                  <span style={{ fontSize: '2rem', fontWeight: '900' }}>LLEVAR</span>
               </button>
            </div>
          </div>
        )}
    </div>
  );
};
