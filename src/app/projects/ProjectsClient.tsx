"use client";

import { ProjectCards } from "~/components/ProjectCards";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { projectList } from "~/components/Projects";

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from projects
  const categories = ["All", ...Array.from(new Set(
    projectList.flatMap(project => project.technologies)
      .filter(tech => ["React", "Next.js", "TypeScript", "Vue.js", "Node.js"].includes(tech))
  ))];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main 
      ref={mainRef} 
      className="relative min-h-screen text-white p-8 md:p-16 lg:p-24 max-w-4xl mx-auto overflow-hidden"
    >
      {/* Enhanced cosmic background elements */}
      <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1),rgba(0,0,0,0)_50%)] pointer-events-none" />
        
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
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.2), transparent)",
          }}
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 0.3, 0],
            x: ["100%", "0%", "-100%"]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ultra-enhanced animated cosmic particles */}
        {[...Array(30)].map((_, i) => (
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
        
        {/* Bỏ reactive glow effect that follows mouse */}
        
        {/* Cosmic grid lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(52, 211, 153, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(52, 211, 153, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="flex-1 relative z-10">
        {/* Ultra-enhanced header with animated styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.h1 
            className="text-5xl font-bold text-white relative inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.span 
              className="text-green-300 inline-block"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              &gt;
            </motion.span>{" "}
            <span className="relative">
              projects
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 mt-3 max-w-xl"
          >
            A showcase of my creative work, experiments, and technical explorations.
          </motion.p>
        </motion.div>

        {/* Ultra-enhanced animated filter tabs with cosmic effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 flex flex-wrap gap-3 relative"
        >
          {/* Animated background glow for active category */}
          <motion.div 
            className="absolute inset-0 -z-10 rounded-full bg-green-300/5 filter blur-xl"
            animate={{ 
              x: categories.findIndex(cat => cat === activeCategory) * 110,
              opacity: [0.5, 0.8, 0.5],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 200, damping: 30 },
              opacity: { duration: 2, repeat: Infinity },
              scale: { duration: 3, repeat: Infinity },
            }}
          />
          
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {/* Background for button */}
              <motion.div 
                className="absolute inset-0 -z-10 rounded-full"
                animate={{ 
                  backgroundColor: category === activeCategory 
                    ? 'rgba(52, 211, 153, 0.2)' 
                    : 'rgba(39, 39, 42, 0.5)',
                  borderColor: category === activeCategory 
                    ? 'rgba(52, 211, 153, 0.3)' 
                    : 'rgba(82, 82, 91, 0.5)',
                }}
                style={{
                  border: '1px solid',
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Hover effect */}
              {hoveredCategory === category && category !== activeCategory && (
                <motion.div 
                  className="absolute inset-0 -z-10 rounded-full opacity-0 bg-green-300/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Cosmic particles on active button */}
              {category === activeCategory && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`btn-particle-${i}`}
                      className="absolute rounded-full bg-green-300/80 pointer-events-none"
                      style={{
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: "blur(0.5px)",
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, (Math.random() - 0.5) * 20],
                        x: [0, (Math.random() - 0.5) * 20],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random(),
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Text with glow effect for active category */}
              <motion.span
                animate={{ 
                  color: category === activeCategory ? '#86efac' : '#a1a1aa',
                  textShadow: category === activeCategory 
                    ? '0 0 8px rgba(134, 239, 172, 0.5)' 
                    : 'none',
                }}
                transition={{ duration: 0.3 }}
              >
                {category}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        {/* Project cards with enhanced container and filtering */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative"
        >
          {/* Pass the active category to ProjectCards */}
          <ProjectCards activeCategory={activeCategory} />
          
          {/* Bỏ Cosmic light rays */}
        </motion.div>
        
        {/* Ultra-enhanced cosmic footer - Completely redesigned */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-32 relative"
        >
          {/* Cosmic signature - Ultra enhanced */}
          <div className="text-center pt-12 border-t border-zinc-800/30">
            {/* Elegant divider with animated particles */}
            <div className="relative w-full max-w-xs mx-auto mb-8">
              <motion.div 
                className="h-px w-full bg-gradient-to-r from-transparent via-green-300/50 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  width: ["70%", "100%", "70%"]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                style={{ margin: "0 auto" }}
              />
              
              {/* Elegant floating particles */}
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={`line-particle-${i}`}
                  className="absolute top-0 h-[2px] w-[2px] rounded-full bg-green-300"
                  initial={{ left: `${i * 16.6}%`, opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [-1, 1, -1],
                    boxShadow: [
                      "0 0 2px rgba(52, 211, 153, 0.3)",
                      "0 0 4px rgba(52, 211, 153, 0.8)",
                      "0 0 2px rgba(52, 211, 153, 0.3)"
                    ]
                  }}
                  transition={{ 
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
            
            {/* Ultra-enhanced signature with elegant glass effect */}
            <motion.div
              className="inline-block mb-6"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="relative px-8 py-3 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Subtle glass background */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-10"
                  animate={{
                    background: [
                      "linear-gradient(120deg, rgba(52, 211, 153, 0.05) 0%, rgba(52, 211, 153, 0.1) 50%, rgba(52, 211, 153, 0.05) 100%)",
                      "linear-gradient(240deg, rgba(52, 211, 153, 0.05) 0%, rgba(52, 211, 153, 0.1) 50%, rgba(52, 211, 153, 0.05) 100%)",
                      "linear-gradient(120deg, rgba(52, 211, 153, 0.05) 0%, rgba(52, 211, 153, 0.1) 50%, rgba(52, 211, 153, 0.05) 100%)"
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                
                {/* Subtle border */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{ 
                    border: "1px solid rgba(52, 211, 153, 0.2)"
                  }}
                />
                
                {/* Animated text with elegant styling */}
                <motion.div 
                  className="text-base font-medium tracking-wider relative z-10"
                >
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-green-300 to-green-200 font-medium"
                    animate={{
                      backgroundPosition: ["0% center", "100% center", "0% center"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    style={{
                      backgroundSize: "200% auto",
                    }}
                  >
                    Designed & Built with{" "}
                  </motion.span>
                  <motion.span
                    className="inline-block relative"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -2, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <span className="relative z-10">❤️</span>
                    <motion.div
                      className="absolute -inset-3 rounded-full opacity-0 z-0"
                      animate={{
                        opacity: [0, 0.5, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      style={{
                        background: "radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)"
                      }}
                    />
                  </motion.span>
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-green-300 to-green-200 font-medium"
                    animate={{
                      backgroundPosition: ["0% center", "100% center", "0% center"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    style={{
                      backgroundSize: "200% auto",
                    }}
                  >
                    {" "}by{" "}
                  </motion.span>
                  <motion.span
                    className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-300 font-bold"
                    animate={{
                      backgroundPosition: ["0% center", "100% center", "0% center"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    style={{
                      backgroundSize: "200% auto",
                    }}
                    whileHover={{
                      letterSpacing: "0.05em",
                      textShadow: "0 0 8px rgba(52, 211, 153, 0.5)"
                    }}
                  >
                    wica
                    
                    {/* Elegant animated underline */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-[1px] w-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: [0, 1, 1, 0] }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        times: [0, 0.2, 0.8, 1],
                        repeatDelay: 1
                      }}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.8), rgba(52, 211, 153, 0.8), transparent)",
                        transformOrigin: "left"
                      }}
                    />
                  </motion.span>
                </motion.div>
                
                {/* Subtle floating particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`sign-particle-${i}`}
                    className="absolute rounded-full bg-green-300/60"
                    style={{
                      width: Math.random() * 2 + 1,
                      height: Math.random() * 2 + 1,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      filter: "blur(0.5px)",
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      y: [0, (Math.random() - 0.5) * 15],
                      x: [0, (Math.random() - 0.5) * 15],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
            
            {/* Copyright with elegant styling */}
            <motion.div 
              className="mb-6 text-xs text-gray-500/70"
              whileHover={{ 
                color: "rgba(134, 239, 172, 0.8)",
                letterSpacing: "0.05em",
                textShadow: "0 0 5px rgba(52, 211, 153, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              © {new Date().getFullYear()} • All rights reserved
            </motion.div>
            
            {/* Code signature with elegant animation - Enhanced */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative"
                whileHover={{ 
                  scale: 1.1,
                  y: -2
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300/60 via-green-300 to-green-300/60"
                  animate={{
                    backgroundPosition: ["0% center", "100% center", "0% center"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                  whileHover={{
                    letterSpacing: "0.2em",
                    textShadow: "0 0 8px rgba(52, 211, 153, 0.5)"
                  }}
                >
                  &lt;/&gt;
                </motion.div>
                
                {/* Removed typing cursor effect */}
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
