"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const getPhotos = () => {

  
  return [
    {
      id: "photo1",
      src: "/photos/photo_1.jpg",
      alt: "Photo 1",
      category: "Landscape",
      date: "2023-01-01"
    },
    {
      id: "photo2",
      src: "/photos/photo_2.jpg",
      alt: "Photo 2",
      category: "Street",
      date: "2023-01-05"
    },
    {
      id: "photo3",
      src: "/photos/photo_3.jpg",
      alt: "Photo 3",
      category: "Portrait",
      date: "2023-01-10"
    },
    {
      id: "photo4",
      src: "/photos/photo_4.jpg",
      alt: "Photo 4",
      category: "Architecture",
      date: "2023-01-15"
    },
    {
      id: "photo5",
      src: "/photos/photo_5.jpg",
      alt: "Photo 5",
      category: "Nature",
      date: "2023-01-20"
    },
    {
      id: "photo6",
      src: "/photos/photo_6.jpg",
      alt: "Photo 6",
      category: "Urban",
      date: "2023-01-25"
    },
    {
      id: "photo7",
      src: "/photos/photo_7.jpg",
      alt: "Photo 7",
      category: "Travel",
      date: "2023-02-01"
    },
    {
      id: "photo8",
      src: "/photos/photo_8.jpg",
      alt: "Photo 8",
      category: "Street",
      date: "2023-02-05"
    },
    {
      id: "photo9",
      src: "/photos/photo_9.jpg",
      alt: "Photo 9",
      category: "Portrait",
      date: "2023-02-10"
    },
    {
      id: "photo10",
      src: "/photos/photo_10.jpg",
      alt: "Photo 10",
      category: "Landscape",
      date: "2023-02-15"
    },
    {
      id: "photo11",
      src: "/photos/photo_11.jpg",
      alt: "Photo 11",
      category: "Nature",
      date: "2023-02-20"
    },
    {
      id: "photo12",
      src: "/photos/photo_12.jpg",
      alt: "Photo 12",
      category: "Urban",
      date: "2023-02-25"
    },
    {
      id: "photo13",
      src: "/photos/photo_13.jpg",
      alt: "Photo 13",
      category: "Travel",
      date: "2023-03-01"
    },
    {
      id: "photo14",
      src: "/photos/photo_14.jpg",
      alt: "Photo 14",
      category: "Architecture",
      date: "2023-03-05"
    },
    {
      id: "photo15",
      src: "/photos/photo_15.jpg",
      alt: "Photo 15",
      category: "Street",
      date: "2023-03-10"
    },
    {
      id: "photo16",
      src: "/photos/photo_16.jpg",
      alt: "Photo 16",
      category: "Portrait",
      date: "2023-03-15"
    },
    {
      id: "photo17",
      src: "/photos/photo_17.jpg",
      alt: "Photo 17",
      category: "Landscape",
      date: "2023-03-20"
    },
    {
      id: "photo18",
      src: "/photos/photo_18.jpg",
      alt: "Photo 18",
      category: "Nature",
      date: "2023-03-25"
    },
    {
      id: "photo19",
      src: "/photos/photo_19.jpg",
      alt: "Photo 19",
      category: "Urban",
      date: "2023-04-01"
    },
    {
      id: "photo20",
      src: "/photos/photo_20.jpg",
      alt: "Photo 20",
      category: "Travel",
      date: "2023-04-05"
    },
    {
      id: "photo21",
      src: "/photos/photo_21.jpg",
      alt: "Photo 21",
      category: "Architecture",
      date: "2023-04-10"
    },
    {
      id: "photo22",
      src: "/photos/photo_22.jpg",
      alt: "Photo 22",
      category: "Street",
      date: "2023-04-15"
    },
    {
      id: "photo23",
      src: "/photos/photo_23.jpg",
      alt: "Photo 23",
      category: "Portrait",
      date: "2023-04-20"
    },
    {
      id: "photo24",
      src: "/photos/photo_24.jpg",
      alt: "Photo 24",
      category: "Landscape",
      date: "2023-04-25"
    },
    {
      id: "photo25",
      src: "/photos/photo_25.jpg",
      alt: "Photo 25",
      category: "Nature",
      date: "2023-05-01"
    },
    {
      id: "photo26",
      src: "/photos/photo_26.jpg",
      alt: "Photo 26",
      category: "Urban",
      date: "2023-05-05"
    },
    {
      id: "photo27",
      src: "/photos/photo_27.jpg",
      alt: "Photo 27",
      category: "Travel",
      date: "2023-05-10"
    },
    {
      id: "photo28",
      src: "/photos/photo_28.jpg",
      alt: "Photo 28",
      category: "Architecture",
      date: "2023-05-15"
    },
    {
      id: "photo29",
      src: "/photos/photo_29.jpg",
      alt: "Photo 29",
      category: "Street",
      date: "2023-05-20"
    },
    {
      id: "photo30",
      src: "/photos/photo_30.jpg",
      alt: "Photo 30",
      category: "Portrait",
      date: "2023-05-25"
    },
    {
      id: "photo31",
      src: "/photos/photo_31.jpg",
      alt: "Photo 31",
      category: "Landscape",
      date: "2023-06-01"
    },
    {
      id: "photo32",
      src: "/photos/photo_32.jpg",
      alt: "Photo 32",
      category: "Nature",
      date: "2023-06-05"
    },
    {
      id: "photo33",
      src: "/photos/photo_33.jpg",
      alt: "Photo 33",
      category: "Urban",
      date: "2023-06-10"
    },
    {
      id: "photo34",
      src: "/photos/photo_34.jpg",
      alt: "Photo 34",
      category: "Travel",
      date: "2023-06-15"
    },
    {
      id: "photo35",
      src: "/photos/photo_35.jpg",
      alt: "Photo 35",
      category: "Architecture",
      date: "2023-06-20"
    },
    {
      id: "photo36",
      src: "/photos/photo_36.jpg",
      alt: "Photo 36",
      category: "Street",
      date: "2023-06-25"
    },
    {
      id: "photo37",
      src: "/photos/photo_37.jpg",
      alt: "Photo 37",
      category: "Portrait",
      date: "2023-07-01"
    },
    {
      id: "photo38",
      src: "/photos/photo_38.jpg",
      alt: "Photo 38",
      category: "Landscape",
      date: "2023-07-05"
    },
    {
      id: "photo39",
      src: "/photos/photo_39.jpg",
      alt: "Photo 39",
      category: "Nature",
      date: "2023-07-10"
    },
    {
      id: "photo40",
      src: "/photos/photo_40.jpg",
      alt: "Photo 40",
      category: "Urban",
      date: "2023-07-15"
    },
    {
      id: "photo41",
      src: "/photos/photo_41.jpg",
      alt: "Photo 41",
      category: "Travel",
      date: "2023-07-20"
    },
    {
      id: "photo42",
      src: "/photos/photo_42.jpg",
      alt: "Photo 42",
      category: "Architecture",
      date: "2023-07-25"
    },
    {
      id: "photo43",
      src: "/photos/photo_43.jpg",
      alt: "Photo 43",
      category: "Street",
      date: "2023-08-01"
    },
    {
      id: "photo44",
      src: "/photos/photo_44.jpg",
      alt: "Photo 44",
      category: "Portrait",
      date: "2023-08-05"
    },
    {
      id: "photo45",
      src: "/photos/photo_45.jpg",
      alt: "Photo 45",
      category: "Landscape",
      date: "2023-08-10"
    }
  ];
};

// Hàm định dạng ngày tháng theo dd/mm/yyyy
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export default function PhotosClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<{[key: string]: boolean}>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Memoize danh sách ảnh để tránh tạo lại mỗi lần render
  const photos = useMemo(() => getPhotos(), []);
  
  // Lấy danh sách danh mục từ ảnh
  const categories = useMemo(() => 
    ["All", ...Array.from(new Set(photos.map(photo => photo.category)))], 
    [photos]
  );
  
  // Lọc ảnh theo danh mục
  const filteredPhotos = useMemo(() => 
    activeCategory === "All" 
      ? photos 
      : photos.filter(photo => photo.category === activeCategory),
    [activeCategory, photos]
  );
  
  // Xử lý khi ảnh load xong
  const handleImageLoaded = useCallback((id: string) => {
    setIsLoaded(prev => ({...prev, [id]: true}));
  }, []);

  // Xử lý khi chuyển danh mục
  const handleCategoryChange = useCallback((category: string) => {
    if (category !== activeCategory) {
      setIsChangingCategory(true);
      setTimeout(() => {
        setActiveCategory(category);
        setTimeout(() => {
          setIsChangingCategory(false);
        }, 100);
      }, 300);
    }
  }, [activeCategory]);

  // Theo dõi vị trí chuột - sửa lỗi scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Chỉ cập nhật vị trí chuột khi người dùng thực sự di chuyển chuột
      // không phải khi scroll
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        
        // Lưu vị trí chuột trước đó
        const prevPosition = { ...mousePosition };
        const newPosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        
        // Chỉ cập nhật state nếu vị trí thay đổi đáng kể
        // Điều này giúp tránh re-render không cần thiết
        if (Math.abs(prevPosition.x - newPosition.x) > 5 || 
            Math.abs(prevPosition.y - newPosition.y) > 5) {
          setMousePosition(newPosition);
        }
      }
    };

    // Sử dụng throttle để giảm số lần gọi hàm handleMouseMove
    let throttleTimer: number | null = null;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttleTimer) {
        throttleTimer = window.setTimeout(() => {
          handleMouseMove(e);
          throttleTimer = null;
        }, 50); // Chỉ xử lý tối đa 20 lần/giây
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (throttleTimer) window.clearTimeout(throttleTimer);
    };
  }, [mousePosition]);

  // Ngăn chặn hiệu ứng scroll không mong muốn
  useEffect(() => {
    // Lưu vị trí scroll hiện tại
    let lastScrollPosition = window.scrollY;
    
    const handleScroll = () => {
      // Không thực hiện bất kỳ thao tác nào khi scroll
      // Chỉ cập nhật vị trí scroll cuối cùng
      lastScrollPosition = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main 
      ref={mainRef} 
      className="relative min-h-screen text-white p-8 md:p-16 lg:p-24 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Enhanced cosmic background elements */}
      <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        
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
          className="absolute bottom-0 right-0 w-1 h-full pointer-events-none"
          style={{
            background: "linear-gradient(to top, transparent, rgba(52, 211, 153, 0.2), transparent)",
          }}
          animate={{ 
            scaleY: [0, 1, 0],
            opacity: [0, 0.3, 0],
            y: ["100%", "0%", "-100%"]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-green-300/30 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5],
              y: [0, -Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Reactive glow effect that follows mouse - sửa để tránh reflow */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 -z-10"
          style={{
            background: "radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%)",
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
            filter: "blur(50px)",
            willChange: "transform", // Tối ưu hiệu suất
            transform: "translateZ(0)" // Kích hoạt GPU acceleration
          }}
        />
      </div>

      <div className="flex-1 relative z-10">
        {/* Enhanced header with animated styling */}
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
              photos
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
            My collection of photos, capturing special moments and interesting perspectives.
          </motion.p>
        </motion.div>

        {/* Danh mục với hiệu ứng chuyển đổi mượt mà */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeCategory === category 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800 hover:text-zinc-300'
              }`}
              onClick={() => handleCategoryChange(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {/* Hiệu ứng ripple khi click */}
              <motion.span
                className="absolute inset-0 bg-green-400/10 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Nội dung danh mục */}
              <span className="relative z-10">{category}</span>
              
              {/* Hiệu ứng highlight khi hover */}
              {hoveredCategory === category && (
                <motion.span
                  layoutId="categoryHighlight"
                  className="absolute inset-0 rounded-full bg-green-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Hiệu ứng glow khi active */}
              {activeCategory === category && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  initial={{ boxShadow: "0 0 0 rgba(52, 211, 153, 0)" }}
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(52, 211, 153, 0)", "0 0 10px rgba(52, 211, 153, 0.3)", "0 0 5px rgba(52, 211, 153, 0.2)"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Grid ảnh với hiệu ứng chuyển đổi danh mục mượt mà */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ 
              willChange: "transform", // Tối ưu hiệu suất
              transform: "translateZ(0)" // Kích hoạt GPU acceleration
            }}
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg group"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                    delay: index * 0.05 // Hiệu ứng stagger cho các ảnh
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  y: -20,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(52, 211, 153, 0.3)"
                }}
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
                layout
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  {/* Hiệu ứng shimmer khi đang load */}
                  {!isLoaded[photo.id] && (
                    <div className="absolute inset-0 bg-zinc-800 rounded-lg overflow-hidden">
                      <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.1), transparent)",
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          ease: "linear"
                        }}
                      />
                    </div>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: isLoaded[photo.id] ? 1 : 0,
                      scale: isLoaded[photo.id] ? 1 : 1.1,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover rounded-lg transition-all duration-700"
                      onLoad={() => handleImageLoaded(photo.id)}
                      priority={index < 9} // Ưu tiên 9 ảnh đầu tiên
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      loading={index < 9 ? "eager" : "lazy"}
                      style={{
                        transform: hoveredPhoto === photo.id ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)"
                      }}
                    />
                  </motion.div>
                  
                  {/* Overlay thông tin với hiệu ứng cải tiến */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredPhoto === photo.id ? 1 : 0,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex justify-between items-end">
                      <motion.span 
                        className="text-xs font-medium px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-green-300 border border-green-500/20"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: hoveredPhoto === photo.id ? 0 : 20, 
                          opacity: hoveredPhoto === photo.id ? 1 : 0 
                        }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {photo.category}
                      </motion.span>
                      <motion.span 
                        className="text-xs text-zinc-300 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: hoveredPhoto === photo.id ? 0 : 20, 
                          opacity: hoveredPhoto === photo.id ? 1 : 0 
                        }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        {formatDate(photo.date)}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Hiển thị thông báo khi không có ảnh nào trong danh mục */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <p className="text-zinc-400 text-center">Không có ảnh nào trong danh mục này</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}