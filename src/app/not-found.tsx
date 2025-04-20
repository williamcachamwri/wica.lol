"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RiArrowLeftLine, RiHome2Line, RiRefreshLine, RiErrorWarningLine, RiArrowRightLine } from "@remixicon/react";

export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchInterval = useRef<NodeJS.Timeout | null>(null);
  const errorTextRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Glitch effect timing
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    // Initial glitch
    setTimeout(triggerGlitch, 500);

    // Set up random glitching
    glitchInterval.current = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, 2000);

    return () => {
      if (glitchInterval.current) {
        clearInterval(glitchInterval.current);
      }
    };
  }, []);

  // Text scramble effect
  const scrambleText = (text: string) => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.3) {
        result += chars[Math.floor(Math.random() * chars.length)];
      } else {
        result += text[i];
      }
    }
    return result;
  };

  return (
    <main 
      ref={mainRef}
      className="relative min-h-screen text-white overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      {/* Cosmic background elements */}
      <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
        {/* Animated nebula background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')",
            backgroundSize: "cover",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1),rgba(0,0,0,0)_50%)] pointer-events-none" />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(52, 211, 153, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 70%, rgba(52, 211, 153, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 30% 70%, rgba(52, 211, 153, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 30%, rgba(52, 211, 153, 0.3) 0%, transparent 70%)",
            ]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.3), transparent)",
          }}
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: ["-100%", "0%", "100%"]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${52 + Math.random() * 30}, ${211 + Math.random() * 30}, ${153 + Math.random() * 30}, ${0.2 + Math.random() * 0.3})`,
              filter: "blur(1px)",
              boxShadow: `0 0 ${Math.random() * 5 + 2}px rgba(52, 211, 153, ${0.3 + Math.random() * 0.4})`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -Math.random() * 150 - 50],
              x: [0, (Math.random() - 0.5) * 80],
              scale: [0, 1 + Math.random() * 0.5, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`grid-line-h-${i}`}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-green-300 to-transparent"
              style={{ top: `${(i / 15) * 100}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`grid-line-v-${i}`}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-green-300 to-transparent"
              style={{ left: `${(i / 15) * 100}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Glowing orbs */}
        {[...Array(8)].map((_, i) => {
          const size = 150 + Math.random() * 200;
          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, rgba(52, 211, 153, 0.1) 50%, transparent 80%)`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50],
                y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          );
        })}
        
        {/* Hexagon grid pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(5) rotate(0)">
                <path d="M25,17.3 L25,0 L0,8.7 L0,25.9 L25,34.6 L50,25.9 L50,8.7 Z" fill="none" stroke="rgba(52, 211, 153, 0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Animated wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <motion.path 
              d="M0 50L48 45.7C96 41.3 192 32.7 288 30.3C384 28 480 32 576 39.2C672 46.3 768 56.7 864 58.8C960 61 1056 55 1152 51.8C1248 48.7 1344 48.3 1392 48.2L1440 48V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
              fill="url(#paint0_linear)" 
              fillOpacity="0.1"
              animate={{
                d: [
                  "M0 50L48 45.7C96 41.3 192 32.7 288 30.3C384 28 480 32 576 39.2C672 46.3 768 56.7 864 58.8C960 61 1056 55 1152 51.8C1248 48.7 1344 48.3 1392 48.2L1440 48V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z",
                  "M0 60L48 55.7C96 51.3 192 42.7 288 40.3C384 38 480 42 576 49.2C672 56.3 768 66.7 864 68.8C960 71 1056 65 1152 61.8C1248 58.7 1344 58.3 1392 58.2L1440 58V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V60Z",
                  "M0 40L48 45.7C96 51.3 192 62.7 288 60.3C384 58 480 42 576 35.2C672 28.3 768 30.7 864 38.8C960 47 1056 61 1152 64.8C1248 68.7 1344 62.3 1392 59.2L1440 56V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V40Z",
                  "M0 50L48 45.7C96 41.3 192 32.7 288 30.3C384 28 480 32 576 39.2C672 46.3 768 56.7 864 58.8C960 61 1056 55 1152 51.8C1248 48.7 1344 48.3 1392 48.2L1440 48V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z",
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34D399" />
                <stop offset="1" stopColor="#34D399" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 max-w-4xl mx-auto">
        {/* 404 Display */}
        <motion.div
          className="relative mb-12 text-center"
          animate={{ 
            x: isGlitching ? [0, -10, 5, -5, 0] : 0,
            y: isGlitching ? [0, 5, -5, 3, 0] : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="relative inline-block"
            animate={{
              rotateX: [0, 10, 0, -10, 0],
              rotateY: [0, -15, 0, 15, 0],
              scale: [1, 1.05, 1, 0.95, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.h1
              className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter relative text-center mx-auto"
              style={{ fontFamily: "monospace" }}
              animate={{ 
                textShadow: isGlitching 
                  ? [
                      "0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.4), 0 0 30px rgba(52, 211, 153, 0.2)",
                      "5px 0 10px rgba(59, 130, 246, 0.8), -5px 0 20px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)",
                      "0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.4), 0 0 30px rgba(52, 211, 153, 0.2)",
                    ]
                  : "0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.4), 0 0 30px rgba(52, 211, 153, 0.2)"
              }}
              transition={{ duration: 0.2 }}
            >
              <span className={`absolute inset-0 ${isGlitching ? "text-blue-500" : "text-green-300"}`} style={{ 
                clipPath: isGlitching ? "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)" : "none",
                transform: isGlitching ? "translate(-5px, 0)" : "none",
                WebkitTextStroke: "2px rgba(0,0,0,0.3)",
                filter: "drop-shadow(0 0 15px rgba(52, 211, 153, 0.8))",
              }}>404</span>
              <span className={`absolute inset-0 ${isGlitching ? "text-purple-500" : "text-green-300"}`} style={{ 
                clipPath: isGlitching ? "polygon(0 60%, 100% 60%, 100% 85%, 0 85%)" : "none",
                transform: isGlitching ? "translate(5px, 0)" : "none",
                WebkitTextStroke: "2px rgba(0,0,0,0.3)",
                filter: "drop-shadow(0 0 15px rgba(52, 211, 153, 0.8))",
              }}>404</span>
              <span className="relative text-green-300" style={{
                WebkitTextStroke: "2px rgba(0,0,0,0.3)",
                filter: "drop-shadow(0 0 15px rgba(52, 211, 153, 0.8))",
                background: "linear-gradient(to bottom, rgba(52, 211, 153, 1), rgba(16, 185, 129, 1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>404</span>
            </motion.h1>
            
            {/* Holographic effect */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: "linear-gradient(45deg, transparent 25%, rgba(52, 211, 153, 0.3) 25%, rgba(52, 211, 153, 0.3) 50%, transparent 50%, transparent 75%, rgba(52, 211, 153, 0.3) 75%)",
                backgroundSize: "10px 10px",
                mixBlendMode: "overlay",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "10px 10px"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* 3D layers for depth */}
            <div className="absolute inset-0 opacity-20" style={{ transform: "translateZ(-50px)" }}>
              <div className="w-full h-full text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-center text-green-300/30">404</div>
            </div>
            <div className="absolute inset-0 opacity-10" style={{ transform: "translateZ(-100px)" }}>
              <div className="w-full h-full text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-center text-green-300/20">404</div>
            </div>
          </motion.div>

          {/* Glitch lines */}
          <AnimatePresence>
            {isGlitching && (
              <>
                <motion.div 
                  className="absolute top-1/4 left-0 right-0 h-1 bg-blue-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div 
                  className="absolute top-2/3 left-0 right-0 h-2 bg-green-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                />
              </>
            )}
          </AnimatePresence>
          
          {/* Decorative circles */}
          <div className="absolute -z-10 inset-0 flex items-center justify-center">
            <motion.div
              className="absolute w-[120%] h-[120%] rounded-full border-2 border-dashed border-green-300/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[140%] h-[140%] rounded-full border border-green-300/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[160%] h-[160%] rounded-full border border-green-300/5"
              animate={{ rotate: 180 }}
              transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Decorative tech elements */}
          <div className="absolute -z-10 inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`corner-decoration-${i}`}
                className="absolute w-16 h-16 border-2 border-green-300/30"
                style={{
                  top: i < 2 ? "-8px" : "auto",
                  bottom: i >= 2 ? "-8px" : "auto",
                  left: i % 2 === 0 ? "-8px" : "auto",
                  right: i % 2 === 1 ? "-8px" : "auto",
                  borderTop: i >= 2 ? "none" : undefined,
                  borderBottom: i < 2 ? "none" : undefined,
                  borderLeft: i % 2 === 1 ? "none" : undefined,
                  borderRight: i % 2 === 0 ? "none" : undefined,
                  borderTopLeftRadius: i === 0 ? "8px" : "0",
                  borderTopRightRadius: i === 1 ? "8px" : "0",
                  borderBottomLeftRadius: i === 2 ? "8px" : "0",
                  borderBottomRightRadius: i === 3 ? "8px" : "0",
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  boxShadow: [
                    "0 0 5px 0 rgba(52, 211, 153, 0.3)",
                    "0 0 10px 2px rgba(52, 211, 153, 0.5)",
                    "0 0 5px 0 rgba(52, 211, 153, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Error message with scramble effect */}
        <div className="mb-12 relative">
          <motion.div
            ref={errorTextRef}
            className="text-2xl md:text-4xl font-mono font-bold mb-6"
            animate={{ 
              opacity: isGlitching ? [1, 0.5, 1] : 1,
              x: isGlitching ? [0, 3, -3, 0] : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{
              background: "linear-gradient(to right, #34D399, #10B981, #059669, #10B981, #34D399)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(52, 211, 153, 0.4)",
            }}
            whileInView={{
              backgroundPosition: ["0% center", "200% center"],
            }}
            viewport={{ once: false }}
          >
            <motion.span
              animate={{
                filter: [
                  "blur(0px)",
                  "blur(0.5px)",
                  "blur(0px)",
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {isGlitching ? scrambleText("ERROR: PAGE_NOT_FOUND") : "ERROR: PAGE_NOT_FOUND"}
            </motion.span>
          </motion.div>
          
          <motion.p 
            className="text-zinc-300 max-w-lg mx-auto text-lg backdrop-blur-sm py-3 px-6 rounded-lg bg-black/20 border border-green-500/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{
              boxShadow: "0 0 20px rgba(52, 211, 153, 0.2)",
              borderColor: "rgba(52, 211, 153, 0.3)",
              scale: 1.02,
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
The page you're looking for is either chilling in the void, got kidnapped, renamed itself to escape you, or just rage quit existence.            </motion.span>
          </motion.p>
          
          {/* Decorative tech elements */}
          <div className="absolute -z-10 left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 opacity-20 pointer-events-none">
            <motion.div
              className="w-20 h-20 rounded-full border border-green-300/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-20 h-20 rounded-full border border-green-300/30"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2],
                rotate: -360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Interactive elements */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">

          <motion.button
            className="group relative px-8 py-4 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
          >
            {/* Button background with animated gradient */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900"
              animate={{
                backgroundPosition: ["0% center", "100% center"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
            
            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-sm border border-white/10" />
            
            {/* Shine effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ 
                x: "200%", 
                opacity: 1,
                transition: { duration: 1.2, ease: "easeInOut" }
              }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: "0 0 20px 5px rgba(82, 82, 91, 0.5)",
              }}
            />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center font-medium text-white">
              <motion.div
                className="mr-2 bg-green-300 text-zinc-800 rounded-full p-1 flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <RiRefreshLine size={20} />
              </motion.div>
              <span className="font-bold tracking-wide">Go Back</span>
            </span>
          </motion.button>
        </div>
        
        {/* Decorative error icon */}
        <motion.div
          className="absolute bottom-10 right-10 opacity-10 pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <RiErrorWarningLine size={200} className="text-green-300" />
        </motion.div>
        
        {/* Binary code rain effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const startPos = Math.random() * 100;
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 10;
            const opacity = 0.05 + Math.random() * 0.1;
            
            return (
              <motion.div
                key={`binary-${i}`}
                className="absolute top-0 text-xs font-mono text-green-500/30"
                style={{
                  left: `${startPos}%`,
                  opacity,
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                }}
                initial={{ y: -200 }}
                animate={{ y: "100%" }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                }}
              >
                {[...Array(20)].map((_, j) => (
                  <span key={j}>{Math.round(Math.random())}</span>
                ))}
              </motion.div>
            );
          })}
        </div>
        
        {/* Holographic circuit lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = Math.random() * 100;
            const endY = Math.random() * 100;
            
            return (
              <motion.div
                key={`circuit-line-${i}`}
                className="absolute bg-gradient-to-r from-green-500 to-green-500/0"
                style={{
                  height: "1px",
                  left: `${startX}%`,
                  top: `${startY}%`,
                  width: `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}%`,
                  transform: `rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg)`,
                  transformOrigin: "left center",
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  repeatDelay: Math.random() * 5,
                }}
              />
            );
          })}
        </div>
        
        {/* Floating tech elements */}
        {[...Array(12)].map((_, i) => {
          const size = 10 + Math.random() * 20;
          const isSquare = Math.random() > 0.5;
          
          return (
            <motion.div
              key={`floating-element-${i}`}
              className={`absolute ${isSquare ? 'rounded-md' : 'rounded-full'} border border-green-300/30 pointer-events-none`}
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 30],
                x: [0, (Math.random() - 0.5) * 30],
                rotate: [0, Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1)],
                opacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          );
        })}

        
        {/* Animated scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-10"
          animate={{}}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-300 to-transparent"
            animate={{
              top: ["-2px", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </main>
  );
}