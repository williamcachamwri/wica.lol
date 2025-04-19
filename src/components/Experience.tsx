"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";

const experience = [
  {
    title: "professional student",
    position: "full-time sufferer",
    date: "(2022 - present)",
    description:
      "grinding through high school while daydreaming about side projects and escaping homework",
    link: "",
    color: "#f87171",
  },

  {
    title: "freelance procrastinator",
    position: "self-employed",
    date: "(birth - present)",
    description:
      "specialized in putting off assignments to build random websites and break stuff for fun",
    link: "",
    color: "#fcd34d",
  }
];

export default function Experience() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleHoverStart = useCallback((title: string) => {
    setHoveredItem(title);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  }), []);

  const timelineVariants = useMemo(() => ({
    hidden: { height: 0 },
    visible: { height: "100%", transition: { duration: 0.8 } }
  }), []);

  const titleAnimation = useMemo(() => ({
    rotate: [0, 5, 0, -5, 0],
    color: ['#86efac', '#4ade80', '#86efac'],
    textShadow: ['0 0 0px rgba(134, 239, 172, 0)', '0 0 10px rgba(134, 239, 172, 0.5)', '0 0 0px rgba(134, 239, 172, 0)']
  }), []);

  const titleTransition = useMemo(() => ({ 
    duration: 2, 
    repeat: Infinity, 
    repeatDelay: 5, 
    times: [0, 0.2, 0.5, 0.8, 1],
    repeatType: 'loop' as const
  }), []);

  return (
    <motion.div 
      className="text-white mb-16 relative will-change-transform"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-2xl font-bold text-white relative inline-block"
        variants={titleVariants}
        whileHover={{ scale: 1.03 }}
      >
        <motion.span
          className="text-green-300 inline-block will-change-transform"
          animate={titleAnimation}
          transition={titleTransition}
        >
          &gt;
        </motion.span>{" "}
        <span className="relative group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white bg-[length:200%_100%] animate-shimmer">experience</span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 will-change-transform"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ boxShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}
          />
        </span>
      </motion.h1>

      <div className="mt-10 relative">

        <motion.div 
          className="absolute left-[6px] top-0 bottom-0 w-[1px] h-full bg-zinc-800 will-change-transform"
          variants={timelineVariants}
        />

        {experience.map((exp, index) => {
          const isHovered = hoveredItem === exp.title;

          const itemVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.5, delay: 0.3 + (index * 0.2) } 
            }
          };

          const charElements = useMemo(() => 
            exp.description.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: isHovered ? 
                    [1, char === ' ' ? 1 : 0.7, 1] : 1,
                  y: isHovered ? 
                    [0, char === ' ' ? 0 : -1, 0] : 0,
                  color: isHovered && char !== ' ' ? 
                    ["#9ca3af", exp.color, "#d1d5db"] : undefined
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: isHovered ? charIndex * 0.005 : 0,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 10,
                  repeatType: 'loop'
                }}
                style={{ 
                  display: 'inline-block',
                  willChange: isHovered ? 'transform, opacity, color' : 'auto'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )),
          [exp.description, exp.color, isHovered]);

          const particleEffects = useMemo(() => {
            if (!isHovered) return null;

            return [...Array(6)].map((_, i) => {
              const leftOffset = 50 + (Math.random() - 0.5) * 20;
              const topOffset = 50 + (Math.random() - 0.5) * 20;
              const xMovement = (Math.random() - 0.5) * 100;
              const yMovement = (Math.random() - 0.5) * 60;
              const width = Math.random() * 4 + 2;
              const height = Math.random() * 4 + 2;
              const duration = 1 + Math.random() * 0.5;
              const delay = Math.random() * 0.5;

              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full z-0 pointer-events-none will-change-transform"
                  initial={{ 
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                    x: [0, xMovement],
                    y: [0, yMovement],
                  }}
                  transition={{ 
                    duration,
                    repeat: Infinity,
                    delay,
                    repeatType: 'loop'
                  }}
                  style={{
                    left: `${leftOffset}%`,
                    top: `${topOffset}%`,
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: exp.color,
                    filter: 'blur(1px)'
                  }}
                />
              );
            });
          }, [isHovered, exp.color]);

          return (
            <motion.div 
              key={exp.title} 
              className="mt-10 group relative pl-10"
              variants={itemVariants}
              onHoverStart={() => handleHoverStart(exp.title)}
              onHoverEnd={handleHoverEnd}
            >

              <motion.div 
                className="absolute -inset-6 rounded-xl -z-10 backdrop-blur-sm will-change-transform"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isHovered ? 0.1 : 0,
                  backgroundColor: exp.color,
                  boxShadow: isHovered ? `0 0 30px ${exp.color}30` : "none"
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div 
                className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border border-zinc-700 bg-[#121212] will-change-transform`}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  backgroundColor: isHovered ? exp.color : '#121212',
                  borderColor: isHovered ? exp.color : 'rgb(63, 63, 70)',
                  boxShadow: isHovered ? `0 0 10px ${exp.color}` : 'none'
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  delay: 0.6 + (index * 0.2) 
                }}
              />

              {isHovered && (
                <motion.div
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full pointer-events-none will-change-transform"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop'
                  }}
                  style={{ backgroundColor: exp.color }}
                />
              )}

              <div className="overflow-hidden">
                <motion.a
                  href={exp.link}
                  className="text-xl font-bold inline-block relative"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  style={{ 
                    color: isHovered ? exp.color : undefined,
                    willChange: 'transform, color'
                  }}
                >
                  {exp.title}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[2px] will-change-transform"
                    style={{ backgroundColor: exp.color }}
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>

              <motion.p 
                className="text-gray-500 text-xs mt-2 flex items-center"
                animate={{ 
                  color: isHovered ? exp.color : "#6b7280",
                  x: isHovered ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ willChange: isHovered ? 'transform, color' : 'auto' }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (index * 0.2) }}
                >
                  {exp.position}
                </motion.span>
                <motion.span 
                  className="mx-2 opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.8 + (index * 0.2) }}
                >
                  |
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + (index * 0.2) }}
                >
                  {exp.date}
                </motion.span>
              </motion.p>

              <motion.p 
                className="text-gray-400 mt-5 text-sm relative"
                animate={{ 
                  color: isHovered ? "#d1d5db" : "#9ca3af",
                  x: isHovered ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ willChange: isHovered ? 'transform, color' : 'auto' }}
              >
                {charElements}
              </motion.p>

              <motion.div
                className="mt-4 overflow-hidden will-change-transform"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isHovered ? 'auto' : 0,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.a 
                  href={exp.link}
                  className="inline-flex items-center text-sm"
                  style={{ color: exp.color }}
                  whileHover={{ x: 5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View more
                  <motion.svg 
                    className="ml-2 w-4 h-4 will-change-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{
                      x: isHovered ? [0, 4, 0] : 0,
                    }}
                    transition={{
                      x: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </motion.a>
              </motion.div>

              {particleEffects}
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="absolute -left-20 top-1/2 w-40 h-40 rounded-full bg-green-300/5 blur-3xl pointer-events-none will-change-transform"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
    </motion.div>
  );
}