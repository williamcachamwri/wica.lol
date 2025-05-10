"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Tối ưu loading progress - giảm thời gian chờ xuống 2.5s thay vì 4.5s
  useEffect(() => {
    // Tăng tốc độ tăng progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 - prev) * 0.1; // Tăng tốc độ từ 0.05 lên 0.1
        const newProgress = prev + increment;
        return newProgress > 99 ? 99 : newProgress;
      });
    }, 50); // Giảm interval từ 100ms xuống 50ms

    // Giảm thời gian loading
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
      setTimeout(() => {
        setShowStartButton(true);
      }, 500); // Giảm từ 800ms xuống 500ms
    }, 2500); // Giảm từ 4500ms xuống 2500ms

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Lazy load audio để tránh ảnh hưởng đến thời gian tải trang
  useEffect(() => {
    if (!loading && !audioRef.current) {
      const audio = new Audio('/music.mp3');
      audio.volume = 0.7;
      audio.loop = true;
      audio.preload = "none"; // Chỉ tải khi cần thiết
      
      audio.addEventListener('play', () => setIsMusicPlaying(true));
      audio.addEventListener('pause', () => setIsMusicPlaying(false));
      
      audioRef.current = audio;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', () => setIsMusicPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsMusicPlaying(false));
      }
    };
  }, [loading]);

  const handleStart = () => {
    setShowParticles(true);
    
    // Chỉ phát nhạc khi audio đã được tải
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
    }
    
    // Giảm thời gian chuyển đổi
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setShowParticles(false);
      }, 2000); // Giảm từ 3000ms xuống 2000ms
    }, 1000); // Giảm từ 2000ms xuống 1000ms
  };

  // Sử dụng useMemo để tránh tạo lại mảng particles mỗi khi render
  const particles = useMemo(() => Array.from({ length: 100 }, (_, i) => i), []); // Giảm từ 150 xuống 100

  // Tối ưu hiệu suất bằng cách chỉ render các phần tử cần thiết
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Giảm từ 0.8s xuống 0.5s
          >
            {/* Nâng cấp text Loading... với hiệu ứng chữ hiện đại */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }} // Giảm từ 0.5s xuống 0.3s
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
                      duration: 0.3, // Giảm từ 0.4s xuống 0.3s
                      delay: 0.03 * index, // Giảm từ 0.05s xuống 0.03s
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
                transition={{ duration: 0.5, delay: 0.4 }} // Giảm từ 0.8s/0.6s xuống 0.5s/0.4s
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
                  transition={{ duration: 0.2 }} // Giảm từ 0.3s xuống 0.2s
                />
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)",
                    transform: `translateX(${-100 + progress}%)` 
                  }}
                  transition={{ duration: 0.2 }} // Giảm từ 0.3s xuống 0.2s
                />
                
                {/* Animated particles inside progress bar - giảm số lượng particles */}
                {progress > 10 && Array.from({ length: 5 }).map((_, i) => ( // Giảm từ 10 xuống 5
                  <motion.div
                    key={`progress-particle-${i}`}
                    className="absolute top-1/2 w-1 h-1 rounded-full bg-green-300/80"
                    style={{ 
                      left: `${(progress - 5) * Math.random()}%`,
                      transform: "translateY(-50%)",
                      opacity: 0.5 + Math.random() * 0.5
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
                transition={{ delay: 0.3 }} // Giảm từ 0.5s xuống 0.3s
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Giảm từ 0.8s xuống 0.5s
          >
            {/* Nâng cấp text Welcome với hiệu ứng chữ hiện đại */}
            <motion.div
              className="mb-16 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }} // Giảm từ 0.5s xuống 0.3s
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
                      duration: 0.6, // Giảm từ 0.8s xuống 0.6s
                      delay: 0.08 * index, // Giảm từ 0.1s xuống 0.08s
                      type: "spring",
                      stiffness: 120 // Tăng từ 100 lên 120 để animation nhanh hơn
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
                        delay: 0.08 * index + 0.2, // Giảm từ 0.1s + 0.3s xuống 0.08s + 0.2s
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Floating particles around each letter - giảm số lượng particles */}
                    {Array.from({ length: 2 }).map((_, i) => ( // Giảm từ 3 xuống 2
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
                          delay: 0.08 * index + i * 0.2 // Giảm từ 0.1s xuống 0.08s
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
                  duration: 0.8, // Giảm từ 1.2s xuống 0.8s
                  delay: 0.5, // Giảm từ 0.8s xuống 0.5s
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
                    duration: 0.3, // Giảm từ 0.4s xuống 0.3s
                    type: "spring",
                    stiffness: 350, // Tăng từ 300 lên 350
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
                  
                  {/* Animated particles inside button - giảm số lượng particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {Array.from({ length: 10 }).map((_, i) => ( // Giảm từ 20 xuống 10
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
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiệu ứng particles khi chuyển đổi - chỉ render khi cần thiết */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {particles.map((i) => (
            <motion.div
              key={`transition-particle-${i}`}
              className="absolute rounded-full bg-green-300"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: 0,
                delay: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Nội dung chính */}
      <div className={showContent ? "block" : "hidden"}>
        {children}
      </div>
    </>
  );
}