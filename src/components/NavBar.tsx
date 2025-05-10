"use client";
import TransitionLink from "./utils/TransitionLink";
import {
  RiHome2Line,
  RiHome2Fill,
  RiPuzzle2Line,
  RiPuzzle2Fill,
  RiGitRepositoryLine,
  RiGitRepositoryFill,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiMenuLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiFileInfoFill,
  RiFileInfoLine
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const pathname = usePathname();
  const iconStyles = "transition-all duration-300 absolute";
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Get active state for each nav item
  const isActive = (path: string) => pathname === path;

  // Toggle navbar collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Auto-expand when hovering for more than 800ms - REMOVE THIS EFFECT
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHoveringNav && isCollapsed) {
      timer = setTimeout(() => {
        // Remove auto-expand behavior
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [isHoveringNav, isCollapsed]);

  return (
    <>
      {/* Enhanced bottom screen gradient for content fading */}
      <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-40"></div>

      {/* Navbar positioned on top of the fade effect */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 z-40 pb-6 px-4 flex justify-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      >
        <motion.div 
          className={`relative backdrop-blur-md rounded-full w-fit border border-zinc-800 shadow-lg overflow-hidden ${
            scrolled ? "bg-zinc-900/80" : "bg-zinc-900/60"
          }`}
          whileHover={{ 
            scale: isCollapsed ? 1.05 : 1.02,
            boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(134, 239, 172, 0.4)"
          }}
          animate={{ 
            width: isCollapsed ? "auto" : "auto",
            height: isCollapsed ? "auto" : "auto",
            boxShadow: isCollapsed 
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(134, 239, 172, 0.2)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(134, 239, 172, 0.3)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17,
            width: { duration: 0.3 },
            height: { duration: 0.3 }
          }}
        >
          {/* Cosmic background effect */}
          <motion.div 
            className="absolute inset-0 -z-10 opacity-30"
            animate={{ 
              background: isCollapsed 
                ? "radial-gradient(circle at center, rgba(134, 239, 172, 0.2), transparent 70%)"
                : "radial-gradient(circle at center, rgba(134, 239, 172, 0.3), transparent 80%)"
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Animated particles in background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {!isCollapsed && [...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-green-300/30"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: 0
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
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Animated border glow */}
          <motion.div 
            className="absolute inset-0 rounded-full -z-5 pointer-events-none"
            animate={{ 
              boxShadow: isCollapsed
                ? [
                    "inset 0 0 0 1px rgba(134, 239, 172, 0.1)",
                    "inset 0 0 0 1px rgba(134, 239, 172, 0.3)",
                    "inset 0 0 0 1px rgba(134, 239, 172, 0.1)"
                  ]
                : [
                    "inset 0 0 0 1px rgba(134, 239, 172, 0.2)",
                    "inset 0 0 0 1px rgba(134, 239, 172, 0.4)",
                    "inset 0 0 0 1px rgba(134, 239, 172, 0.2)"
                  ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          <AnimatePresence mode="wait">
            {isCollapsed ? (
              /* Collapsed state - just show menu button */
              <motion.div
                key="collapsed"
                className="p-3 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  width: 0,
                  transition: {
                    type: "spring",
                    stiffness: 800,
                    damping: 40,
                    mass: 0.8,
                    velocity: 10
                  }
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 800,
                  damping: 40,
                  mass: 0.8,
                  velocity: 10,
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.2 }
                }}
              >
                <motion.button
                  onClick={toggleCollapse}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 5, 0],
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    rotate: 0,
                  }}
                  transition={{
                    rotate: { duration: 0.5, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 500, damping: 10 }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(134, 239, 172, 0)",
                        "0 0 0 4px rgba(134, 239, 172, 0.3)",
                        "0 0 0 0 rgba(134, 239, 172, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <RiMenuUnfoldLine size={22} className="text-green-300 transition-colors duration-300" />
                  
                  {/* Orbital particles */}
                  <motion.div
                    className="absolute w-1.5 h-1.5 rounded-full bg-green-300/60"
                    animate={{
                      rotate: 360,
                      x: 15 * Math.cos(0),
                      y: 15 * Math.sin(0),
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 rounded-full bg-green-300/40"
                    animate={{
                      rotate: -360,
                      x: 15 * Math.cos(Math.PI * 2/3),
                      y: 15 * Math.sin(Math.PI * 2/3),
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 rounded-full bg-green-300/40"
                    animate={{
                      rotate: 180,
                      x: 15 * Math.cos(Math.PI * 4/3),
                      y: 15 * Math.sin(Math.PI * 4/3),
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.button>
              </motion.div>
            ) : (
              /* Expanded state - show full navbar */
              <motion.div
                key="expanded"
                className="flex justify-center items-center py-3 px-5 relative"
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  width: "auto", 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 800,
                    damping: 40,
                    mass: 0.8,
                    velocity: 10,
                    width: { duration: 0.2 },
                    opacity: { duration: 0.2, delay: 0.05 },
                    scale: { duration: 0.2, delay: 0.05 }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  width: 0, 
                  scale: 0.9,
                  transition: {
                    type: "spring",
                    stiffness: 800,
                    damping: 40,
                    mass: 0.8,
                    velocity: 10,
                    width: { duration: 0.2, delay: 0.05 },
                    opacity: { duration: 0.15 },
                    scale: { duration: 0.15 }
                  }
                }}
              >
                <NavItem 
                  href="/"
                  icon={{ filled: RiHome2Fill, outline: RiHome2Line }}
                  name="home"
                  isActive={isActive("/")}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />

                <div className="inline-block h-6 w-px self-stretch bg-zinc-700/50 mx-5"></div>

                <NavItem 
                  href="/projects"
                  icon={{ filled: RiPuzzle2Fill, outline: RiPuzzle2Line }}
                  name="projects"
                  isActive={isActive("/projects")}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />

                <div className="inline-block h-6 w-px self-stretch bg-zinc-700/50 mx-5"></div>

                <NavItem 
                  href="/blog"
                  icon={{ filled: RiGitRepositoryFill, outline: RiGitRepositoryLine }}
                  name="blog"
                  isActive={isActive("/blog")}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />
                                <div className="inline-block h-6 w-px self-stretch bg-zinc-700/50 mx-5"></div>

                                <NavItem 
                  href="/photos"
                  icon={{ filled: RiGitRepositoryFill, outline: RiGitRepositoryLine }}
                  name="photos"
                  isActive={isActive("/photos")}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />

<div className="inline-block h-6 w-px self-stretch bg-zinc-700/50 mx-5"></div>

<NavItem 
  href="/credits"
  icon={{ filled: RiFileInfoFill, outline: RiFileInfoLine }}
  name="credits"
  isActive={isActive("/credits")}
  hoveredIcon={hoveredIcon}
  setHoveredIcon={setHoveredIcon}
/>
                
                <div className="inline-block h-6 w-px self-stretch bg-zinc-700/50 ml-5"></div>
                
                {/* Collapse button - improved visibility */}
                <motion.button
                  onClick={toggleCollapse}
                  className="relative w-10 h-10 flex items-center justify-center ml-5 group"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    rotate: 0,
                  }}
                  transition={{
                    rotate: { duration: 0.5, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 500, damping: 10 }
                  }}
                >
                  {/* Visible background even without hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-zinc-800 group-hover:bg-zinc-700/90 transition-all duration-300"
                    animate={{
                      boxShadow: "0 0 10px rgba(134, 239, 172, 0.3)"
                    }}
                    whileHover={{ 
                      boxShadow: "0 0 25px rgba(134, 239, 172, 0.6)",
                      background: "linear-gradient(135deg, rgba(52, 52, 52, 0.9), rgba(23, 23, 23, 0.9))"
                    }}
                  />
                  
                  {/* Icon with animation */}
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RiMenuFoldLine size={22} className="text-green-300 group-hover:text-green-200 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Always visible halo effect around button */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 1px rgba(134, 239, 172, 0.2)",
                        "0 0 0 2px rgba(134, 239, 172, 0.3)",
                        "0 0 0 1px rgba(134, 239, 172, 0.2)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Enhanced radial glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at center, rgba(134, 239, 172, 0.3) 0%, transparent 70%)"
                    }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </>
  );
};

// NavItem component for cleaner code
interface NavItemProps {
  href: string;
  icon: {
    filled: React.ElementType;
    outline: React.ElementType;
  };
  name: string;
  isActive: boolean;
  hoveredIcon: string | null;
  setHoveredIcon: (name: string | null) => void;
}

// Fix the NavItem component to move tooltip outside of overflow container
const NavItem = ({ href, icon, name, isActive, hoveredIcon, setHoveredIcon }: NavItemProps) => {
  const isHovered = hoveredIcon === name;
  const FilledIcon = icon.filled;
  const OutlineIcon = icon.outline;
  
  return (
    <>
      <TransitionLink
        href={href}
        className="group relative w-10 h-10 flex items-center justify-center"
        onMouseEnter={() => setHoveredIcon(name)}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        {/* Cosmic background effect */}
        <motion.div
          className={`absolute inset-0 rounded-full overflow-hidden ${
            isActive || isHovered ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isActive || isHovered ? 1 : 0,
            scale: isActive || isHovered ? 1 : 0.8,
          }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-80"
            animate={{
              background: isHovered && !isActive
                ? "linear-gradient(135deg, rgba(134, 239, 172, 0.9), rgba(110, 231, 183, 0.9))"
                : "linear-gradient(135deg, rgba(134, 239, 172, 0.8), rgba(110, 231, 183, 0.8))"
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)",
              ]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Main button background with glow */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isActive || isHovered
              ? "bg-green-300" 
              : "bg-zinc-800"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isActive || isHovered ? 1 : 0,
            scale: isActive || isHovered ? 1 : 0.8,
            boxShadow: isActive || isHovered 
              ? "0 0 30px rgba(134,239,172,0.9), inset 0 0 15px rgba(255,255,255,0.5)" 
              : "none"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15 
          }}
        />
        
        {/* Multiple animated rings */}
        {(isActive || isHovered) && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-300/50"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: [0.7, 0.5, 0.7], 
                scale: [1.1, 1.2, 1.1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-green-200/30"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: [0.5, 0.3, 0.5], 
                scale: [1.3, 1.4, 1.3],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-green-100/20"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: [0.3, 0.1, 0.3], 
                scale: [1.5, 1.6, 1.5],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </>
        )}

        {/* Icon container with cosmic effects */}
        <div className="relative w-6 h-6 flex items-center justify-center z-10">
          <FilledIcon
            size={22}
            className={`absolute transition-all duration-300 ${
              isActive ? "text-zinc-900 scale-100" : "text-zinc-900 scale-0"
            } ${isHovered && !isActive ? "scale-100" : ""}`}
          />
          <OutlineIcon
            size={22}
            className={`absolute transition-all duration-300 text-white/80 ${
              isActive || isHovered ? "scale-0" : "scale-100"
            }`}
          />
          
          {/* Siêu cải tiến hiệu ứng hạt */}
          {(isActive || isHovered) && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Orbital particles - cải tiến */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 12 + Math.random() * 5;
                const size = 0.5 + Math.random() * 1.5;
                const duration = 2 + Math.random() * 3;
                const delay = Math.random() * 2;
                
                return (
                  <motion.span 
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{ 
                      width: `${size}px`,
                      height: `${size}px`,
                      x: Math.cos(angle) * radius,
                      y: Math.sin(angle) * radius,
                      boxShadow: "0 0 3px rgba(255,255,255,0.8)"
                    }}
                    animate={{
                      x: [
                        Math.cos(angle) * radius,
                        Math.cos(angle + Math.PI) * radius,
                        Math.cos(angle + Math.PI * 2) * radius
                      ],
                      y: [
                        Math.sin(angle) * radius,
                        Math.sin(angle + Math.PI) * radius,
                        Math.sin(angle + Math.PI * 2) * radius
                      ],
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      delay: delay,
                      ease: "linear"
                    }}
                  />
                );
              })}
              
              {/* Hiệu ứng tia sáng từ trung tâm */}
              <motion.div
                className="absolute w-full h-full rounded-full"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 50%)"
                }}
                animate={{
                  opacity: [0.7, 0.3, 0.7],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </div>
      </TransitionLink>
    </>
  );
};

export default NavBar;
