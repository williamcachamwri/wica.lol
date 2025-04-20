"use client";

import { useRouter } from "next/navigation";
import { motion, useAnimationControls, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function BackButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const controls = useAnimationControls();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-10, 10], [5, -5]);
  const rotateY = useTransform(mouseX, [-10, 10], [-5, 5]);

  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: 1.05,
        transition: { duration: 0.3 }
      });
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.3 }
      });
    }
  }, [isHovered, controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleBack = () => {
    setIsPressed(true);
    
    // Animate before navigation
    controls.start({
      x: -20,
      opacity: 0,
      transition: { duration: 0.2 }
    }).then(() => {
      router.back();
    });
  };

  return (
    <motion.button
      onClick={handleBack}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative group flex items-center space-x-2 px-5 py-2.5 rounded-full overflow-hidden"
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      animate={controls}
      initial={{ opacity: 0, x: -20 }}
      whileTap={{ scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Cosmic background glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-md -z-10"
        animate={{ 
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
          scale: isHovered ? [1, 1.05, 1] : 1,
          background: isHovered 
            ? [
                "radial-gradient(circle at 30% 50%, rgba(134, 239, 172, 0.3), transparent 70%)",
                "radial-gradient(circle at 70% 50%, rgba(134, 239, 172, 0.3), transparent 70%)",
                "radial-gradient(circle at 30% 50%, rgba(134, 239, 172, 0.3), transparent 70%)"
              ]
            : "transparent"
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 rounded-full -z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.2 : 0,
          background: isHovered 
            ? "linear-gradient(90deg, rgba(134, 239, 172, 0.3), rgba(59, 130, 246, 0.2), rgba(134, 239, 172, 0.3))" 
            : "transparent",
          backgroundSize: isHovered ? ["100% 100%", "200% 100%", "100% 100%"] : "100% 100%",
          backgroundPosition: isHovered ? ["0% 0%", "100% 0%", "0% 0%"] : "0% 0%"
        }}
        transition={{ 
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      />
      
      {/* Animated border with glow */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-green-300/30 -z-10"
        animate={{ 
          opacity: isHovered ? [0.7, 1, 0.7] : 0.3,
          boxShadow: isHovered 
            ? [
                "0 0 5px rgba(134, 239, 172, 0.3), inset 0 0 5px rgba(134, 239, 172, 0.2)",
                "0 0 15px rgba(134, 239, 172, 0.4), inset 0 0 10px rgba(134, 239, 172, 0.3)",
                "0 0 5px rgba(134, 239, 172, 0.3), inset 0 0 5px rgba(134, 239, 172, 0.2)"
              ] 
            : "none"
        }}
        transition={{ 
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      />
      
      {/* Animated arrow icon with trail effect */}
      <div className="relative">
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-green-300 relative z-10" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ 
            x: isHovered ? [-3, -5, -3] : 0,
            opacity: isHovered ? 1 : 0.8,
            filter: isHovered ? "drop-shadow(0 0 3px rgba(134, 239, 172, 0.7))" : "none"
          }}
          transition={{ 
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </motion.svg>
        
        {/* Arrow trail effect */}
        {isHovered && (
          <>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-green-300/40 absolute top-0 left-0 z-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ x: 0 }}
              animate={{ x: -8, opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </motion.svg>
            
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-green-300/20 absolute top-0 left-0 z-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ x: 0 }}
              animate={{ x: -12, opacity: [0, 0.2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </motion.svg>
          </>
        )}
      </div>
      
      {/* Text with animation and glow effect */}
      <motion.span 
        className="text-sm font-medium relative z-10"
        animate={{ 
          color: isHovered ? "#86efac" : "#86efac99",
          textShadow: isHovered 
            ? [
                "0 0 5px rgba(134, 239, 172, 0.3)",
                "0 0 8px rgba(134, 239, 172, 0.5)",
                "0 0 5px rgba(134, 239, 172, 0.3)"
              ] 
            : "none",
          letterSpacing: isHovered ? "0.05em" : "normal"
        }}
        transition={{ 
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        Back
      </motion.span>
      
      {/* Enhanced particle effects on hover */}
      {isHovered && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              initial={{ 
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: 0.8,
                x: 0,
                y: 0,
                top: "50%",
                left: `${20 + Math.random() * 10}%`,
                backgroundColor: i % 3 === 0 
                  ? "rgba(134, 239, 172, 0.8)" 
                  : i % 3 === 1 
                    ? "rgba(134, 239, 172, 0.6)" 
                    : "rgba(59, 130, 246, 0.6)",
                boxShadow: i % 3 === 0 
                  ? "0 0 2px rgba(134, 239, 172, 0.8)" 
                  : "none"
              }}
              animate={{ 
                opacity: [0.8, 0],
                scale: [1, Math.random() * 2 + 1],
                x: [0, (Math.random() - 0.5) * 50],
                y: [0, (Math.random() - 0.5) * 50],
                rotate: [0, Math.random() * 360]
              }}
              transition={{ 
                duration: Math.random() * 1 + 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
      
      {/* Cosmic light rays */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-green-300/40 to-transparent"
              style={{
                top: `${25 + i * 16}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: [0, 1, 0],
                opacity: [0, 0.5, 0],
                translateX: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
}