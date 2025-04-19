"use client";

import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

export default function About() {
  const [hoveredParagraph, setHoveredParagraph] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const paragraphs = useMemo(() => [
    "17 y/o cs undergrad who learns best by breaking things and duct-taping them back together. Mostly code, sometimes hardware, usually chaos",
    "i like turning dumb ideas into real things just to see how much i can mess with them. curious by default, quietly dangerous when it matters",
    "into retro tech, low-level systems, and tinkering. also mess around with media production and cameras because why not"
  ], []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      requestAnimationFrame(() => {
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      });
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    let rafId: number;
    let lastExecTime = 0;
    const THROTTLE_INTERVAL = 10; 

    const throttledMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastExecTime >= THROTTLE_INTERVAL) {
        lastExecTime = now;
        handleMouseMove(e);
      } else {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => handleMouseMove(e));
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  const gradientX = useTransform(mouseX, (val) => val / 2);
  const gradientY = useTransform(mouseY, (val) => val / 2);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredParagraph(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredParagraph(null);
  }, []);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }), []);

  const titleParticles = useMemo(() => 
    [...Array(10)].map((_, i) => {
      const randomX = (Math.random() - 0.5) * 50;
      const randomY = (Math.random() - 0.5) * 50;
      const duration = 0.8 + Math.random() * 0.5;
      const delay = Math.random() * 0.2;
      const width = Math.random() * 4 + 2;
      const height = Math.random() * 4 + 2;

      return { randomX, randomY, duration, delay, width, height, key: `title-particle-${i}` };
    }), 
  []);

  const codeParticles = useMemo(() => 
    [...Array(8)].map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const opacity = 0.1 + Math.random() * 0.1;
      const duration = 5 + Math.random() * 5;
      const delay = Math.random() * 10;
      const rotate = Math.random() > 0.5 ? [0, 10] : [0, -10];
      const symbol = ["</>", "{}", "[]", "//", "&&", "=>", "||", "=="][i % 8];

      return { left, top, opacity, duration, delay, rotate, symbol, key: `code-particle-${i}` };
    }),
  []);

  return (
    <motion.section 
      ref={sectionRef}
      className="mb-16 space-y-6 relative overflow-hidden p-4 rounded-xl will-change-transform"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >

      <motion.div
        variants={titleVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <motion.h2 
          className="text-3xl font-bold mb-2 relative inline-block"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.span 
            className="text-green-300 inline-block will-change-transform"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              color: ['#86efac', '#4ade80', '#86efac'],
              textShadow: ['0 0 0px rgba(134, 239, 172, 0)', '0 0 10px rgba(134, 239, 172, 0.5)', '0 0 0px rgba(134, 239, 172, 0)']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 5,
              times: [0, 0.2, 0.5, 0.8, 1],
              repeatType: 'loop'
            }}
          >
            &gt;
          </motion.span>{" "}
          <span className="relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white bg-[length:200%_100%] animate-shimmer">about</span>

            <motion.span 
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 will-change-transform"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ boxShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}
            />

            <motion.div
              className="absolute inset-0 -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <AnimatePresence>
                {titleParticles.map((particle) => (
                  <motion.div
                    key={particle.key}
                    className="absolute rounded-full bg-green-300"
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    whileHover={{ 
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      x: [0, particle.randomX],
                      y: [0, particle.randomY],
                    }}
                    transition={{ 
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                      repeatType: 'loop'
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${particle.width}px`,
                      height: `${particle.height}px`,
                      filter: 'blur(1px)',
                      willChange: 'transform, opacity'
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </span>
        </motion.h2>

        <motion.div 
          className="text-gray-500 italic text-xs mb-4 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ 
            color: "#86efac",
            textShadow: "0 0 8px rgba(134, 239, 172, 0.3)"
          }}
        >
          <motion.span
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-block"
          >

            <motion.span
              animate={{ 
                scale: [1, 1.1, 1],
                color: ['#6b7280', '#86efac', '#6b7280']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: 0.5,
                repeatType: 'loop'
              }}
              className="inline-block will-change-transform"
            >
              [
            </motion.span>
            {" break → understand → build "}
            <motion.span
              animate={{ 
                scale: [1, 1.1, 1],
                color: ['#6b7280', '#86efac', '#6b7280']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: 0.5,
                repeatType: 'loop'
              }}
              className="inline-block will-change-transform"
            >
              ]
            </motion.span>
          </motion.span>

          <motion.span 
            className="absolute bottom-0 left-0 h-[1px] w-full will-change-transform"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(134, 239, 172, 0.5), transparent)',
              filter: 'blur(0.5px)'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </motion.div>
      </motion.div>

      <div className="space-y-5 text-sm">
        {paragraphs.map((paragraph, index) => {

          const charElements = useMemo(() => 
            paragraph.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: hoveredParagraph === index ? 
                    [1, char === ' ' ? 1 : 0.7, 1] : 1,
                  y: hoveredParagraph === index ? 
                    [0, char === ' ' ? 0 : -3, 0] : 0,
                  scale: hoveredParagraph === index && char !== ' ' ? 
                    [1, 1.1, 1] : 1,
                  color: hoveredParagraph === index && char !== ' ' ? 
                    ["#d1d5db", "#86efac", "#d1d5db"] : undefined,
                  textShadow: hoveredParagraph === index && char !== ' ' ?
                    ["0 0 0px rgba(134, 239, 172, 0)", "0 0 8px rgba(134, 239, 172, 0.5)", "0 0 0px rgba(134, 239, 172, 0)"] : undefined
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: hoveredParagraph === index ? charIndex * 0.008 : 0,
                  repeat: hoveredParagraph === index ? Infinity : 0,
                  repeatDelay: 8,
                  repeatType: 'loop'
                }}
                style={{ 
                  display: 'inline-block',
                  willChange: hoveredParagraph === index ? 'transform, opacity, color' : 'auto'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )),
          [paragraph, index, hoveredParagraph]);

          const particleEffects = useMemo(() => {
            if (hoveredParagraph !== index) return null;

            const particles = [...Array(15)].map((_, i) => {
              const leftOffset = 50 + (Math.random() - 0.5) * 20;
              const topOffset = 50 + (Math.random() - 0.5) * 20;
              const xMovement = (Math.random() - 0.5) * 150;
              const yMovement = (Math.random() - 0.5) * 80;
              const width = Math.random() * 5 + 2;
              const height = Math.random() * 5 + 2;
              const opacity = 0.3 + Math.random() * 0.5;
              const duration = 1.5 + Math.random() * 1;
              const delay = Math.random() * 0.8;

              return {
                key: `particle-${i}`,
                leftOffset,
                topOffset,
                xMovement,
                yMovement,
                width,
                height,
                opacity,
                duration,
                delay
              };
            });

            return (
              <>
                {particles.map((p) => (
                  <motion.div
                    key={p.key}
                    className="absolute rounded-full z-0 pointer-events-none"
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      x: [0, p.xMovement],
                      y: [0, p.yMovement],
                    }}
                    transition={{ 
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeOut",
                      repeatType: 'loop'
                    }}
                    style={{
                      left: `${p.leftOffset}%`,
                      top: `${p.topOffset}%`,
                      width: `${p.width}px`,
                      height: `${p.height}px`,
                      background: `rgba(134, 239, 172, ${p.opacity})`,
                      boxShadow: '0 0 8px rgba(134, 239, 172, 0.5)',
                      filter: 'blur(1px)',
                      willChange: 'transform, opacity'
                    }}
                  />
                ))}
              </>
            );
          }, [hoveredParagraph, index]);

          return (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
              onHoverStart={() => handleHoverStart(index)}
              onHoverEnd={handleHoverEnd}
            >
              <motion.div 
                className="text-gray-300 leading-relaxed tracking-wide relative z-10 p-4 rounded-lg"
                whileHover={{ 
                  color: "#ffffff",
                  textShadow: "0 0 1px rgba(255, 255, 255, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >

                <motion.div 
                  className="absolute inset-0 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredParagraph === index ? 0.15 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    background: hoveredParagraph === index ? 
                      `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(134, 239, 172, 0.3), transparent 70%)` : 
                      'none',
                    boxShadow: hoveredParagraph === index ? 
                      "0 0 30px rgba(134, 239, 172, 0.1), inset 0 0 20px rgba(134, 239, 172, 0.05)" : 
                      "none",
                    backdropFilter: hoveredParagraph === index ? "blur(5px)" : "none",
                    willChange: hoveredParagraph === index ? 'opacity, background, box-shadow' : 'auto'
                  }}
                />

                {hoveredParagraph === index && (
                  <motion.div 
                    className="absolute inset-0 rounded-lg -z-10 border border-green-300/20 will-change-background"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      background: [
                        'linear-gradient(90deg, rgba(134, 239, 172, 0) 0%, rgba(134, 239, 172, 0.1) 50%, rgba(134, 239, 172, 0) 100%)',
                        'linear-gradient(180deg, rgba(134, 239, 172, 0) 0%, rgba(134, 239, 172, 0.1) 50%, rgba(134, 239, 172, 0) 100%)',
                        'linear-gradient(270deg, rgba(134, 239, 172, 0) 0%, rgba(134, 239, 172, 0.1) 50%, rgba(134, 239, 172, 0) 100%)',
                        'linear-gradient(0deg, rgba(134, 239, 172, 0) 0%, rgba(134, 239, 172, 0.1) 50%, rgba(134, 239, 172, 0) 100%)',
                      ],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: 'loop'
                    }}
                  />
                )}

                {charElements}

                {particleEffects}

                <motion.div 
                  className="absolute bottom-0 left-0 h-[1px] will-change-transform"
                  style={{
                    background: 'linear-gradient(90deg, rgba(134, 239, 172, 0), rgba(134, 239, 172, 0.8), rgba(134, 239, 172, 0))',
                    boxShadow: '0 0 10px rgba(134, 239, 172, 0.3)'
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ 
                    width: hoveredParagraph === index ? "100%" : "0%",
                    opacity: hoveredParagraph === index ? 1 : 0,
                    left: hoveredParagraph === index ? ["0%", "0%"] : "0%"
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full overflow-hidden will-change-transform"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredParagraph === index ? "100%" : "0%",
                  opacity: hoveredParagraph === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, #86efac, #4ade80)' }}
                  animate={{
                    y: hoveredParagraph === index ? ["0%", "100%", "0%"] : "0%"
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: 'loop'
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="absolute -right-20 top-1/2 w-60 h-60 rounded-full -z-10 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(134, 239, 172, 0.1), transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -10, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatType: 'loop'
        }}
      />

      <motion.div 
        className="absolute -left-20 bottom-0 w-40 h-40 rounded-full -z-10 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.08), transparent 70%)',
          filter: 'blur(30px)'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 1,
          repeatType: 'loop'
        }}
      />

      {codeParticles.map((particle) => (
        <motion.div
          key={particle.key}
          className="absolute text-green-300/20 pointer-events-none text-xs font-mono will-change-transform"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -50],
            opacity: [0, 0.2, 0],
            rotate: particle.rotate
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
            repeatType: 'loop'
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}

      <div className="absolute inset-0 -z-30 opacity-5">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-green-300/30" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-green-300/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-green-300/30" />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-green-300/30" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-green-300/30" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-green-300/30" />
      </div>
    </motion.section>
  );
}