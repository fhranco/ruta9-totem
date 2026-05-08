"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const SparkParticles = () => {
  const sparks = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      startX: Math.random() * 100,
      targetX: Math.random() * 40 - 20,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 5,
      color: Math.random() > 0.5 ? "#D1232B" : "#FF0000"
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[50]">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 0, y: "110vh", x: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: "-10vh",
            x: spark.targetX
          }}
          transition={{
            duration: spark.duration,
            repeat: Infinity,
            delay: spark.delay,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            left: `${spark.startX}%`,
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.color,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: `0 0 20px ${spark.color}`,
          }}
        />
      ))}
    </div>
  );
};
