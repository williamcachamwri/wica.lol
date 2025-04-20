"use client";

import { projectList } from "./Projects";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ProjectCardsProps {
  activeCategory?: string;
}

export function ProjectCards({ activeCategory = "All" }: ProjectCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter projects based on active category
  const filteredProjects = projectList.filter(project => {
    if (activeCategory === "All") return true;
    return project.technologies.includes(activeCategory);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
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
    <div ref={containerRef} className="text-white my-10 relative">
      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.02),transparent_70%)]" />
      </div>

      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <motion.div
              className="inline-block text-green-300/50 mb-4"
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-medium text-white/80 mb-2">No projects found</h3>
            <p className="text-gray-400/70 text-sm">Try selecting a different category</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8"
          >
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={project.title}
                  className="relative overflow-hidden rounded-lg border border-zinc-800/50 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ 
                    y: -2,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  layout
                >
                  {/* Liquid gradient border effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Liquid gradient that moves with mouse */}
                    <svg className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <motion.stop 
                            offset="0%" 
                            animate={{ 
                              stopColor: ['#10b981', '#86efac', '#10b981'],
                              stopOpacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <motion.stop 
                            offset="50%" 
                            animate={{ 
                              stopColor: ['#86efac', '#10b981', '#86efac'],
                              stopOpacity: [1, 0.7, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <motion.stop 
                            offset="100%" 
                            animate={{ 
                              stopColor: ['#10b981', '#86efac', '#10b981'],
                              stopOpacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </linearGradient>
                        <filter id={`glow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="8" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <motion.rect 
                        x="0" 
                        y="0" 
                        width="100%" 
                        height="100%" 
                        rx="8"
                        fill="none"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="1.5"
                        strokeDasharray="1 1"
                        animate={{
                          strokeDashoffset: [0, -10],
                          filter: isHovered ? `url(#glow-${index})` : 'none'
                        }}
                        transition={{ 
                          strokeDashoffset: { 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }
                        }}
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Magnetic liquid blob effect */}
                  {isHovered && (
                    <motion.div 
                      className="absolute pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        x: mousePosition.x - 100,
                        y: mousePosition.y - 100,
                      }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                        mass: 0.5
                      }}
                      style={{
                        width: 200,
                        height: 200,
                        filter: "blur(40px)",
                        background: "radial-gradient(circle, rgba(134,239,172,0.15) 0%, transparent 70%)",
                        zIndex: 0
                      }}
                    />
                  )}
                  
                  {/* Content container with minimalist design */}
                  <div className="relative p-6 z-10 bg-zinc-900/20 backdrop-blur-sm">
                    <a
                      href={project.link}
                      className="block"
                    >
                      {/* Minimalist title with elegant underline effect */}
                      <div className="overflow-hidden">
                        <motion.h3 
                          className="text-xl font-medium inline-block"
                          animate={{ 
                            color: isHovered ? '#86efac' : '#ffffff',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {project.title}
                          <motion.div 
                            className="h-px bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 mt-1"
                            initial={{ scaleX: 0 }}
                            animate={{ 
                              scaleX: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </motion.h3>
                      </div>

                      {/* Clean description with subtle animation */}
                      <motion.p 
                        className="text-gray-300/80 mt-3 text-sm leading-relaxed"
                        animate={{ 
                          opacity: isHovered ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.description}
                      </motion.p>

                      {/* Minimalist technology tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={tech}
                            className="text-xs px-2.5 py-0.5 rounded-full border"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ 
                              opacity: 1,
                              x: 0,
                              borderColor: tech === activeCategory
                                ? 'rgba(134, 239, 172, 0.5)'
                                : isHovered 
                                  ? 'rgba(134, 239, 172, 0.3)' 
                                  : 'rgba(39, 39, 42, 0.3)',
                              color: tech === activeCategory
                                ? '#86efac'
                                : isHovered ? 'rgba(134, 239, 172, 0.9)' : '#a1a1aa',
                              backgroundColor: 'transparent'
                            }}
                            transition={{ 
                              duration: 0.3, 
                              delay: isHovered ? 0.1 + (techIndex * 0.03) : 0
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Elegant view project link with unique animation */}
                      <motion.div
                        className="mt-5 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isHovered ? 'auto' : 0,
                          opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="inline-flex items-center text-green-300 text-sm font-medium relative"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ 
                            x: isHovered ? 0 : -10,
                            opacity: isHovered ? 1 : 0
                          }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          View Project
                          <svg 
                            className="ml-1.5 w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1.5} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                          
                          {/* Unique liquid trail effect */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-green-300/50"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: isHovered ? '100%' : '0%',
                            }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.2,
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    </a>
                  </div>
                  
                  {/* Unique magnetic particles effect */}
                  {isHovered && (
                    <AnimatePresence>
                      {[...Array(8)].map((_, i) => {
                        const size = Math.random() * 3 + 1;
                        const initialX = Math.random() * 100;
                        const initialY = Math.random() * 100;
                        
                        return (
                          <motion.div
                            key={`magnetic-particle-${i}`}
                            className="absolute rounded-full bg-green-300/80"
                            initial={{ 
                              opacity: 0,
                              x: `${initialX}%`,
                              y: `${initialY}%`,
                              scale: 0
                            }}
                            animate={{ 
                              opacity: [0, 0.8, 0],
                              scale: [0, 1, 0],
                              x: [
                                `${initialX}%`,
                                `${mousePosition.x / containerRef.current!.offsetWidth * 100}%`,
                                `${initialX}%`
                              ],
                              y: [
                                `${initialY}%`,
                                `${mousePosition.y / (containerRef.current!.offsetHeight / filteredProjects.length) * 100}%`,
                                `${initialY}%`
                              ]
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ 
                              duration: 2 + Math.random() * 2,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              boxShadow: '0 0 4px rgba(134,239,172,0.8)'
                            }}
                          />
                        );
                      })}
                    </AnimatePresence>
                  )}
                  
                  {/* Unique hover interaction effect - liquid splash */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <radialGradient id={`splash-${index}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#86efac" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <motion.circle
                          cx={mousePosition.x}
                          cy={mousePosition.y}
                          r="10"
                          fill={`url(#splash-${index})`}
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: [0, 5],
                            opacity: [0.7, 0]
                          }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}