"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Technology {
  name: string;
  description: string;
  url: string;
  category: "frontend" | "backend" | "styling" | "tools" | "deployment";
}

export default function CreditsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const technologies: Technology[] = [
    {
      name: "Next.js",
      description: "React framework for production with server-side rendering and static site generation",
      url: "https://nextjs.org/",
      category: "frontend"
    },
    {
      name: "React",
      description: "JavaScript library for building user interfaces",
      url: "https://reactjs.org/",
      category: "frontend"
    },
    {
      name: "TypeScript",
      description: "Typed superset of JavaScript that compiles to plain JavaScript",
      url: "https://www.typescriptlang.org/",
      category: "frontend"
    },
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React",
      url: "https://www.framer.com/motion/",
      category: "frontend"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapidly building custom designs",
      url: "https://tailwindcss.com/",
      category: "styling"
    },
    {
      name: "MDX",
      description: "Markdown for the component era",
      url: "https://mdxjs.com/",
      category: "frontend"
    },
    {
      name: "Shiki",
      description: "Beautiful syntax highlighting",
      url: "https://shiki.matsu.io/",
      category: "frontend"
    },
    {
      name: "Geist Font",
      description: "Modern, minimal typeface designed by Vercel",
      url: "https://vercel.com/font",
      category: "styling"
    },
    {
      name: "gray-matter",
      description: "Parse front-matter from markdown files",
      url: "https://github.com/jonschlinkert/gray-matter",
      category: "tools"
    },
    {
      name: "next/font",
      description: "Font optimization for Next.js",
      url: "https://nextjs.org/docs/basic-features/font-optimization",
      category: "styling"
    },
    {
      name: "next/image",
      description: "Image optimization for Next.js",
      url: "https://nextjs.org/docs/basic-features/image-optimization",
      category: "frontend"
    },
    {
      name: "next/og",
      description: "Open Graph image generation",
      url: "https://nextjs.org/docs/api-reference/next/head",
      category: "tools"
    },
    {
      name: "Vercel",
      description: "Platform for frontend frameworks and static sites",
      url: "https://vercel.com/",
      category: "deployment"
    },
    {
      name: "Contentlayer",
      description: "Content SDK for your website or app",
      url: "https://www.contentlayer.dev/",
      category: "tools"
    },
    {
      name: "Radix UI",
      description: "Unstyled, accessible components for building high‑quality design systems",
      url: "https://www.radix-ui.com/",
      category: "frontend"
    },
    {
      name: "Lucide Icons",
      description: "Beautiful & consistent icon toolkit made by the community",
      url: "https://lucide.dev/",
      category: "styling"
    },
    {
      name: "ESLint",
      description: "Pluggable JavaScript linter",
      url: "https://eslint.org/",
      category: "tools"
    },
    {
      name: "Prettier",
      description: "Opinionated code formatter",
      url: "https://prettier.io/",
      category: "tools"
    },
    {
      name: "Rehype",
      description: "HTML processor powered by plugins",
      url: "https://github.com/rehypejs/rehype",
      category: "tools"
    },
    {
      name: "Remark",
      description: "Markdown processor powered by plugins",
      url: "https://github.com/remarkjs/remark",
      category: "tools"
    },
    {
      name: "Unified",
      description: "Interface for processing content with syntax trees",
      url: "https://unifiedjs.com/",
      category: "tools"
    },
    {
      name: "GitHub Actions",
      description: "Automate your workflow from idea to production",
      url: "https://github.com/features/actions",
      category: "deployment"
    },
    {
      name: "Zod",
      description: "TypeScript-first schema validation with static type inference",
      url: "https://zod.dev/",
      category: "tools"
    },
    {
      name: "SWR",
      description: "React Hooks for data fetching",
      url: "https://swr.vercel.app/",
      category: "frontend"
    }
  ];

  const categories = [
    { id: "all", name: "All Technologies" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "styling", name: "Styling" },
    { id: "tools", name: "Tools" },
    { id: "deployment", name: "Deployment" }
  ];

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId !== activeCategory) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveCategory(categoryId);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const filteredTechnologies = activeCategory === "all" 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: 0.03 * i,
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.06 * i,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      scale: 0.8,
      y: -30,
      transition: {
        delay: 0.03 * i,
        duration: 0.3,
        ease: "easeInOut"
      }
    }),
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const categoryButtonVariants = {
    initial: { scale: 1 },
    active: { 
      scale: 1.05, 
      backgroundColor: "rgb(134, 239, 172)",
      color: "rgb(0, 0, 0)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    },
    inactive: { 
      scale: 1,
      backgroundColor: "rgba(39, 39, 42, 0.5)",
      color: "rgb(161, 161, 170)",
      transition: { 
        duration: 0.3 
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(63, 63, 70, 1)",
      color: "rgb(228, 228, 231)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1 
      }
    }
  };

  return (
    <main 
      ref={mainRef}
      className="relative min-h-screen text-white p-8 md:p-16 lg:p-24 max-w-4xl mx-auto overflow-hidden"
    >
      {/* Cosmic background elements */}
      <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1),rgba(0,0,0,0)_50%)] pointer-events-none" />
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.3), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0, x: "-100%" }}
          animate={{ 
            scaleX: 1, 
            opacity: 0.5, 
            x: "100%"
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Removed the animated particles section */}
        {/* 
        {[...Array(30)].map((_, i) => {
          const width = Math.random() * 4 + 1;
          const height = Math.random() * 4 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const r = 52 + Math.random() * 30;
          const g = 211 + Math.random() * 30;
          const b = 153 + Math.random() * 30;
          const opacity = 0.2 + Math.random() * 0.3;
          const blurSize = Math.random() * 5 + 2;
          const shadowOpacity = 0.3 + Math.random() * 0.4;
          const yDistance = -Math.random() * 150 - 50;
          const xDistance = (Math.random() - 0.5) * 80;
          const scale = 1 + Math.random() * 0.5;
          const rotation = Math.random() * 360;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          
          return (
            <motion.div
              key={`bg-particle-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width,
                height,
                left: `${left}%`,
                top: `${top}%`,
                background: `rgba(${r}, ${g}, ${b}, ${opacity})`,
                filter: "blur(1px)",
                boxShadow: `0 0 ${blurSize}px rgba(52, 211, 153, ${shadowOpacity})`,
              }}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: 0.8,
                y: yDistance,
                x: xDistance,
                scale: scale,
                rotate: rotation
              }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
        */}
      </div>

      <div className="flex-1 relative z-10">
        {/* Header */}
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
              animate={{ rotate: 5 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              &gt;
            </motion.span>{" "}
            <span className="relative">
              credits
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
            A tribute to the amazing technologies and tools that power this website.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12 p-6 rounded-lg border border-green-300/20 bg-zinc-900/40 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div 
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-300/30 flex-shrink-0"
              whileHover={{ scale: 1.1, borderColor: "rgba(52, 211, 153, 0.5)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image 
                src="https://avatars.githubusercontent.com/u/59052194?v=4"
                alt="Karan's avatar"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex-1">
              <motion.h3 
                className="text-xl font-bold text-white mb-1 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Karan
                <motion.span 
                  className="inline-block text-green-300 text-sm px-2 py-0.5 rounded-full border border-green-300/30 bg-green-300/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  Inspiration
                </motion.span>
              </motion.h3>
              
              <motion.p 
                className="text-zinc-400 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.6 }}
              >
                Original portfolio design that inspired this project. While this site has been completely redesigned and modified, the initial concept came from Karan's work.
              </motion.p>
              
              <motion.a
                href="https://github.com/puang59/puang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Original Repository
              </motion.a>
            </div>
            
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            >
              <motion.div 
                className="px-4 py-2 rounded-full bg-green-300/10 border border-green-300/20 text-green-300 text-sm"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(52, 211, 153, 0.3)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                @puang59
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Category filters with improved animations */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all relative overflow-hidden`}
              variants={categoryButtonVariants}
              initial="initial"
              animate={activeCategory === category.id ? "active" : "inactive"}
              whileHover={activeCategory !== category.id ? "hover" : undefined}
              whileTap="tap"
              custom={index}
            >
              {activeCategory === category.id && (
                <motion.div 
                  className="absolute inset-0 bg-green-300 -z-10"
                  layoutId="activeCategoryBackground"
                  initial={{ borderRadius: 9999 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
              
              {/* Subtle pulse effect for active category */}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-300/30 -z-20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: [0.8, 1.2, 0.8], 
                    opacity: [0, 0.5, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Technologies grid with super modern hover effects */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            {/* Loading indicator during transitions */}
            {isTransitioning && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-16 h-16 border-t-2 border-green-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              </motion.div>
            )}
            
            {/* Empty state - Not Found */}
            {!isTransitioning && filteredTechnologies.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center min-h-[400px] w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="relative w-24 h-24 mb-6"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-dashed border-green-300/30"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-zinc-900/80 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-green-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  No technologies found
                </motion.h3>
                
                <motion.p 
                  className="text-zinc-400 text-center max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.4 }}
                >
                  We haven't added any technologies in this category yet.
                  <br />
                  Check out the other categories or check back later!
                </motion.p>
                
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={() => handleCategoryChange("all")}
                    className="px-4 py-2 rounded-full text-sm bg-green-300/20 text-green-300 hover:bg-green-300/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View all technologies
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Technologies grid */}
            {!isTransitioning && filteredTechnologies.length > 0 && (
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredTechnologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative group" // Removed perspective class
                    layoutId={`tech-card-${tech.name}`}
                  >
                    <motion.a
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] overflow-hidden" // Removed transform-gpu
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      whileHover={{ 
                        scale: 1.02, // Removed rotateX and rotateY
                        transition: { duration: 0.4, type: "spring", stiffness: 300 }
                      }}
                      // Removed style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Glassmorphism overlay */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm bg-gradient-to-br from-green-300/10 to-transparent rounded-lg pointer-events-none" // Added pointer-events-none
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      
                      {/* Animated border gradient */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none" // Added pointer-events-none
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div 
                          className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-transparent"
                          style={{
                            background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(52, 211, 153, 0.5) 120deg, transparent 180deg, transparent 240deg, rgba(52, 211, 153, 0.5) 300deg, transparent 360deg)",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      
                      {/* Animated spotlight effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 211, 153, 0.15) 0%, transparent 50%)`,
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative z-10 transition-transform duration-500"> 
                        {/* Removed transform-gpu and group-hover:translate-z-10 */}
                        <div className="flex items-center mb-4">
                          {/* Placeholder for icon - replace with actual icons if available */}
                          <div className="w-8 h-8 rounded-full bg-green-300/20 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{tech.description}</p>
                        {/* --- End of added content --- */}
                      </div>
                      
                      {/* Simplified Hover Effects */}
                      <AnimatePresence>
                        {hoveredTech === tech.name && (
                          <>
                            {/* Simple Glowing Background */}
                            <motion.div
                              className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-br from-green-300/5 via-green-300/10 to-transparent"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                            
                            {/* Simple Pulsing Border */}
                            <motion.div
                              className="absolute inset-0 rounded-lg border-2 border-green-300/0 pointer-events-none"
                              initial={{ opacity: 0, borderColor: "rgba(52, 211, 153, 0)" }}
                              animate={{ 
                                opacity: [0, 0.5, 0],
                                borderColor: [
                                  "rgba(52, 211, 153, 0)",
                                  "rgba(52, 211, 153, 0.5)",
                                  "rgba(52, 211, 153, 0)"
                                ]
                              }}
                              exit={{ opacity: 0, borderColor: "rgba(52, 211, 153, 0)" }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </>
                        )}
                      </AnimatePresence>
                      
                      {/* Enhanced glowing dot in corner (Keep this simple one) */}
                      <motion.div 
                        className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-300/50 opacity-0 group-hover:opacity-100 pointer-events-none" // Added pointer-events-none
                        initial={{ boxShadow: "0 0 0px rgba(52, 211, 153, 0)" }}
                        whileHover={{ 
                          boxShadow: "0 0 10px rgba(52, 211, 153, 0.8)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Back to home link */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/">
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-300/10 to-emerald-500/10 text-green-300 hover:from-green-300/20 hover:to-emerald-500/20 transition-all border border-green-300/20 group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(52, 211, 153, 0.3)",
                borderColor: "rgba(52, 211, 153, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-300/10 to-green-300/0 opacity-0 group-hover:opacity-100"
                style={{
                  transform: "translateX(-100%)",
                  animation: "slideRight 1s ease-in-out forwards",
                  animationPlayState: "paused"
                }}
              />
              <style>{`
                .group:hover div {
                  animation-play-state: running;
                }
                @keyframes slideRight {
                  0% { transform: translateX(-100%); opacity: 0; }
                  100% { transform: translateX(100%); opacity: 1; }
                }
              `}</style>
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{
                  animation: "moveLeftRight 1.5s infinite ease-in-out",
                  animationPlayState: "paused"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <style>{`
                 .group:hover svg {
                  animation-play-state: running;
                }
                @keyframes moveLeftRight {
                  0% { transform: translateX(0); }
                  50% { transform: translateX(-3px); }
                  100% { transform: translateX(0); }
                }
              `}</style>
              
              <span className="relative z-10 font-medium tracking-wide">Back to home</span>
              
              <div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-green-300/0 via-green-300/70 to-green-300/0 w-0 group-hover:w-full transition-all duration-700"
              />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}