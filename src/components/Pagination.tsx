"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  basePath = "",
  onPageChange
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Không hiển thị pagination nếu chỉ có 1 trang
  if (totalPages <= 1) return null;

  // Xử lý khi click vào một trang
  const handlePageClick = useCallback((page: number, e: React.MouseEvent) => {
    if (onPageChange) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của Link
      onPageChange(page);
    }
  }, [onPageChange]);

  // Tạo URL cho trang
  const createPageUrl = useCallback((pageNumber: number) => {
    // Xác thực đầu vào
    if (typeof pageNumber !== 'number' || isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      return `${basePath || pathname}`; // Trả về URL hiện tại nếu tham số không hợp lệ
    }

    // Tạo một bản sao của searchParams hiện tại
    const params = new URLSearchParams(searchParams.toString());
    // Cập nhật hoặc thêm tham số page
    params.set('page', pageNumber.toString());
    
    // Tạo URL mới với tham số đã được làm sạch
    return `${basePath || pathname}?${params.toString()}`;
  }, [pathname, searchParams, basePath, totalPages]);

  // Tạo mảng các trang để hiển thị - memoized để tránh tính toán lại
  const pageNumbers = useMemo(() => {
    const result = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu, trang cuối và các trang xung quanh trang hiện tại
      if (currentPage <= 3) {
        // Nếu đang ở gần trang đầu
        for (let i = 1; i <= 4; i++) {
          result.push(i);
        }
        result.push("...");
        result.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Nếu đang ở gần trang cuối
        result.push(1);
        result.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          result.push(i);
        }
      } else {
        // Ở giữa
        result.push(1);
        result.push("...");
        result.push(currentPage - 1);
        result.push(currentPage);
        result.push(currentPage + 1);
        result.push("...");
        result.push(totalPages);
      }
    }
    
    return result;
  }, [currentPage, totalPages]);

  // Hiệu ứng particle tối ưu - chỉ hiển thị khi không có reduced motion
  const ParticleEffect = useCallback(({ isActive }: { isActive: boolean }) => {
    if (prefersReducedMotion || !isActive) return null;
    
    // Giảm số lượng hạt để tối ưu hiệu suất
    const particleCount = 4;
    
    return (
      <AnimatePresence>
        {isActive && (
          <>
            {[...Array(particleCount)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-green-300/70"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0.7,
                  scale: 0.5
                }}
                animate={{ 
                  x: [0, (Math.random() - 0.5) * 20], 
                  y: [0, (Math.random() - 0.5) * 20],
                  opacity: 0,
                  scale: [0.5, Math.random() * 0.3 + 0.3]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    );
  }, [prefersReducedMotion]);

  // Tối ưu hóa mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Tối ưu hóa hover handlers
  const handleMouseEnter = useCallback(() => setIsHoveringContainer(true), []);
  const handleMouseLeave = useCallback(() => setIsHoveringContainer(false), []);
  
  // Tối ưu hóa page hover handlers
  const createPageHoverHandler = useCallback((page: number | null) => () => {
    setHoveredPage(page);
  }, []);

  return (
    <nav 
      className="mt-16 mb-12 flex justify-center"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 backdrop-blur-md relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
      >
        {/* Animated background gradient - simplified for performance */}
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 -z-10 opacity-50"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(39, 39, 42, 0.5) 0%, rgba(24, 24, 27, 0.5) 100%)",
                "linear-gradient(225deg, rgba(39, 39, 42, 0.5) 0%, rgba(24, 24, 27, 0.5) 100%)",
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          />
        )}

        {/* Animated border - only when not using reduced motion */}
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 rounded-xl -z-5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHoveringContainer ? 1 : 0,
              boxShadow: isHoveringContainer 
                ? "inset 0 0 0 1px rgba(74, 222, 128, 0.2)" 
                : "inset 0 0 0 1px rgba(74, 222, 128, 0)"
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Glow effect for container - only when not using reduced motion */}
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 rounded-xl -z-10"
            animate={{
              boxShadow: hoveredPage !== null 
                ? "0 0 20px rgba(52, 211, 153, 0.15), inset 0 0 15px rgba(52, 211, 153, 0.08)" 
                : "0 0 0px rgba(0, 0, 0, 0)"
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Mouse follow glow effect - simplified and only when not using reduced motion */}
        {isHoveringContainer && !prefersReducedMotion && (
          <motion.div 
            className="absolute w-32 h-32 rounded-full -z-5 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0) 70%)",
              left: mousePosition.x - 64,
              top: mousePosition.y - 64,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Previous button */}
        {currentPage > 1 && (
          <Link 
            href={onPageChange ? "#" : createPageUrl(currentPage - 1)}
            onClick={(e) => onPageChange && handlePageClick(currentPage - 1, e)}
            className="relative group"
            onMouseEnter={createPageHoverHandler(-1)}
            onMouseLeave={createPageHoverHandler(null)}
            aria-label="Previous page"
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-lg text-zinc-400 transition-all duration-300 relative overflow-hidden"
              whileHover={{ 
                color: "#4ade80", 
                scale: prefersReducedMotion ? 1 : 1.1,
                y: prefersReducedMotion ? 0 : -2
              }}
              whileTap={{ scale: 0.95, y: 0 }}
            >
              {/* Particle effect */}
              <ParticleEffect isActive={hoveredPage === -1} />
              
              {/* Hover background effect */}
              <motion.div 
                className="absolute inset-0 rounded-lg bg-zinc-800/0"
                animate={{ 
                  backgroundColor: hoveredPage === -1 ? "rgba(39, 39, 42, 0.7)" : "rgba(39, 39, 42, 0)",
                  scale: hoveredPage === -1 ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Glow ring - simplified */}
              {hoveredPage === -1 && !prefersReducedMotion && (
                <motion.div 
                  className="absolute inset-0 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    boxShadow: "0 0 10px rgba(74, 222, 128, 0.3), inset 0 0 5px rgba(74, 222, 128, 0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 relative z-10" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                animate={{ 
                  x: hoveredPage === -1 && !prefersReducedMotion ? [-3, 0] : 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  duration: 0.3
                }}
              >
                <path 
                  fillRule="evenodd" 
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </motion.svg>
              
              {/* Text label on hover - simplified */}
              {hoveredPage === -1 && !prefersReducedMotion && (
                <motion.span
                  className="absolute text-xs font-medium text-green-300 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 18 }}
                  transition={{ duration: 0.2 }}
                >
                  Previous
                </motion.span>
              )}
            </motion.div>
          </Link>
        )}
        
        {/* Page numbers */}
        <div className="flex items-center space-x-2">
          {pageNumbers.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <motion.span 
                  className="w-8 h-8 flex items-center justify-center text-zinc-500 text-sm"
                  animate={prefersReducedMotion ? {} : {
                    y: [0, -1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  •••
                </motion.span>
              ) : (
                <Link 
                  href={onPageChange ? "#" : createPageUrl(page as number)}
                  onClick={(e) => onPageChange && handlePageClick(page as number, e)}
                  onMouseEnter={createPageHoverHandler(page as number)}
                  onMouseLeave={createPageHoverHandler(null)}
                  className="relative"
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  <motion.div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                      currentPage === page
                        ? "text-green-300"
                        : "text-zinc-400"
                    }`}
                    whileHover={{ 
                      color: "#4ade80", 
                      scale: prefersReducedMotion ? 1 : 1.1,
                      y: prefersReducedMotion ? 0 : -2
                    }}
                    whileTap={{ scale: 0.95, y: 0 }}
                  >
                    {/* Particle effect */}
                    <ParticleEffect isActive={hoveredPage === page} />
                    
                    {/* Active page background - simplified */}
                    {currentPage === page && !prefersReducedMotion && (
                      <motion.div 
                        className="absolute inset-0 rounded-lg bg-green-500/20"
                        animate={{ 
                          boxShadow: "0 0 10px rgba(74, 222, 128, 0.3), inset 0 0 5px rgba(74, 222, 128, 0.2)",
                        }}
                      />
                    )}
                    
                    {/* Hover background effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-lg bg-zinc-800/0"
                      animate={{ 
                        backgroundColor: hoveredPage === page ? "rgba(39, 39, 42, 0.7)" : "rgba(39, 39, 42, 0)",
                        scale: hoveredPage === page ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Glow ring - simplified */}
                    {hoveredPage === page && !prefersReducedMotion && (
                      <motion.div 
                        className="absolute inset-0 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          boxShadow: "0 0 10px rgba(74, 222, 128, 0.3), inset 0 0 5px rgba(74, 222, 128, 0.2)"
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    {/* Number */}
                    <span className="relative z-10">
                      {page}
                    </span>
                  </motion.div>
                </Link>
              )}
            </div>
          ))}
        </div>
        
        {/* Next button */}
        {currentPage < totalPages && (
          <Link 
            href={onPageChange ? "#" : createPageUrl(currentPage + 1)}
            onClick={(e) => onPageChange && handlePageClick(currentPage + 1, e)}
            className="relative group"
            onMouseEnter={createPageHoverHandler(-2)}
            onMouseLeave={createPageHoverHandler(null)}
            aria-label="Next page"
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-lg text-zinc-400 transition-all duration-300 relative overflow-hidden"
              whileHover={{ 
                color: "#4ade80", 
                scale: prefersReducedMotion ? 1 : 1.1,
                y: prefersReducedMotion ? 0 : -2
              }}
              whileTap={{ scale: 0.95, y: 0 }}
            >
              {/* Particle effect */}
              <ParticleEffect isActive={hoveredPage === -2} />
              
              {/* Hover background effect */}
              <motion.div 
                className="absolute inset-0 rounded-lg bg-zinc-800/0"
                animate={{ 
                  backgroundColor: hoveredPage === -2 ? "rgba(39, 39, 42, 0.7)" : "rgba(39, 39, 42, 0)",
                  scale: hoveredPage === -2 ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Glow ring - simplified */}
              {hoveredPage === -2 && !prefersReducedMotion && (
                <motion.div 
                  className="absolute inset-0 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    boxShadow: "0 0 10px rgba(74, 222, 128, 0.3), inset 0 0 5px rgba(74, 222, 128, 0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 relative z-10" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                animate={{ 
                  x: hoveredPage === -2 && !prefersReducedMotion ? [3, 0] : 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  duration: 0.3
                }}
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </motion.svg>
              
              {/* Text label on hover - simplified */}
              {hoveredPage === -2 && !prefersReducedMotion && (
                <motion.span
                  className="absolute text-xs font-medium text-green-300 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 18 }}
                  transition={{ duration: 0.2 }}
                >
                  Next
                </motion.span>
              )}
            </motion.div>
          </Link>
        )}
      </motion.div>
    </nav>
  );
}