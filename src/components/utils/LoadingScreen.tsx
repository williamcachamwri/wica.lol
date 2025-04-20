"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicControl, setShowMusicControl] = useState(false);
  // Thêm state cho hiệu ứng particles
  const [showParticles, setShowParticles] = useState(false);

  // Loading progress handler
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 - prev) * 0.05;
        const newProgress = prev + increment;
        return newProgress > 99 ? 99 : newProgress;
      });
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
      setTimeout(() => {
        setShowStartButton(true);
      }, 800);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.volume = 0.7;
    audioRef.current.loop = true;
    
    // Add event listeners to track audio state
    if (audioRef.current) {
      audioRef.current.addEventListener('play', () => setIsMusicPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsMusicPlaying(false));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', () => setIsMusicPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsMusicPlaying(false));
      }
    };
  }, []);

  const handleStart = () => {
    // Kích hoạt hiệu ứng particles
    setShowParticles(true);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
      setShowMusicControl(true);
    }
    
    // Transition animation
    setTimeout(() => {
      setShowContent(true);
      // Tắt hiệu ứng particles sau khi đã chuyển đến nội dung chính
      setTimeout(() => {
        setShowParticles(false);
      }, 3000);
    }, 2000);
  };


  // Tạo mảng particles với số lượng lớn để hiệu ứng đẹp hơn
  const particles = Array.from({ length: 150 }, (_, i) => i);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Nâng cấp text Loading... với hiệu ứng chữ hiện đại */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-12"
            >
              <motion.div
                className="text-green-300 text-3xl font-bold tracking-wider flex overflow-hidden"
              >
                {Array.from("Loading...").map((char, index) => (
                  <motion.span
                    key={`char-${index}`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 * index,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block relative"
                  >
                    {char}
                    <motion.span
                      className="absolute inset-0 text-green-100/30 blur-[1px]"
                      animate={{
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.1 * index
                      }}
                    >
                      {char}
                    </motion.span>
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent mt-1"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
            
            {/* Nâng cấp progress bar với hiệu ứng siêu mượt */}
            <div className="relative w-72 h-3">
              {/* Glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full blur-md"
                style={{ 
                  background: `linear-gradient(90deg, rgba(52, 211, 153, 0.2) 0%, rgba(52, 211, 153, 0.6) ${progress}%, rgba(52, 211, 153, 0.2) ${progress}%, transparent ${Math.min(progress + 5, 100)}%)` 
                }}
              />
              
              {/* Main progress bar background */}
              <motion.div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm rounded-full overflow-hidden border border-zinc-800">
                {/* Progress indicator */}
                <motion.div
                  className="h-full w-full origin-left"
                  style={{ 
                    background: "linear-gradient(90deg, rgba(52, 211, 153, 0.3) 0%, rgba(52, 211, 153, 0.8) 50%, rgba(52, 211, 153, 0.3) 100%)",
                    transform: `scaleX(${progress / 100})` 
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)",
                    transform: `translateX(${-100 + progress}%)` 
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated particles inside progress bar */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={`progress-particle-${i}`}
                    className="absolute top-1/2 w-1 h-1 rounded-full bg-green-300/80"
                    style={{ 
                      left: `${(progress - 5) * Math.random()}%`,
                      transform: "translateY(-50%)",
                      opacity: progress > 10 ? 0.5 + Math.random() * 0.5 : 0
                    }}
                    animate={{
                      y: ["-50%", `${(Math.random() - 0.5) * 150}%`, "-50%"],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 1 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Progress percentage with glow */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-zinc-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="relative">
                  {Math.round(progress)}%
                  <motion.span 
                    className="absolute inset-0 text-green-300 blur-sm"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && !showContent && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Nâng cấp text Welcome với hiệu ứng chữ hiện đại */}
            <motion.div
              className="mb-16 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center relative">
                {Array.from("Welcome").map((letter, index) => (
                  <motion.div
                    key={`welcome-letter-${index}`}
                    className="relative inline-block"
                    initial={{ 
                      y: -50, 
                      opacity: 0,
                      rotateX: 90,
                      scale: 0.5
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      rotateX: 0,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    {/* Glow effect behind letter */}
                    <motion.div
                      className="absolute inset-0 blur-md rounded-lg -z-10"
                      style={{ 
                        background: `radial-gradient(circle, rgba(52, 211, 153, 0.8) 0%, transparent 70%)`,
                        opacity: 0
                      }}
                      animate={{ 
                        opacity: [0, 0.7, 0.3],
                        scale: [0.8, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: 0.1 * index + 0.3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Floating particles around each letter */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`letter-particle-${index}-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-green-300"
                        style={{
                          top: "50%",
                          left: "50%",
                          opacity: 0
                        }}
                        animate={{ 
                          x: [0, (Math.random() - 0.5) * 30],
                          y: [0, (Math.random() - 0.5) * 30],
                          opacity: [0, 0.8, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: 0.1 * index + i * 0.2
                        }}
                      />
                    ))}
                    
                    {/* The actual letter with gradient */}
                    <span className="text-5xl md:text-6xl font-bold relative inline-block px-1 bg-clip-text text-transparent bg-gradient-to-b from-green-300 to-green-500">
                      {letter}
                      
                      {/* Holographic overlay */}
                      <motion.span
                        className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-transparent mix-blend-overlay"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated underline */}
              <motion.div
                className="h-[2px] mt-2 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </motion.div>
            
            <AnimatePresence>
              {showStartButton && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 50px rgba(52, 211, 153, 0.8)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                  className="relative px-12 py-5 bg-transparent text-green-300 font-bold rounded-full overflow-hidden group"
                  onClick={handleStart}
                >
                  {/* Animated cosmic background */}
                  <motion.div 
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background: "radial-gradient(circle at center, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, rgba(5, 150, 105, 0.1) 100%)",
                    }}
                    animate={{
                      boxShadow: [
                        "inset 0 0 20px rgba(52, 211, 153, 0.3), 0 0 10px rgba(52, 211, 153, 0.3)",
                        "inset 0 0 40px rgba(52, 211, 153, 0.5), 0 0 20px rgba(52, 211, 153, 0.5)",
                        "inset 0 0 20px rgba(52, 211, 153, 0.3), 0 0 10px rgba(52, 211, 153, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Animated particles inside button */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={`btn-particle-${i}`}
                        className="absolute rounded-full bg-green-300"
                        style={{
                          width: `${Math.random() * 3 + 1}px`,
                          height: `${Math.random() * 3 + 1}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          opacity: 0
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0, 1, 0],
                          y: [0, (Math.random() - 0.5) * 20],
                          x: [0, (Math.random() - 0.5) * 20],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Animated border with double layer */}
                  <div className="absolute inset-0 rounded-full border border-green-500/30 -z-10" />
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ 
                      border: "1px solid rgba(52, 211, 153, 0.5)",
                      margin: "3px"
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  
                  {/* Animated orbital rings */}
                  <motion.div
                    className="absolute inset-0 -z-10"
                    style={{
                      borderRadius: "100%",
                      border: "1px dashed rgba(52, 211, 153, 0.3)",
                      margin: "-5px"
                    }}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 -z-10"
                    style={{
                      borderRadius: "100%",
                      border: "1px dashed rgba(52, 211, 153, 0.2)",
                      margin: "-10px"
                    }}
                    animate={{
                      rotate: [360, 0]
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      transform: "translateX(-100%)"
                    }}
                    animate={["initial", "animate"]}
                    variants={{
                      initial: { x: "-100%" },
                      animate: { x: "100%" }
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                  
                  {/* Button text with enhanced effects */}
                  <div className="relative inline-block text-xl tracking-widest font-extrabold">
                    {/* Text shadow layers for 3D effect */}
                    <span className="absolute inset-0 text-green-500/20 blur-[2px] translate-x-[1px] translate-y-[1px]">
                      START
                    </span>
                    <span className="absolute inset-0 text-green-400/30 blur-[1px] translate-x-[0.5px] translate-y-[0.5px]">
                      START
                    </span>
                    
                    {/* Main text with gradient */}
                    <span className="relative bg-gradient-to-b from-green-200 to-green-400 text-transparent bg-clip-text">
                      START
                    </span>
                    
                    {/* Animated glow overlay */}
                    <motion.span 
                      className="absolute inset-0 text-green-200 blur-sm opacity-0 group-hover:opacity-70"
                      animate={{
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      START
                    </motion.span>
                  </div>
                  
                  {/* Hover indicator dots */}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={`dot-${i}`}
                        className="w-1 h-1 rounded-full bg-green-400/50"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiệu ứng particles bắn từ hai bên vào giữa */}
      <AnimatePresence>
        {showParticles && (
          <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {particles.map((i) => {
              // Xác định particle bắn từ bên trái hay bên phải
              const fromLeft = i % 2 === 0;
              // Random vị trí bắt đầu theo chiều dọc
              const startY = Math.random() * 100;
              // Random kích thước particle
              const size = Math.random() * 6 + 2;
              // Random độ trễ để tạo hiệu ứng tự nhiên
              const delay = Math.random() * 0.5;
              // Random tốc độ di chuyển
              const duration = Math.random() * 1.5 + 1;
              // Random màu gradient từ xanh lá
              const hue = 142 + Math.random() * 30;
              const saturation = 80 + Math.random() * 20;
              const lightness = 60 + Math.random() * 20;
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${startY}%`,
                    left: fromLeft ? "-5%" : "105%",
                    background: `radial-gradient(circle, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${hue}, ${saturation - 10}%, ${lightness - 20}%) 70%, transparent 100%)`,
                    boxShadow: `0 0 ${size * 2}px hsl(${hue}, ${saturation}%, ${lightness}%)`,
                    filter: "blur(0.5px)",
                  }}
                  initial={{ 
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.2, 0.8, 0],
                    x: fromLeft 
                      ? [0, window.innerWidth * (0.3 + Math.random() * 0.4)] 
                      : [0, -window.innerWidth * (0.3 + Math.random() * 0.4)],
                    y: [0, (Math.random() - 0.5) * 200],
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: duration,
                    delay: delay,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              );
            })}
            
            {/* Thêm hiệu ứng ánh sáng chính giữa khi particles gặp nhau */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(52, 211, 153, 0.8) 0%, rgba(52, 211, 153, 0.2) 50%, transparent 100%)",
                filter: "blur(30px)",
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ 
                width: ["0px", "300px", "100px"],
                height: ["0px", "300px", "100px"],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 2,
                delay: 1,
                ease: "easeOut"
              }}
            />
            
            {/* Hiệu ứng sóng xung kích */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-300/30"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ 
                width: ["0px", "100vw"],
                height: ["0px", "100vh"],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 2,
                delay: 1.2,
                ease: "easeOut"
              }}
            />
          </div>
        )}
      </AnimatePresence>

      <div className={showContent ? "block" : "hidden"}>
        {children}
      </div>
    </>
  );
}