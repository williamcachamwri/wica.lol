"use client";

import { useState, useMemo, useCallback, memo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// Định nghĩa interface cho kỹ năng
interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  logo: string;
  color: string;
  category: string;
}

// Hằng số màu sắc được tối ưu hóa để tránh tạo lại khi render
const SKILL_COLORS = {
  react: "#61dafb",
  typescript: "#3178c6",
  javascript: "#f7df1e",
  html: "#e34f26",
  css: "#1572b6",
  node: "#339933",
  python: "#3776ab",
  git: "#f05032",
  figma: "#f24e1e",
  tailwind: "#38b2ac",
  nextjs: "#ffffff",
  firebase: "#ffca28",
  mongodb: "#47a248",
  graphql: "#e10098",
  vue: "#42b883",
  angular: "#dd0031",
  aws: "#ff9900",
  docker: "#2496ed"
};

// Dữ liệu kỹ năng với logo thực
const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    level: 5,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: SKILL_COLORS.react,
    category: "Frontend"
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 4,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: SKILL_COLORS.typescript,
    category: "Languages"
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 5,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: SKILL_COLORS.javascript,
    category: "Languages"
  },
  {
    id: "html",
    name: "HTML5",
    level: 5,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: SKILL_COLORS.html,
    category: "Frontend"
  },
  {
    id: "css",
    name: "CSS3",
    level: 4,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: SKILL_COLORS.css,
    category: "Frontend"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    level: 4,
    logo: "https://www.svgrepo.com/show/374118/tailwind.svg",
    color: SKILL_COLORS.tailwind,
    category: "Frontend"
  },
  {
    id: "nextjs",
    name: "Next.js",
    level: 4,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: SKILL_COLORS.nextjs,
    category: "Frontend"
  },
  {
    id: "node",
    name: "Node.js",
    level: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: SKILL_COLORS.node,
    category: "Backend"
  },
  {
    id: "git",
    name: "Git",
    level: 4,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: SKILL_COLORS.git,
    category: "Tools"
  },
  {
    id: "figma",
    name: "Figma",
    level: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: SKILL_COLORS.figma,
    category: "Design"
  },
  {
    id: "firebase",
    name: "Firebase",
    level: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: SKILL_COLORS.firebase,
    category: "Backend"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    level: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: SKILL_COLORS.mongodb,
    category: "Backend"
  },
  {
    id: "vue",
    name: "Vue.js",
    level: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: SKILL_COLORS.vue,
    category: "Frontend"
  },
  {
    id: "docker",
    name: "Docker",
    level: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: SKILL_COLORS.docker,
    category: "DevOps"
  }
];

// Danh sách các danh mục kỹ năng
const categories = [...new Set(skills.map(skill => skill.category))];

// Component hiển thị mức độ kỹ năng được tối ưu hóa
const SkillLevel = memo(({ 
  level, 
  color, 
  isHovered 
}: { 
  level: number, 
  color: string,
  isHovered: boolean
}) => {
  // Tạo mảng các cấp độ
  const levels = useMemo(() => Array.from({ length: 5 }, (_, i) => i < level), [level]);
  
  return (
    <div className="flex space-x-1.5">
      {levels.map((filled, i) => (
        <motion.div
          key={`level-${i}`}
          className="w-2.5 h-8 rounded-full relative overflow-hidden"
          initial={{ height: 8 }}
          animate={{ 
            height: isHovered ? (filled ? 18 + (i * 3) : 8) : 8,
            backgroundColor: filled 
              ? isHovered ? color : `${color}80` 
              : 'rgba(63, 63, 70, 0.4)',
            opacity: filled ? 1 : 0.4,
            y: isHovered && filled ? [0, -3, 0] : 0
          }}
          transition={{ 
            height: { type: "spring", stiffness: 400, damping: 10 },
            y: { 
              duration: 0.5 + (i * 0.1), 
              repeat: isHovered ? Infinity : 0, 
              repeatType: "reverse" 
            }
          }}
          style={{
            boxShadow: isHovered && filled ? `0 0 12px ${color}80` : 'none'
          }}
        >
          {/* Hiệu ứng gradient bên trong thanh level */}
          {filled && isHovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                background: [
                  `linear-gradient(to top, ${color}50, ${color})`,
                  `linear-gradient(to top, ${color}, ${color}50)`,
                  `linear-gradient(to top, ${color}50, ${color})`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Hiệu ứng ánh sáng chạy qua */}
          {filled && isHovered && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, transparent, ${color}90, transparent, transparent)`,
                transform: "translateY(-100%)"
              }}
              animate={{ y: ["100%", "-100%"] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatDelay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
});

SkillLevel.displayName = 'SkillLevel';

// Component hiển thị một kỹ năng
const SkillItem = memo(({ 
  skill, 
  isHovered, 
  onHoverStart, 
  onHoverEnd,
  index
}: { 
  skill: Skill, 
  isHovered: boolean,
  onHoverStart: () => void,
  onHoverEnd: () => void,
  index: number
}) => {
  // Refs và motion values cho hiệu ứng từ tính
  const itemRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics cho chuyển động mượt mà
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  // Transforms cho hiệu ứng 3D
  const rotateX = useTransform(springY, [-50, 50], [10, -10]);
  const rotateY = useTransform(springX, [-50, 50], [-10, 10]);
  const glowX = useTransform(springX, [-50, 0, 50], ["-20px", "0px", "20px"]);
  const glowY = useTransform(springY, [-50, 0, 50], ["-20px", "0px", "20px"]);
  
  // Xử lý di chuyển chuột cho hiệu ứng từ tính
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!itemRef.current || !isHovered) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [isHovered, mouseX, mouseY]);
  
  // Reset vị trí khi chuột rời đi
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    onHoverEnd();
  }, [mouseX, mouseY, onHoverEnd]);
  
  // Tạo các hạt ngẫu nhiên
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 2
    }));
  }, []);
  
  return (
    <motion.div
      ref={itemRef}
      className="relative flex items-center justify-between rounded-xl p-5 backdrop-blur-sm group overflow-hidden"
      style={{ 
        backgroundColor: isHovered ? `${skill.color}10` : 'rgba(39, 39, 42, 0.3)',
        border: `1.5px solid ${isHovered ? skill.color : 'rgba(63, 63, 70, 0.3)'}`,
        boxShadow: isHovered ? `0 0 25px ${skill.color}30` : 'none',
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1 }
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Hiệu ứng hạt khi hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {particles.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full z-0 pointer-events-none"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                  top: "50%",
                  left: "50%"
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, Math.random() * 1 + 0.5, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: skill.color,
                  filter: 'blur(1px)',
                  boxShadow: `0 0 ${particle.size * 2}px ${skill.color}`
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hiệu ứng đường viền chuyển động */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-[1.5px]"
            style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
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
            className="absolute bottom-0 right-0 w-full h-[1.5px]"
            style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
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
            className="absolute left-0 top-0 h-full w-[1.5px]"
            style={{ background: `linear-gradient(180deg, transparent, ${skill.color}, transparent)` }}
            animate={{ 
              top: ["-100%", "100%"],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute right-0 bottom-0 h-full w-[1.5px]"
            style={{ background: `linear-gradient(180deg, transparent, ${skill.color}, transparent)` }}
            animate={{ 
              bottom: ["-100%", "100%"],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
      
      {/* Hiệu ứng glow theo chuột */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}30 0%, transparent 70%)`,
            filter: "blur(20px)",
            x: glowX,
            y: glowY
          }}
        />
      )}

      {/* Nội dung kỹ năng */}
      <div className="flex items-center space-x-4">
        <motion.div 
          className="flex items-center justify-center w-12 h-12 rounded-lg relative"
          style={{ 
            backgroundColor: isHovered ? `${skill.color}20` : 'rgba(39, 39, 42, 0.5)',
            boxShadow: isHovered ? `0 0 20px ${skill.color}40` : 'none',
            z: 10
          }}
          animate={isHovered ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
            z: [0, 30, 0]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {/* Logo kỹ năng */}
          <motion.div
            className="relative w-8 h-8"
            animate={isHovered ? {
              filter: [
                "drop-shadow(0 0 0px transparent)",
                `drop-shadow(0 0 8px ${skill.color})`,
                "drop-shadow(0 0 0px transparent)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >
            <Image 
              src={skill.logo} 
              alt={skill.name} 
              width={32} 
              height={32}
              className="object-contain"
              style={{ filter: skill.id === 'nextjs' ? 'invert(1)' : 'none' }}
            />
          </motion.div>
          
          {/* Hiệu ứng hào quang */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-lg -z-10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                background: `radial-gradient(circle, ${skill.color}50 0%, transparent 70%)`,
                filter: 'blur(8px)'
              }}
            />
          )}
        </motion.div>
        
        <div>
          <motion.h3 
            className="text-base font-medium mb-1"
            animate={{ 
              color: isHovered ? skill.color : '#fff',
              textShadow: isHovered ? `0 0 10px ${skill.color}50` : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            {skill.name}
          </motion.h3>
          
          {/* Hiển thị danh mục */}
          <motion.div
            className="text-xs font-light opacity-70"
            animate={{
              opacity: isHovered ? 0.9 : 0.7,
              color: isHovered ? skill.color : '#aaa'
            }}
          >
            {skill.category}
          </motion.div>
        </div>
      </div>
      
      {/* Hiển thị mức độ kỹ năng */}
      <SkillLevel level={skill.level} color={skill.color} isHovered={isHovered} />
    </motion.div>
  );
});

SkillItem.displayName = 'SkillItem';

// Component hiển thị danh mục kỹ năng
const CategorySection = memo(({ 
  category, 
  skills, 
  hoveredSkill, 
  onHoverStart, 
  onHoverEnd 
}: { 
  category: string, 
  skills: Skill[], 
  hoveredSkill: string | null,
  onHoverStart: (id: string) => void,
  onHoverEnd: () => void
}) => {
  return (
    <div className="mb-10">
      <motion.h2 
        className="text-xl font-semibold mb-4 text-white/90 relative inline-block"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white">{category}</span>
        <motion.span
          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ boxShadow: '0 1px 8px rgba(134, 239, 172, 0.4)' }}
        />
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills
          .filter(skill => skill.category === category)
          .map((skill, index) => (
            <SkillItem 
              key={skill.id}
              skill={skill}
              isHovered={hoveredSkill === skill.id}
              onHoverStart={() => onHoverStart(skill.id)}
              onHoverEnd={onHoverEnd}
              index={index}
            />
          ))}
      </div>
    </div>
  );
});

CategorySection.displayName = 'CategorySection';

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Theo dõi vị trí chuột cho hiệu ứng con trỏ vũ trụ
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Tối ưu hóa các hàm xử lý sự kiện
  const handleHoverStart = useCallback((id: string) => {
    setHoveredSkill(id);
    const skill = skills.find(s => s.id === id);
    if (skill) {
      setActiveCategory(skill.category);
    }
  }, []);
  
  const handleHoverEnd = useCallback(() => {
    setHoveredSkill(null);
  }, []);
  
  // Tối ưu hóa các biến thể animation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  }), []);
  
  // Tối ưu hóa animation tiêu đề
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
      ref={sectionRef}
      className="mb-16 text-white relative will-change-transform"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tiêu đề */}
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white bg-[length:200%_100%] animate-shimmer">skills</span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 will-change-transform"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ boxShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}
          />
        </span>
      </motion.h1>
      
      {/* Danh sách các danh mục kỹ năng */}
      <div className="mt-10">
        {categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            skills={skills}
            hoveredSkill={hoveredSkill}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        ))}
      </div>
    </motion.div>
  );
}