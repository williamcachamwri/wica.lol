"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentlyPlaying } from "~/utils/spotify";

interface SpotifyTrack {
  item: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
    duration_ms: number;
  };
  is_playing: boolean;
  progress_ms: number;
}

export default function NowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [prevTrack, setPrevTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const fetchInterval = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Ultra-fast polling for real-time updates
  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const data = await getCurrentlyPlaying();
        
        if (data && (!track || data.item.id !== track.item.id)) {
          // Track changed, update previous track for transition
          if (track) setPrevTrack(track);
          setTrack(data);
          
          // Reset and start progress tracking
          setProgress(data.progress_ms / data.item.duration_ms);
          
          // Clear existing progress interval
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          
          // Start new progress tracking if playing
          if (data.is_playing) {
            progressInterval.current = setInterval(() => {
              setProgress(prev => {
                const newProgress = prev + (10 / data.item.duration_ms);
                return newProgress > 1 ? 1 : newProgress;
              });
            }, 10); // Update every 10ms for ultra-smooth progress
          }
        } else if (data && track && data.item.id === track.item.id) {
          // Same track, just update playing status and progress
          if (track.is_playing !== data.is_playing) {
            setTrack(data);
            
            // Handle play/pause
            if (data.is_playing) {
              setProgress(data.progress_ms / data.item.duration_ms);
              progressInterval.current = setInterval(() => {
                setProgress(prev => {
                  const newProgress = prev + (10 / data.item.duration_ms);
                  return newProgress > 1 ? 1 : newProgress;
                });
              }, 10);
            } else if (progressInterval.current) {
              clearInterval(progressInterval.current);
            }
          }
        } else if (!data && track) {
          // Stopped playing
          setPrevTrack(track);
          setTrack(null);
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
        }
        
        setError(false);
      } catch (err) {
        console.error("Failed to fetch now playing:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    // Initial fetch
    fetchNowPlaying();
    
    // Ultra-frequent polling for real-time updates
    fetchInterval.current = setInterval(fetchNowPlaying, 1000); // Poll every second
    
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (fetchInterval.current) clearInterval(fetchInterval.current);
    };
  }, [track]);

  // Enhanced loading state with cosmic animations
  if (loading && !track && !prevTrack) {
    return (
      <div className="flex flex-col items-center relative">
        {/* Cosmic background elements */}
        <motion.div 
          className="absolute -z-10 w-40 h-40 rounded-full bg-green-300/5 blur-[80px] opacity-50"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Enhanced header with animated underline */}
        <div className="relative mb-4">
          <motion.h3 
            className="text-green-300 text-sm font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NOW PLAYING
          </motion.h3>
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-[1px]"
            initial={{ width: 0, left: "50%" }}
            animate={{ width: "100%", left: "0%" }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              background: "linear-gradient(90deg, rgba(52, 211, 153, 0), rgba(52, 211, 153, 0.7), rgba(52, 211, 153, 0))"
            }}
          />
        </div>
        
        {/* Enhanced loading animation */}
        <motion.div 
          className="relative flex items-center justify-center h-16 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-1 relative">
            {/* Animated equalizer bars with glow effect */}
            {[...Array(7)].map((_, i) => {
              const baseHeight = [5, 10, 15, 20, 15, 10, 5][i];
              const delay = i * 0.1;
              
              return (
                <motion.div 
                  key={`eq-${i}`}
                  className="w-1 rounded-full bg-gradient-to-t from-green-300/30 to-green-300/80"
                  style={{ 
                    filter: "drop-shadow(0 0 3px rgba(52, 211, 153, 0.5))",
                  }}
                  animate={{ 
                    height: [
                      baseHeight,
                      baseHeight * 2,
                      baseHeight
                    ],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
            
            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(52, 211, 153, 0)",
                  "0 0 15px rgba(52, 211, 153, 0.3)",
                  "0 0 0px rgba(52, 211, 153, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Animated particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-green-300"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  filter: "blur(1px)",
                  boxShadow: "0 0 3px rgba(52, 211, 153, 0.5)",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0
                }}
                animate={{
                  x: (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 60,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Scanning text effect */}
          <motion.div
            className="absolute bottom-0 text-[10px] text-green-300/70 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            SCANNING SPOTIFY
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Enhanced error state with cosmic effects
  if (error && !track && !prevTrack) {
    return (
      <div className="flex flex-col items-center relative">
        {/* Cosmic background elements */}
        <motion.div 
          className="absolute -z-10 w-40 h-40 rounded-full bg-green-300/5 blur-[80px] opacity-50"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Enhanced header with animated underline */}
        <div className="relative mb-4">
          <motion.h3 
            className="text-green-300 text-sm font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NOW PLAYING
          </motion.h3>
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-[1px]"
            initial={{ width: 0, left: "50%" }}
            animate={{ width: "100%", left: "0%" }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              background: "linear-gradient(90deg, rgba(52, 211, 153, 0), rgba(52, 211, 153, 0.7), rgba(52, 211, 153, 0))"
            }}
          />
        </div>
        
        {/* Enhanced not playing state */}
        <motion.div 
          className="relative flex items-center justify-center h-16 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-3 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.03,
              borderColor: "rgba(52, 211, 153, 0.3)",
              backgroundColor: "rgba(52, 211, 153, 0.05)"
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Animated music note icon */}
            <motion.div
              className="text-green-300/70"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </motion.div>
            
            <div className="text-xs text-gray-400">
              {/* Animated text with character effects */}
              <div className="flex">
                {`Not playing anything right now`.split('').map((char, i) => (
                  <motion.span
                    key={`char-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.02) }}
                    whileHover={{ 
                      color: "#34d399",
                      y: -1
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Subtle pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 0px rgba(52, 211, 153, 0)",
                "0 0 15px rgba(52, 211, 153, 0.1)",
                "0 0 0px rgba(52, 211, 153, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Enhanced Spotify logo */}
        <motion.div 
          className="mt-3 opacity-50 flex items-center gap-1 text-[10px] text-gray-500"
          whileHover={{ opacity: 1, color: "#1DB954" }}
          transition={{ duration: 0.2 }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5576 16.6777C16.3638 16.9991 15.9055 17.1066 15.5841 16.9128C13.3539 15.5981 10.5356 15.3094 6.96163 16.1315C6.59093 16.2158 6.22175 15.9793 6.13744 15.6086C6.05313 15.2379 6.28809 14.8687 6.65879 14.7844C10.5655 13.8889 13.7155 14.2343 16.2225 15.7042C16.5439 15.898 16.6514 16.3563 16.5576 16.6777ZM17.7679 13.7346C17.5226 14.1329 17.0425 14.2665 16.6442 14.0212C14.0865 12.4933 10.1913 12.0889 6.85284 13.0762C6.40475 13.2089 5.93268 12.9579 5.79999 12.5098C5.66729 12.0617 5.91832 11.5897 6.36641 11.457C10.1512 10.3389 14.4758 10.7969 17.4813 12.6109C17.8796 12.8562 18.0132 13.3363 17.7679 13.7346ZM17.8641 10.7138C14.8126 8.95682 9.4462 8.76153 6.3809 9.76067C5.84816 9.91767 5.28365 9.61267 5.12665 9.07993C4.96965 8.54719 5.27465 7.98268 5.80739 7.82568C9.34763 6.68384 15.2854 6.91518 18.8389 8.96144C19.3249 9.24344 19.4784 9.86144 19.1964 10.3459C18.9144 10.8304 18.2979 10.9854 17.8134 10.7034L17.8641 10.7138Z"/>
          </svg>
          <span>SPOTIFY</span>
        </motion.div>
      </div>
    );
  }

  // Enhanced main component with cosmic effects
  return (
    <div className="flex flex-col items-center relative">
      {/* Cosmic background elements */}
      <motion.div 
        className="absolute -z-10 w-40 h-40 rounded-full bg-green-300/5 blur-[80px] opacity-50"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Animated particles */}
      {track && track.is_playing && [...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-green-300 z-0"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            filter: "blur(1px)",
            boxShadow: "0 0 3px rgba(52, 211, 153, 0.5)",
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Enhanced header with animated underline */}
      <div className="relative mb-4">
        <motion.h3 
          className="text-green-300 text-sm font-bold tracking-wider"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NOW PLAYING
        </motion.h3>
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-[1px]"
          initial={{ width: 0, left: "50%" }}
          animate={{ width: "100%", left: "0%" }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            background: "linear-gradient(90deg, rgba(52, 211, 153, 0), rgba(52, 211, 153, 0.7), rgba(52, 211, 153, 0))"
          }}
        />
      </div>
      
      {/* Enhanced player container with cosmic effects */}
      <div 
        className="relative h-20 w-full flex justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated light beams when playing */}
        {track && track.is_playing && (
          <>
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.5), transparent)",
                filter: "blur(1px)"
              }}
              animate={{
                opacity: [0, 0.5, 0],
                width: ['0%', '100%', '0%'],
                left: ['0%', '0%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(0deg, transparent, rgba(52, 211, 153, 0.5), transparent)",
                filter: "blur(1px)"
              }}
              animate={{
                opacity: [0, 0.5, 0],
                height: ['0%', '100%', '0%'],
                top: ['0%', '0%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 3,
                delay: 1,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        
        <AnimatePresence mode="sync">
          {/* Previous track (fading out) */}
          {prevTrack && !track && (
            <motion.a
              key={`prev-${prevTrack.item.id}`}
              href={prevTrack.item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 0, scale: 0.95, y: 10 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced album art with glow effect */}
              <motion.div 
                className="w-12 h-12 relative overflow-hidden rounded-md"
                style={{
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)"
                }}
              >
                {prevTrack.item.album.images[0] && (
                  <img 
                    src={prevTrack.item.album.images[0].url} 
                    alt={prevTrack.item.name}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Overlay with fade effect */}
                <motion.div
                  className="absolute inset-0 bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              
              {/* Track info with fade effect */}
              <div className="flex flex-col">
                <motion.div 
                  className="text-xs font-medium text-white/70"
                  animate={{ opacity: [1, 0.7] }}
                  transition={{ duration: 0.5 }}
                >
                  {prevTrack.item.name.length > 25 
                    ? `${prevTrack.item.name.substring(0, 25)}...` 
                    : prevTrack.item.name}
                </motion.div>
                <motion.div 
                  className="text-[10px] text-gray-400/70"
                  animate={{ opacity: [1, 0.5] }}
                  transition={{ duration: 0.5 }}
                >
                  {prevTrack.item.artists.map(a => a.name).join(", ")}
                </motion.div>
              </div>
            </motion.a>
          )}
          
          {/* Current track with enhanced effects */}
          {track && (
            <motion.a
              key={`current-${track.item.id}`}
              href={track.item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute flex items-center gap-4 p-3 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              whileHover={{ 
                scale: 1.03,
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced cosmic background for the player */}
              <motion.div
                className="absolute inset-0 rounded-lg -z-10 overflow-hidden"
                animate={{
                  backgroundColor: isHovered ? "rgba(52, 211, 153, 0.05)" : "rgba(24, 24, 27, 0.5)",
                  borderColor: isHovered ? "rgba(52, 211, 153, 0.3)" : "rgba(39, 39, 42, 0.5)"
                }}
                transition={{ duration: 0.3 }}
                style={{
                  border: "1px solid",
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: track.is_playing ? [
                      "radial-gradient(circle at 30% 40%, rgba(52, 211, 153, 0.1), transparent 70%)",
                      "radial-gradient(circle at 70% 60%, rgba(52, 211, 153, 0.1), transparent 70%)",
                      "radial-gradient(circle at 30% 40%, rgba(52, 211, 153, 0.1), transparent 70%)"
                    ] : "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.05), transparent 70%)"
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated border glow */}
                {isHovered && (
                  <motion.div 
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 rounded-lg p-[1px]">
                      <motion.div 
                        className="w-[500%] h-[500%] absolute -top-[200%] -left-[200%]"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                          background: 'conic-gradient(from 0deg, transparent, rgba(52, 211, 153, 0.3), rgba(16, 185, 129, 0.1), transparent)',
                          opacity: 0.5
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Enhanced album art with advanced effects */}
              <motion.div 
                className="w-12 h-12 relative overflow-hidden rounded-md"
                whileHover={{ scale: 1.1 }}
                animate={{
                  boxShadow: track.is_playing ? [
                    "0 0 10px rgba(0, 0, 0, 0.3)",
                    "0 0 20px rgba(52, 211, 153, 0.2)",
                    "0 0 10px rgba(0, 0, 0, 0.3)"
                  ] : "0 0 10px rgba(0, 0, 0, 0.3)"
                }}
                transition={{ 
                  duration: 2,
                  repeat: track.is_playing ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {/* Animated overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-300/20 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {track.item.album.images[0] && (
                  <motion.div
                    animate={{ 
                      filter: track.is_playing 
                        ? ["brightness(1)", "brightness(1.2)", "brightness(1)"] 
                        : "brightness(0.8)" 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: track.is_playing ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    <img 
                      src={track.item.album.images[0].url} 
                      alt={track.item.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                {/* Enhanced pulsing glow effect when playing */}
                {track.is_playing && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ 
                      boxShadow: [
                        "inset 0 0 0px rgba(52, 211, 153, 0)",
                        "inset 0 0 15px rgba(52, 211, 153, 0.5)",
                        "inset 0 0 0px rgba(52, 211, 153, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  animate={{
                    x: ['-100%', '200%'],
                    opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Track info with enhanced animations */}
            <div className="flex flex-col">
              {/* Track name with character-by-character animation */}
              <div className="overflow-hidden">
                <motion.div 
                  className="text-xs font-medium text-white"
                  animate={{ 
                    color: isHovered ? "#34d399" : "#ffffff",
                    textShadow: isHovered ? "0 0 8px rgba(52, 211, 153, 0.5)" : "none"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {track.item.name.split('').map((char, i) => (
                    <motion.span
                      key={`name-${i}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.5 + (i * 0.02),
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        y: -2,
                        color: "#34d399",
                        transition: { duration: 0.1 }
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              
              {/* Artist name with subtle animations */}
              <motion.div 
                className="text-[10px] text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {track.item.artists.map((artist, index) => (
                  <motion.span
                    key={`artist-${index}`}
                    className="inline-block"
                    whileHover={{ 
                      color: "#34d399",
                      scale: 1.05
                    }}
                  >
                    {index > 0 ? `, ${artist.name}` : artist.name}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Enhanced progress bar with cosmic effects */}
              <div className="mt-2 w-full relative h-1">
                {/* Progress bar background with animated gradient */}
                <motion.div 
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{
                    background: "rgba(39, 39, 42, 0.5)",
                  }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: "linear-gradient(90deg, rgba(52, 211, 153, 0) 0%, rgba(52, 211, 153, 0.1) 50%, rgba(52, 211, 153, 0) 100%)",
                      backgroundSize: "200% 100%"
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
                
                {/* Progress indicator with glow effect */}
                <motion.div 
                  className="absolute h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: track.is_playing
                      ? "linear-gradient(90deg, rgba(52, 211, 153, 0.7), rgba(52, 211, 153, 1))"
                      : "rgba(52, 211, 153, 0.5)",
                    boxShadow: track.is_playing
                      ? "0 0 10px rgba(52, 211, 153, 0.5)"
                      : "none"
                  }}
                />
                
                {track.is_playing && (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-white shadow-glow"
    style={{
      top: "calc(50% - 4px)", // 👈 Kéo lên 4px nè
      left: `calc(${progress * 100}% - 1px)`,
      transform: "translate(-50%, -50%)", // 👈 Dịch luôn x, y cho đẹp
    }}
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)}

              </div>
            </div>
            
            {/* Enhanced play/pause indicator with animations */}
            <motion.div 
              className="ml-2 relative w-6 h-6 flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: track.is_playing ? [0, 5, 0, -5, 0] : 0
              }}
              transition={{
                duration: 5,
                repeat: track.is_playing ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: track.is_playing
                    ? [
                        "0 0 0px rgba(52, 211, 153, 0)",
                        "0 0 10px rgba(52, 211, 153, 0.5)",
                        "0 0 0px rgba(52, 211, 153, 0)"
                      ]
                    : "none"
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Play/pause icon with morphing animation */}
              <AnimatePresence mode="wait">
                {track.is_playing ? (
                  <motion.svg
                    key="playing"
                    className="w-4 h-4 text-green-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor">
                      <animate
                        attributeName="height"
                        values="16;10;16"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="y"
                        values="4;7;4"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor">
                      <animate
                        attributeName="height"
                        values="16;10;16"
                        dur="1s"
                        begin="0.3"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="y"
                        values="4;7;4"
                        dur="1s"
                        begin="0.3"
                        repeatCount="indefinite"
                      />
                    </rect>
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="paused"
                    className="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.a>
        )}
        
        {/* Not playing state with enhanced effects */}
        {!track && !prevTrack && (
          <motion.div 
            className="flex items-center gap-3 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.03,
              borderColor: "rgba(52, 211, 153, 0.3)",
              backgroundColor: "rgba(52, 211, 153, 0.05)"
            }}
          >
            {/* Animated music note icon */}
            <motion.div
              className="text-green-300/70"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </motion.div>
            
            <div className="text-xs text-gray-400">
              {/* Animated text with character effects */}
              <div className="flex">
                {`Not playing anything right now`.split('').map((char, i) => (
                  <motion.span
                    key={`char-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.02) }}
                    whileHover={{ 
                      color: "#34d399",
                      y: -1
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    {/* Enhanced Spotify logo with hover effects */}
    <motion.a 
      href="https://open.spotify.com/user/31rvwbxlgn5qgxrxcw6jhatbxrsy"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 opacity-50 flex items-center gap-1 text-[10px] text-gray-500"
      whileHover={{ 
        opacity: 1, 
        color: "#1DB954",
        scale: 1.05
      }}
      transition={{ duration: 0.2 }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5576 16.6777C16.3638 16.9991 15.9055 17.1066 15.5841 16.9128C13.3539 15.5981 10.5356 15.3094 6.96163 16.1315C6.59093 16.2158 6.22175 15.9793 6.13744 15.6086C6.05313 15.2379 6.28809 14.8687 6.65879 14.7844C10.5655 13.8889 13.7155 14.2343 16.2225 15.7042C16.5439 15.898 16.6514 16.3563 16.5576 16.6777ZM17.7679 13.7346C17.5226 14.1329 17.0425 14.2665 16.6442 14.0212C14.0865 12.4933 10.1913 12.0889 6.85284 13.0762C6.40475 13.2089 5.93268 12.9579 5.79999 12.5098C5.66729 12.0617 5.91832 11.5897 6.36641 11.457C10.1512 10.3389 14.4758 10.7969 17.4813 12.6109C17.8796 12.8562 18.0132 13.3363 17.7679 13.7346ZM17.8641 10.7138C14.8126 8.95682 9.4462 8.76153 6.3809 9.76067C5.84816 9.91767 5.28365 9.61267 5.12665 9.07993C4.96965 8.54719 5.27465 7.98268 5.80739 7.82568C9.34763 6.68384 15.2854 6.91518 18.8389 8.96144C19.3249 9.24344 19.4784 9.86144 19.1964 10.3459C18.9144 10.8304 18.2979 10.9854 17.8134 10.7034L17.8641 10.7138Z"/>
      </svg>
      <span>SPOTIFY</span>
      
      {/* Animated arrow on hover */}
      <motion.svg 
        className="w-3 h-3 ml-1" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M14 5l7 7m0 0l-7 7m7-7H3" 
        />
      </motion.svg>
    </motion.a>
    
    {/* Enhanced cosmic decorative elements */}
    <motion.div 
      className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-green-300/5 blur-3xl pointer-events-none"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 5, repeat: Infinity }}
    />
    
    {/* Animated grid lines */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      <motion.div
        className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),rgba(52,211,153,0.1)_100%),linear-gradient(0deg,transparent_0%,transparent_calc(100%-1px),rgba(52,211,153,0.1)_100%)]"
        style={{ backgroundSize: '20px 20px' }}
        animate={{
          backgroundPosition: ['0px 0px', '20px 20px']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  </div>
);
}