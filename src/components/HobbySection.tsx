"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define hobby interface
interface Hobby {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Memoized constants to avoid recreating on each render
const HOBBY_COLORS = {
  coding: "#60a5fa",
  music: "#a78bfa",
  travel: "#34d399",
  reading: "#fbbf24",
  photography: "#f87171",
  gaming: "#ec4899",
  cooking: "#f97316",
  fitness: "#14b8a6"
};

// Hobby data
const hobbies: Hobby[] = [
  {
    id: "coding",
    name: "coding",
    icon: "💻",
    color: HOBBY_COLORS.coding
  },
  {
    id: "music",
    name: "music",
    icon: "🎵",
    color: HOBBY_COLORS.music
  },
  {
    id: "travel",
    name: "travel",
    icon: "✈️",
    color: HOBBY_COLORS.travel
  },
  {
    id: "reading",
    name: "books",
    icon: "📚",
    color: HOBBY_COLORS.reading
  },
  {
    id: "photography",
    name: "photography",
    icon: "📷",
    color: HOBBY_COLORS.photography
  },
  {
    id: "gaming",
    name: "gaming",
    icon: "🎮",
    color: HOBBY_COLORS.gaming
  },
  {
    id: "cooking",
    name: "cooking",
    icon: "🍳",
    color: HOBBY_COLORS.cooking
  },
  {
    id: "fitness",
    name: "fitness",
    icon: "💪",
    color: HOBBY_COLORS.fitness
  }
];

// Memoized tag component for better performance
const HobbyTag = memo(({ 
  hobby, 
  isHovered, 
  onHoverStart, 
  onHoverEnd,
  index
}: { 
  hobby: Hobby, 
  isHovered: boolean,
  onHoverStart: () => void,
  onHoverEnd: () => void,
  index: number
}) => {
  return (
    <motion.div
      className="relative inline-flex items-center rounded-full px-3 py-1.5 mr-2 mb-3 backdrop-blur-sm group overflow-hidden"
      style={{ 
        backgroundColor: isHovered ? `${hobby.color}15` : 'rgba(39, 39, 42, 0.3)',
        border: `1px solid ${isHovered ? hobby.color : 'rgba(63, 63, 70, 0.3)'}`,
        boxShadow: isHovered ? `0 0 15px ${hobby.color}40` : 'none',
      }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { 
          type: "spring", 
          stiffness: 300,
          damping: 15,
          mass: 0.8
        }
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15,
          delay: index * 0.08
        }
      }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          background: [
            `linear-gradient(120deg, ${hobby.color}00, ${hobby.color}30, ${hobby.color}00)`,
            `linear-gradient(240deg, ${hobby.color}00, ${hobby.color}30, ${hobby.color}00)`,
            `linear-gradient(360deg, ${hobby.color}00, ${hobby.color}30, ${hobby.color}00)`
          ]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "loop"
        }}
      />

      {/* Icon with animation */}
      <motion.span 
        className="mr-2 relative"
        animate={isHovered ? {
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          y: [0, -2, 0]
        } : {}}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut"
        }}
      >
        {/* Icon glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{ 
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ 
              background: `radial-gradient(circle, ${hobby.color}90 0%, ${hobby.color}00 70%)`,
              filter: "blur(6px)"
            }}
          />
        )}
        {hobby.icon}
      </motion.span>

      {/* Text with animation - CHỈ GIỮ LẠI HIỆU ỨNG MỚI */}
      <motion.span 
        className="text-sm font-medium relative overflow-hidden"
        style={{ 
          color: isHovered ? hobby.color : '#e4e4e7',
        }}
      >
        {/* Text glow effect */}
        {isHovered && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textShadow: `0 0 8px ${hobby.color}80`,
            }}
          />
        )}
        
        {/* Text reveal effect */}
        <motion.span
          className="relative inline-block"
          initial={{ y: 0 }}
          animate={isHovered ? {
            y: [-20, 0],
            opacity: [0, 1],
          } : {}}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          {hobby.name.split('').map((char, i) => (
            <motion.span
              key={`${hobby.id}-char-${i}`}
              className="inline-block"
              initial={{ opacity: 1 }}
              animate={isHovered ? {
                y: [10, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
                rotateX: [40, 0],
              } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.03,
                ease: [0.19, 1, 0.22, 1]
              }}
              style={{
                display: 'inline-block',
                transformOrigin: 'bottom',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
        
        {/* Underline effect */}
        <motion.span
          className="absolute bottom-0 left-0 h-[1px] w-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isHovered ? {
            scaleX: 1,
            opacity: 1,
          } : {
            scaleX: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
          }}
          style={{
            background: `linear-gradient(to right, ${hobby.color}00, ${hobby.color}, ${hobby.color}00)`,
            transformOrigin: 'left',
          }}
        />
      </motion.span>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${hobby.color}30, transparent)`,
          transform: "translateX(-100%)"
        }}
        animate={isHovered ? { x: ["100%", "-100%"] } : {}}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      />

      {/* Particle effects */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full z-0 pointer-events-none"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  scale: [0, Math.random() * 0.5 + 0.3, 0],
                  x: [0, (Math.random() - 0.5) * 40],
                  y: [0, (Math.random() - 0.5) * 40],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.8 + Math.random() * 0.5,
                  ease: "easeOut"
                }}
                style={{
                  left: `${50 + (Math.random() - 0.5) * 20}%`,
                  top: `${50 + (Math.random() - 0.5) * 20}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  backgroundColor: hobby.color,
                  boxShadow: `0 0 ${Math.random() * 6 + 2}px ${hobby.color}`
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        style={{ 
          border: `1px solid ${hobby.color}`,
          scale: 1.01
        }}
        animate={isHovered ? { 
          opacity: [0, 0.5, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ 
          duration: 1.8,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.div>
  );
});

HobbyTag.displayName = 'HobbyTag';

// Background gradient component
const BackgroundGradient = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <motion.div
      className="absolute inset-0 opacity-10"
      animate={{
        background: [
          "radial-gradient(circle at 30% 50%, rgba(52, 211, 153, 0.3) 0%, transparent 60%)",
          "radial-gradient(circle at 70% 50%, rgba(52, 211, 153, 0.3) 0%, transparent 60%)",
          "radial-gradient(circle at 30% 50%, rgba(52, 211, 153, 0.3) 0%, transparent 60%)"
        ]
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ filter: "blur(50px)" }}
    />
  </div>
));

BackgroundGradient.displayName = 'BackgroundGradient';

export default function HobbySection() {
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null);

  // Memoize event handlers
  const handleHoverStart = useCallback((id: string) => {
    setHoveredHobby(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredHobby(null);
  }, []);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  }), []);

  // Memoize title animation
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
      className="mb-16 text-white relative will-change-transform"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackgroundGradient />
      
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white bg-[length:200%_100%] animate-shimmer">hobbies</span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 will-change-transform"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ boxShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}
          />
        </span>
      </motion.h1>
      
      <motion.div 
        className="mt-8 flex flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {hobbies.map((hobby, index) => (
          <HobbyTag 
            key={hobby.id}
            hobby={hobby}
            isHovered={hoveredHobby === hobby.id}
            onHoverStart={() => handleHoverStart(hobby.id)}
            onHoverEnd={handleHoverEnd}
            index={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}