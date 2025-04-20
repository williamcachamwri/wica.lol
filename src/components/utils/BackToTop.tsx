"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RiArrowUpLine } from "@remixicon/react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Tối ưu scroll handler với throttling
  const checkScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 300);
  }, []);

  useEffect(() => {
    // Throttle scroll event để tăng hiệu suất
    let timeoutId: NodeJS.Timeout | null = null;
    
    const throttledScrollHandler = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          checkScrollPosition();
          timeoutId = null;
        }, 100); // 100ms throttle
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [checkScrollPosition]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-24 right-6 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 shadow-lg overflow-hidden"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            mass: 0.8
          }}
          aria-label="Back to top"
        >
          {/* Background glow */}
          {!prefersReducedMotion && (
            <motion.div 
              className="absolute inset-0 -z-10"
              animate={{ 
                boxShadow: isHovered 
                  ? "0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.2)" 
                  : "0 0 0 rgba(0, 0, 0, 0)"
              }}
              transition={{ duration: 0.2 }}
            />
          )}
          
          {/* Icon */}
          <motion.div
            animate={{ 
              y: isHovered && !prefersReducedMotion ? [0, -3, 0] : 0 
            }}
            transition={{ 
              duration: 1, 
              repeat: isHovered && !prefersReducedMotion ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            <RiArrowUpLine size={20} className="text-green-400" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}