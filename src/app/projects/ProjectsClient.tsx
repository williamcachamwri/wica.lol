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

  const [previousCategory, setPreviousCategory] = useState("All");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const categories = [
    "All",
    ...Array.from(
      new Set(
        projectList
          .flatMap((project) => project.technologies)
          .filter((tech) =>
            ["React", "Next.js", "TypeScript", "Vue.js", "Node.js"].includes(
              tech
            )
          )
      )
    ),
  ];

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    setIsTransitioning(true);
    setPreviousCategory(activeCategory);
    setActiveCategory(category);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

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
      <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1),rgba(0,0,0,0)_50%)] pointer-events-none" />

        <motion.div
          className="absolute top-0 left-0 w-full h-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.3), transparent)",
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: ["-100%", "0%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.2), transparent)",
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.3, 0],
            x: ["100%", "0%", "-100%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${52 + Math.random() * 30}, ${
                211 + Math.random() * 30
              }, ${153 + Math.random() * 30}, ${0.2 + Math.random() * 0.3})`,
              filter: "blur(1px)",
              boxShadow: `0 0 ${Math.random() * 5 + 2}px rgba(52, 211, 153, ${
                0.3 + Math.random() * 0.4
              })`,
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

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(52, 211, 153, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(52, 211, 153, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="flex-1 relative z-10">
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
            A showcase of my creative work, experiments, and technical
            explorations.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 flex flex-wrap gap-3 relative"
        >
          <AnimatePresence>
            <motion.div
              key={`glow-${activeCategory}`}
              className="absolute -z-10 rounded-full bg-green-300/5 filter blur-xl"
              initial={{
                opacity: 0,
                scale: 0.8,
                x: categoryRefs.current[previousCategory]
                  ? categoryRefs.current[previousCategory]!.offsetLeft
                  : 0,
                width: categoryRefs.current[previousCategory]
                  ? categoryRefs.current[previousCategory]!.offsetWidth
                  : 100,
              }}
              animate={{
                opacity: 1,
                scale: 1.2,
                x: categoryRefs.current[activeCategory]
                  ? categoryRefs.current[activeCategory]!.offsetLeft - 10
                  : 0,
                width: categoryRefs.current[activeCategory]
                  ? categoryRefs.current[activeCategory]!.offsetWidth + 20
                  : 100,
                height: "100%",
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
            />
          </AnimatePresence>

          {isTransitioning && previousCategory !== activeCategory && (
            <motion.div
              className="absolute h-[3px] -z-10 bg-gradient-to-r from-green-300/0 via-green-300/80 to-green-300/0 rounded-full"
              initial={{
                opacity: 0,
                width: 0,
                left: categoryRefs.current[previousCategory]
                  ? categoryRefs.current[previousCategory]!.offsetLeft +
                    categoryRefs.current[previousCategory]!.offsetWidth / 2
                  : 0,
                top: "50%",
              }}
              animate={{
                opacity: [0, 1, 0],
                width: [
                  0,
                  Math.abs(
                    (categoryRefs.current[activeCategory]?.offsetLeft || 0) -
                      (categoryRefs.current[previousCategory]?.offsetLeft || 0)
                  ) + 50,
                  0,
                ],
                left: [
                  categoryRefs.current[previousCategory]
                    ? categoryRefs.current[previousCategory]!.offsetLeft +
                      categoryRefs.current[previousCategory]!.offsetWidth / 2
                    : 0,

                  Math.min(
                    categoryRefs.current[previousCategory]?.offsetLeft || 0,
                    categoryRefs.current[activeCategory]?.offsetLeft || 0
                  ) +
                    Math.abs(
                      (categoryRefs.current[activeCategory]?.offsetLeft || 0) -
                        (categoryRefs.current[previousCategory]?.offsetLeft ||
                          0)
                    ) /
                      2,

                  categoryRefs.current[activeCategory]
                    ? categoryRefs.current[activeCategory]!.offsetLeft +
                      categoryRefs.current[activeCategory]!.offsetWidth / 2
                    : 0,
                ],
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}

          <AnimatePresence>
            {isTransitioning && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`transition-particle-${i}`}
                    className="absolute rounded-full bg-green-300/80 z-20 pointer-events-none"
                    style={{
                      width: Math.random() * 3 + 1,
                      height: Math.random() * 3 + 1,
                      filter: "blur(0.5px)",
                      top: "50%",
                    }}
                    initial={{
                      x: categoryRefs.current[previousCategory]
                        ? categoryRefs.current[previousCategory]!.offsetLeft +
                          categoryRefs.current[previousCategory]!.offsetWidth /
                            2
                        : 0,
                      y: 0,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: categoryRefs.current[activeCategory]
                        ? categoryRefs.current[activeCategory]!.offsetLeft +
                          categoryRefs.current[activeCategory]!.offsetWidth / 2
                        : 0,
                      y: [
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30,
                      ],
                      opacity: [0, 1, 0],
                      scale: [0, 1 + Math.random(), 0],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 0.6 + Math.random() * 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: Math.random() * 0.2,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {categories.map((category, index) => (
            <motion.button
              key={category}
              ref={(el) => (categoryRefs.current[category] = el)}
              onClick={() => handleCategoryChange(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-full"
                animate={{
                  backgroundColor:
                    category === activeCategory
                      ? "rgba(52, 211, 153, 0.2)"
                      : "rgba(39, 39, 42, 0.5)",
                  borderColor:
                    category === activeCategory
                      ? "rgba(52, 211, 153, 0.3)"
                      : "rgba(82, 82, 91, 0.5)",
                  scale: category === activeCategory ? 1 : 1,
                  boxShadow:
                    category === activeCategory
                      ? [
                          "0 0 0px rgba(52, 211, 153, 0)",
                          "0 0 15px rgba(52, 211, 153, 0.3)",
                          "0 0 5px rgba(52, 211, 153, 0.2)",
                        ]
                      : "none",
                }}
                style={{
                  border: "1px solid",
                }}
                transition={{
                  duration: 0.5,
                  boxShadow: {
                    duration: 2,
                    repeat: category === activeCategory ? Infinity : 0,
                    repeatType: "reverse",
                  },
                }}
              />

              <AnimatePresence>
                {category === activeCategory && isTransitioning && (
                  <motion.div
                    className="absolute inset-0 -z-5 rounded-full bg-green-300/30"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {hoveredCategory === category &&
                  category !== activeCategory && (
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full bg-green-300/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
              </AnimatePresence>

              <AnimatePresence>
                {category === activeCategory && (
                  <>
                    {[...Array(8)].map((_, i) => (
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
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: [0, (Math.random() - 0.5) * 20],
                          x: [0, (Math.random() - 0.5) * 20],
                          scale: [0, 1, 0],
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random(),
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              <motion.span
                animate={{
                  color: category === activeCategory ? "#86efac" : "#a1a1aa",
                  textShadow:
                    category === activeCategory
                      ? [
                          "0 0 8px rgba(134, 239, 172, 0.3)",
                          "0 0 12px rgba(134, 239, 172, 0.5)",
                          "0 0 8px rgba(134, 239, 172, 0.3)",
                        ]
                      : "none",
                  scale: category === activeCategory ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  scale: {
                    duration: 2,
                    repeat: category === activeCategory ? Infinity : 0,
                    repeatType: "reverse",
                  },
                  textShadow: {
                    duration: 2,
                    repeat: category === activeCategory ? Infinity : 0,
                    repeatType: "reverse",
                  },
                }}
              >
                {category}
              </motion.span>

              <AnimatePresence>
                {category === activeCategory && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={`dot-${i}`}
                        className="w-1 h-1 rounded-full bg-green-400/50"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`projects-${activeCategory}`}
              initial={{
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -20,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCards activeCategory={activeCategory} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`transition-ray-${i}`}
                    className="absolute bg-green-300/30"
                    style={{
                      width: `${Math.random() * 1 + 0.5}px`,
                      height: `${Math.random() * 100 + 50}px`,
                      left: `${Math.random() * 100}%`,
                      top: `-${Math.random() * 20}px`,
                      transformOrigin: "bottom",
                      filter: "blur(0.5px)",
                    }}
                    initial={{
                      opacity: 0,
                      scaleY: 0,
                      rotate: Math.random() * 20 - 10,
                    }}
                    animate={{
                      opacity: [0, 0.7, 0],
                      scaleY: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      delay: Math.random() * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
