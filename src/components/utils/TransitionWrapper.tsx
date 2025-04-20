"use client";

import React, { type ReactNode, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import "~/styles/transition.css";

interface TransitionWrapperProps {
  children: ReactNode;
}

export default function TransitionWrapper({
  children,
}: TransitionWrapperProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [direction, setDirection] = useState("forward");
  
  useEffect(() => {
    // Xác định hướng chuyển trang dựa trên pathname
    if (previousPathname.current !== pathname) {
      if (previousPathname.current === "/blog" && pathname.includes("/blog/")) {
        setDirection("forward");
      } else if (previousPathname.current.includes("/blog/") && pathname === "/blog") {
        setDirection("backward");
      } else {
        setDirection(pathname.length > previousPathname.current.length ? "forward" : "backward");
      }
      previousPathname.current = pathname;
    }

    if (isInitialLoad) {
      setTimeout(() => setIsInitialLoad(false), 100);
    }

    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => setIsTransitioning(false), 600);
    };

    window.addEventListener("pageTransitionStart", handleRouteChangeStart);
    window.addEventListener("pageTransitionComplete", handleRouteChangeComplete);

    return () => {
      window.removeEventListener("pageTransitionStart", handleRouteChangeStart);
      window.removeEventListener("pageTransitionComplete", handleRouteChangeComplete);
    };
  }, [isInitialLoad, pathname]);

  // Các biến thể animation cho các hiệu ứng chuyển trang - đơn giản hóa
  const pageVariants = {
    initial: (direction: string) => ({
      opacity: 0,
      y: direction === "forward" ? 10 : -10,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: (direction: string) => ({
      opacity: 0,
      y: direction === "forward" ? -10 : 10,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    }),
  };

  return (
    <div className="transition-container relative w-full h-full">
      {/* Hiệu ứng overlay tối giản */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hiệu ứng mờ tối giản */}
            <motion.div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Hiệu ứng loading tối giản */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div
                className="w-12 h-[2px] bg-green-400 rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <motion.div
                  className="h-full w-full bg-white/50"
                  animate={{ 
                    x: ["-100%", "100%"],
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nội dung trang */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className={`transition-content ${isInitialLoad ? "initial-load" : ""}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          custom={direction}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Hiệu ứng viền sáng tối giản */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed inset-x-0 top-0 z-50 pointer-events-none h-[1px]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: 1, 
              opacity: 1,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            exit={{ 
              scaleX: 0, 
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" }
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}