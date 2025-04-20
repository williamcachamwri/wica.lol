"use client";

import {
  RiGithubFill,
  RiMailFill,
  RiPagesFill,
  RiTelegramFill,
  RiInstagramFill
} from "@remixicon/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const socials = [
  {
    title: "github",
    username: "@williamcachamwri",
    link: "https://github.com/williamcachamwri",
    icon: RiGithubFill,
    color: "#6e5494",
  },
  {
    title: "telegram",
    username: "@williamxdev",
    link: "https://t.me/williamxdev",
    icon: RiTelegramFill,
    color: "#0077b5",
  },
  {
    title: "Instagram",
    username: "levinhkhangg",
    link: "https://instagram.com/williamcachamwri",
    icon: RiInstagramFill,
    color: "#ff6600",
  },
  {
    title: "email",
    username: "levinhkhang93@gmail.com",
    link: "mailto:levinhkhang93@gmail.com",
    icon: RiMailFill,
    color: "#ea4335",
  },
];

export default function Socials() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('socials-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight - 100;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      id="socials-section"
      className="mb-16 text-white relative"
      onMouseMove={handleMouseMove}
    >
      {/* Cosmic background effect */}

      
      <motion.h2 
        className="text-2xl font-bold mb-8 relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 20,
          textShadow: isVisible ? "0 0 15px rgba(52, 211, 153, 0.5)" : "none"
        }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
      >
        <motion.span 
          className="text-green-300 mr-2"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.2, 1, 1.2, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        >
          &gt;
        </motion.span>
        socials
        <motion.span 
          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-green-300 to-transparent"
          initial={{ width: 0 }}
          animate={{ 
            width: isVisible ? "100%" : "0%",
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            width: { duration: 0.8, delay: 0.3 },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.h2>
      
      <div className="space-y-4 relative">
        {socials.map((social, index) => {
          const isHovered = hoveredItem === social.title;
          
          return (
            <motion.div 
              key={social.title} 
              className="group relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                x: isVisible ? 0 : -50,
                filter: isHovered ? "drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))" : "none"
              }}
              transition={{ 
                duration: 0.7, 
                delay: isVisible ? index * 0.15 : 0,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              onHoverStart={() => setHoveredItem(social.title)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 px-4 rounded-lg relative z-10 group-hover:text-white transition-colors duration-300"
              >
                {/* Cosmic background glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-lg -z-10 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isHovered ? 0.15 : 0,
                    backgroundColor: isHovered ? social.color : "transparent",
                    boxShadow: isHovered 
                      ? [
                          `0 0 20px ${social.color}40`,
                          `0 0 30px ${social.color}30`,
                          `0 0 20px ${social.color}40`
                        ]
                      : "none"
                  }}
                  transition={{ 
                    duration: 0.3,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-lg z-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isHovered && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-full h-[1px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${social.color}, transparent)` }}
                        animate={{ 
                          left: ["-100%", "100%"],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-full h-[1px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${social.color}, transparent)` }}
                        animate={{ 
                          right: ["-100%", "100%"],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div
                        className="absolute left-0 top-0 h-full w-[1px]"
                        style={{ background: `linear-gradient(0deg, transparent, ${social.color}, transparent)` }}
                        animate={{ 
                          top: ["-100%", "100%"],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div
                        className="absolute right-0 bottom-0 h-full w-[1px]"
                        style={{ background: `linear-gradient(0deg, transparent, ${social.color}, transparent)` }}
                        animate={{ 
                          bottom: ["-100%", "100%"],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </>
                  )}
                </motion.div>
                
                {/* Icon container with enhanced animations */}
                <motion.div 
                  className="relative"
                  animate={{ 
                    scale: isHovered ? [1, 1.2, 1.1] : 1,
                    rotate: isHovered ? [0, -10, 10, -5, 0] : 0,
                  }}
                  transition={{ 
                    scale: { duration: 0.4, times: [0, 0.6, 1] },
                    rotate: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }
                  }}
                >
                  {/* Orbital rings around icon */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ 
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1.2, 1.4, 1.2],
                            rotate: [0, 180]
                          }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{ 
                            border: `1px solid ${social.color}`,
                            boxShadow: `0 0 10px ${social.color}50`
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ 
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1.5, 1.7, 1.5],
                            rotate: [0, -180]
                          }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{ 
                            border: `1px solid ${social.color}80`
                          }}
                        />
                      </>
                    )}
                  </AnimatePresence>

                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      boxShadow: isHovered ? `0 0 15px ${social.color}` : "none",
                      opacity: isHovered ? [0.5, 0.8, 0.5] : 0
                    }}
                    transition={{ 
                      opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* The actual icon */}
                  <social.icon 
                    size={24} 
                    className="transition-colors duration-300 relative z-10"
                    style={{ 
                      color: isHovered ? social.color : "#ffffff80",
                      filter: isHovered ? `drop-shadow(0 0 3px ${social.color})` : "none"
                    }}
                  />
                </motion.div>
                
                {/* Username with enhanced letter animation */}
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isHovered ? `${social.title}-hovered` : social.title}
                      initial={{ y: isHovered ? 20 : 0, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex"
                    >
                      {isHovered ? (
                        // Animated letters when hovered
                        social.username.split('').map((letter, i) => (
                          <motion.span
                            key={`letter-${i}`}
                            className="text-sm inline-block"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: i * 0.03,
                              type: "spring",
                              stiffness: 200
                            }}
                            style={{ 
                              color: social.color,
                              textShadow: `0 0 5px ${social.color}50`
                            }}
                          >
                            {letter === ' ' ? '\u00A0' : letter}
                          </motion.span>
                        ))
                      ) : (
                        <motion.span className="text-sm inline-block text-zinc-400">
                          {social.username}
                        </motion.span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Enhanced animated arrow */}
                <motion.div
                  className="ml-auto"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10,
                    scale: isHovered ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    duration: 0.3,
                    scale: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ 
                      filter: isHovered ? `drop-shadow(0 0 3px ${social.color})` : "none"
                    }}
                  >
                    <motion.path 
                      d="M5 12H19M19 12L13 6M19 12L13 18" 
                      stroke={social.color}
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? [0, 2, 0] : 0
                      }}
                      transition={{ 
                        duration: 0.3,
                        x: {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }}
                    />
                  </svg>
                </motion.div>
                
                {/* Enhanced particle effects */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {[...Array(10)].map((_, i) => (
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
                            opacity: [0, 0.8, 0],
                            scale: [0, Math.random() * 0.5 + 0.5, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 1 + Math.random() * 1,
                            repeat: Infinity,
                            delay: Math.random() * 0.5,
                          }}
                          style={{
                            left: `${50 + (Math.random() - 0.5) * 20}%`,
                            top: `${50 + (Math.random() - 0.5) * 20}%`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            backgroundColor: social.color,
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${social.color}`
                          }}
                        />
                      ))}
                      
                      {/* Cosmic dust particles */}
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={`dust-${i}`}
                          className="absolute rounded-full z-0 pointer-events-none"
                          initial={{ 
                            opacity: 0,
                            scale: 0,
                          }}
                          animate={{ 
                            opacity: [0, 0.4, 0],
                            scale: [0, Math.random() * 0.3 + 0.1, 0],
                            x: [
                              0, 
                              (Math.random() - 0.5) * 150 * (Math.random() > 0.5 ? 1 : -1)
                            ],
                            y: [
                              0, 
                              (Math.random() - 0.5) * 150 * (Math.random() > 0.5 ? 1 : -1)
                            ],
                            rotate: [0, Math.random() * 360]
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 1.5 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 0.5,
                            ease: "easeOut"
                          }}
                          style={{
                            left: `${50 + (Math.random() - 0.5) * 40}%`,
                            top: `${50 + (Math.random() - 0.5) * 40}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            backgroundColor: `${social.color}80`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </a>
            </motion.div>
          );
        })}
      </div>
      
      {/* Cosmic background particles */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-green-300/20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: isVisible ? [0, 0.5, 0] : 0,
              scale: isVisible ? [0, 1, 0] : 0
            }}
            transition={{ 
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
}