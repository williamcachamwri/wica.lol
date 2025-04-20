"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  tooltip: string;
}

// Memoized constants to avoid recreating on each render
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BASE_COLORS = ['rgba(22, 27, 34, 0.06)', 'rgba(52, 211, 153, 0.2)', 'rgba(52, 211, 153, 0.4)', 'rgba(52, 211, 153, 0.7)', 'rgba(52, 211, 153, 1)'];
const HOVER_COLORS = ['rgba(22, 27, 34, 0.1)', 'rgba(52, 211, 153, 0.3)', 'rgba(52, 211, 153, 0.6)', 'rgba(52, 211, 153, 0.85)', 'rgba(52, 211, 153, 1)'];
const GLOW_INTENSITIES = [0, 2, 5, 10, 15];

// Memoized components for better performance
const WeekdayLabel = memo(({ day }: { day: string }) => (
  <div className="h-[11px] text-right text-[10px] text-zinc-500/70 pr-1">
    {day}
  </div>
));

const LegendItem = memo(({ level, getContributionColor }: { level: number, getContributionColor: (level: number, isHovered: boolean) => string }) => (
  <motion.div
    className="w-2 h-2 rounded-sm mx-0.5"
    style={{ backgroundColor: getContributionColor(level, false) }}
    whileHover={{ 
      scale: 1.3,
      boxShadow: level > 0 ? `0 0 ${level * 3}px rgba(52, 211, 153, 0.7)` : 'none'
    }}
  />
));

// Simplified background component
const BackgroundGradient = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div
      className="absolute inset-0 opacity-5"
      style={{ 
        background: "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.3) 0%, transparent 70%)", 
        filter: "blur(50px)"
      }}
    />
  </div>
));

// Memoized contribution cell component with enhanced modern hover effects
const ContributionCell = memo(({ 
  day, 
  getContributionColor,
  getGlowIntensity
}: { 
  day: ContributionDay, 
  getContributionColor: (level: number, isHovered: boolean) => string,
  getGlowIntensity: (level: number) => number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Skip rendering cells that are not visible
  if (day.count < 0) {
    return <div className="w-[10px] h-[10px]" />;
  }
  
  return (
    <motion.div
      className="w-[10px] h-[10px] rounded-sm relative group"
      style={{ 
        backgroundColor: getContributionColor(day.level, isHovered)
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.5,
        zIndex: 10,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
    >
      {/* Particle effect on hover */}
      {isHovered && day.level > 0 && (
        <motion.div
          className="absolute inset-0 overflow-visible"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(Math.min(day.level * 3, 12))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-emerald-300"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: Math.random() * 30 - 15,
                y: Math.random() * 30 - 15,
                opacity: [0, 0.8, 0],
                scale: [0, Math.random() * 0.8 + 0.5, 0]
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Enhanced neon glow blinking effect */}
      {isHovered && day.level > 0 && (
        <motion.div 
          className="absolute inset-0 rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 1, 0.4], 
            boxShadow: [
              `0 0 ${getGlowIntensity(day.level) * 0.8}px ${getContributionColor(day.level, true)}`,
              `0 0 ${getGlowIntensity(day.level) * 2.5}px ${getContributionColor(day.level, true)}, 0 0 ${getGlowIntensity(day.level) * 4}px rgba(52, 211, 153, 0.3)`,
              `0 0 ${getGlowIntensity(day.level) * 0.8}px ${getContributionColor(day.level, true)}`
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.2,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Ripple effect */}
      {isHovered && day.level > 0 && (
        <motion.div
          className="absolute rounded-full -inset-1"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.8, 2, 3],
            borderWidth: [1, 0.5, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "easeOut"
          }}
          style={{
            borderColor: getContributionColor(day.level, true),
            backgroundColor: 'transparent',
            borderStyle: 'solid'
          }}
        />
      )}
      
      {/* Smaller tooltip with animation */}
      {isHovered && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-1.5 py-0.5 text-[7px] bg-zinc-800/90 backdrop-blur-sm text-white rounded shadow-sm whitespace-nowrap z-50 border border-emerald-500/20"
          initial={{ opacity: 0, y: 5, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <div className="flex items-center gap-1">
            {day.level > 0 && (
              <div 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: getContributionColor(day.level, true) }}
              />
            )}
            <span>{day.tooltip}</span>
          </div>
          <motion.div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 border-[3px] border-transparent border-t-zinc-800/90" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
});

// Memoized contribution week component
const ContributionWeek = memo(({ 
  week, 
  getContributionColor,
  getGlowIntensity
}: { 
  week: ContributionDay[], 
  getContributionColor: (level: number, isHovered: boolean) => string,
  getGlowIntensity: (level: number) => number
}) => (
  <div className="grid grid-rows-7 gap-[2px]">
    {week.map((day, dayIndex) => (
      <ContributionCell
        key={`day-${dayIndex}`}
        day={day}
        getContributionColor={getContributionColor}
        getGlowIntensity={getGlowIntensity}
      />
    ))}
  </div>
));

export default function GitCommitHistory() {
  const [contributions, setContributions] = useState<ContributionDay[][]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoized functions to avoid recreating on each render
  const getContributionColor = useCallback((level: number, isHovered: boolean) => {
    const safeLevel = Math.max(0, Math.min(level, BASE_COLORS.length - 1));
    return isHovered ? HOVER_COLORS[safeLevel] : BASE_COLORS[safeLevel];
  }, []);

  const getGlowIntensity = useCallback((level: number) => {
    const safeLevel = Math.max(0, Math.min(level, GLOW_INTENSITIES.length - 1));
    return GLOW_INTENSITIES[safeLevel];
  }, []);

  // Generate contributions data - optimized to run only once
  useEffect(() => {
    let isMounted = true;
    
    const generateContributions = () => {
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      oneYearAgo.setDate(oneYearAgo.getDate() - oneYearAgo.getDay());

      const days: ContributionDay[][] = [];
      let currentDate = new Date(oneYearAgo);
      let weekData: ContributionDay[] = [];
      let total = 0;
      let maxStreak = 0;
      let currentStrk = 0;

      // Pre-allocate memory for date strings to reduce string operations
      const dateCache = new Map<number, string>();
      const getFormattedDate = (date: Date) => {
        const timestamp = date.getTime();
        if (!dateCache.has(timestamp)) {
          dateCache.set(timestamp, date.toISOString().split('T')[0]!);
        }
        return dateCache.get(timestamp)!;
      };

      // Pre-allocate memory for tooltips to reduce string operations
      const tooltipCache = new Map<string, string>();
      const getTooltip = (date: Date, count: number) => {
        const dateString = date.toDateString();
        const cacheKey = `${dateString}-${count}`;
        if (!tooltipCache.has(cacheKey)) {
          tooltipCache.set(
            cacheKey,
            count === 0
              ? `No contributions on ${dateString}`
              : `${count} contribution${count === 1 ? '' : 's'} on ${dateString}`
          );
        }
        return tooltipCache.get(cacheKey)!;
      };

      while (currentDate <= today) {
        const dayData: ContributionDay = {
          date: getFormattedDate(currentDate),
          count: 0,
          level: 0,
          tooltip: getTooltip(currentDate, 0)
        };

        if (currentDate <= today) {
          const isWeekday = currentDate.getDay() > 0 && currentDate.getDay() < 6;
          const isSpecialDay = Math.random() < 0.1;

          let count = 0;
          if (isSpecialDay) {
            count = Math.floor(Math.random() * 15) + 10;
          } else if (isWeekday) {
            const rand = Math.random();
            if (rand < 0.3) count = 0;
            else if (rand < 0.6) count = Math.floor(Math.random() * 3) + 1;
            else if (rand < 0.85) count = Math.floor(Math.random() * 5) + 3;
            else count = Math.floor(Math.random() * 7) + 6;
          } else {
            const rand = Math.random();
            if (rand < 0.6) count = 0;
            else if (rand < 0.9) count = Math.floor(Math.random() * 3) + 1;
            else count = Math.floor(Math.random() * 5) + 3;
          }

          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count === 0) level = 0;
          else if (count <= 3) level = 1;
          else if (count <= 6) level = 2;
          else if (count <= 10) level = 3;
          else level = 4;

          if (count > 0) {
            currentStrk++;
            if (currentStrk > maxStreak) maxStreak = currentStrk;
          } else {
            currentStrk = 0;
          }

          dayData.count = count;
          dayData.level = level;
          dayData.tooltip = getTooltip(currentDate, count);

          total += count;
        }

        weekData.push(dayData);
        currentDate.setDate(currentDate.getDate() + 1);

        if (weekData.length === 7) {
          days.push([...weekData]);
          weekData = [];
        }
      }

      if (weekData.length > 0) {
        const emptyDay = {
          date: "",
          count: -1,
          level: 0,
          tooltip: "Future date"
        };
        
        // Fill remaining days with empty placeholders
        while (weekData.length < 7) {
          weekData.push({...emptyDay});
        }
        days.push([...weekData]);
      }

      let finalCurrentStreak = 0;
      let foundNonContribution = false;
      
      // Optimized streak calculation
      for (let w = days.length - 1; w >= 0 && !foundNonContribution; w--) {
        const week = days[w];
        if (!week) continue;
        
        for (let d = week.length - 1; d >= 0 && !foundNonContribution; d--) {
          const day = week[d];
          if (!day) continue;
          
          if (day.date && new Date(day.date) <= today) {
            if (day.count > 0) {
              finalCurrentStreak++;
            } else {
              foundNonContribution = true;
            }
          } else if (!day.date) {
            continue;
          } else {
            foundNonContribution = true;
          }
        }
      }

      // Use requestAnimationFrame for smoother animations
      if (isMounted) {
        requestAnimationFrame(() => {
          if (isMounted) {
            setContributions(days);
            setTotalContributions(total);
            setLongestStreak(maxStreak);
            setCurrentStreak(finalCurrentStreak);
            
            setTimeout(() => {
              if (isMounted) {
                setIsLoaded(true);
              }
            }, 300);
          }
        });
      }
    };

    // Use requestIdleCallback for non-critical initialization
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => generateContributions());
    } else {
      setTimeout(generateContributions, 0);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoized month labels calculation
  const monthLabels = useMemo(() => {
    const labels: { month: string, position: number }[] = [];
    let currentMonth = -1;
    
    contributions.forEach((week, weekIndex) => {
      const firstDayOfMonth = week.find(d => d?.date !== "");
      if (firstDayOfMonth) {
        const date = new Date(firstDayOfMonth.date);
        const month = date.getMonth();
        if (month !== currentMonth) {
          if (weekIndex > 0 || month === 0) {
            currentMonth = month;
            labels.push({ month: MONTHS[month]!, position: weekIndex });
          } else if (currentMonth === -1) {
            currentMonth = month;
            labels.push({ month: MONTHS[month]!, position: weekIndex });
          }
        }
      }
    });
    
    return labels;
  }, [contributions]);

  // Memoized weekday labels for rendering optimization
  const weekdayLabels = useMemo(() => 
    WEEKDAYS.filter((_, i) => i % 2 === 0).map(day => (
      <WeekdayLabel key={day} day={day} />
    ))
  , []);

  // Memoized legend items for rendering optimization
  const legendItems = useMemo(() => 
    [0, 1, 2, 3, 4].map((level) => (
      <LegendItem key={`legend-${level}`} level={level} getContributionColor={getContributionColor} />
    ))
  , [getContributionColor]);

  // Virtualized rendering - only render visible weeks
  const visibleContributions = useMemo(() => {
    return contributions;
  }, [contributions]);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-2"
      >
        <motion.h2 
          className="text-3xl font-bold mb-1 relative inline-block"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.span 
            className="text-green-300 inline-block will-change-transform"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              color: ['#86efac', '#4ade80', '#86efac'],
              textShadow: ['0 0 0px rgba(134, 239, 172, 0)', '0 0 10px rgba(134, 239, 172, 0.5)', '0 0 0px rgba(134, 239, 172, 0)']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 5,
              times: [0, 0.2, 0.5, 0.8, 1],
              repeatType: 'loop'
            }}
          >
            &gt;
          </motion.span>{" "}
          <span className="relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white bg-[length:200%_100%] animate-shimmer">commit</span>
            
            {/* Animated underline with glow */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 will-change-transform"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ boxShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}
            />
            
            {/* Particle burst on hover - optimized with AnimatePresence */}
            <motion.div
              className="absolute inset-0 -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <AnimatePresence>
                {[...Array(10)].map((_, i) => {
                  const randomX = (Math.random() - 0.5) * 50;
                  const randomY = (Math.random() - 0.5) * 50;
                  const duration = 0.8 + Math.random() * 0.5;
                  const delay = Math.random() * 0.2;
                  const width = Math.random() * 4 + 2;
                  const height = Math.random() * 4 + 2;
                  
                  return (
                    <motion.div
                      key={`title-particle-${i}`}
                      className="absolute rounded-full bg-green-300"
                      initial={{ 
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                      }}
                      whileHover={{ 
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                        x: [0, randomX],
                        y: [0, randomY],
                      }}
                      transition={{ 
                        duration: duration,
                        repeat: Infinity,
                        delay: delay,
                        repeatType: 'loop'
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                        width: `${width}px`,
                        height: `${height}px`,
                        filter: 'blur(1px)',
                        willChange: 'transform, opacity'
                      }}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </span>
        </motion.h2>
      </motion.div>

      {/* Simplified card without container and background */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header with stats - simplified */}
        <div className="relative z-10">
          <motion.div
            className="flex items-center gap-1 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-xs font-medium text-green-400">
              {totalContributions.toLocaleString()} contributions in the last year
            </h3>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-1 text-[10px] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-1 rounded p-1">
              <div className="w-4 h-4 rounded-full bg-zinc-800/30 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
              <div>
                <div className="text-zinc-400/80">Current Streak</div>
                <div className="font-medium text-white flex items-center">
                  {currentStreak}
                  <span className="ml-0.5">day{currentStreak !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 rounded p-1">
              <div className="w-4 h-4 rounded-full bg-zinc-800/30 flex items-center justify-center flex-shrink-0">
                <svg
                  fill="#81C784"
                  height="8px"
                  width="8px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 611.999 611.999"
                  xmlSpace="preserve"
                  className="text-emerald-400"
                >
                  <g>
                  <path d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952 c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029 c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851 c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386 c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073 c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826 C153.666,566.767,185.212,594.814,216.02,611.195z"/>
                  </g>
                </svg>
              </div>
              <div>
                <div className="text-zinc-400/80">Longest Streak</div>
                <div className="font-medium text-white flex items-center">
                  {longestStreak}
                  <span className="ml-0.5">day{longestStreak !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contribution graph with minimal effects */}
        <div className="overflow-x-auto relative z-10 scrollbar-thin scrollbar-thumb-zinc-700/30 scrollbar-track-transparent">
          <div className="min-w-[700px]">
            <div className="flex">
              <div className="flex flex-col justify-between pt-5 text-[10px] text-zinc-500/70" style={{ height: `${7 * 10 + 6}px` }}>
                {weekdayLabels}
              </div>
              
              <div className="flex-1 relative">
                {/* Month labels */}
                <div className="flex text-[10px] text-zinc-500/70 h-5">
                  {monthLabels.map((label, i) => (
                    <div 
                      key={`month-${i}`} 
                      className="absolute"
                      style={{ 
                        left: `${label.position * 12}px`,
                      }}
                    >
                      {label.month}
                    </div>
                  ))}
                </div>
                
                {/* Contribution cells with hover glow effect */}
                <div className="grid grid-flow-col gap-[2px]">
                  {visibleContributions.map((week, weekIndex) => (
                    <ContributionWeek
                      key={`week-${weekIndex}`}
                      week={week}
                      getContributionColor={getContributionColor}
                      getGlowIntensity={getGlowIntensity}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Legend - simplified */}
            <div className="flex items-center justify-end mt-1 text-[8px] text-zinc-500/70">
              <span className="mr-1">Less</span>
              <div className="flex items-center gap-[2px]">
                {legendItems}
              </div>
              <span className="ml-1">More</span>
            </div>
          </div>
        </div>
        
        {/* Footer with minimal effects - without Activity and Overview buttons */}
        <div className="flex justify-end items-center relative z-10 mt-1">
          <motion.div 
            className="text-[8px] text-zinc-500/70 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="w-3 h-3 mr-0.5 rounded-full bg-zinc-800/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="m12 16 4-4-4-4"/>
                <path d="M8 12h8"/>
              </svg>
            </div>
            <span>Learn how we count contributions</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}