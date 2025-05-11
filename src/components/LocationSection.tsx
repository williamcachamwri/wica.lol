"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aW5oa2hhbmdnZ2dnZ2dnIiwiYSI6ImNtYWptcmp0azB1ZzYycnE0YnlvcjYybDYifQ.5uqIaOqzd3NHunVaa2DqZA';

export default function LocationSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  }), []);

  // Memoize title animation
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

  // Memoize event handlers
  const handleHoverStart = useCallback((item: string) => {
    setHoveredItem(item);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredItem(null);
  }, []);

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // Sử dụng style tùy chỉnh giống Apple Maps dark mode 2024-2025
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [106.6297, 10.8231], // Ho Chi Minh City coordinates
      zoom: 11,
      attributionControl: false,
      interactive: true,
      // Tắt các control mặc định
      boxZoom: false,
      doubleClickZoom: false,
      dragRotate: false,
      touchZoomRotate: false
    });

    // Loại bỏ control điều hướng (không thêm NavigationControl)

    // Add marker for location
    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Tùy chỉnh style bản đồ để giống Apple Maps 2024-2025
      if (map.current) {
        // Điều chỉnh màu sắc của nước
        map.current.setPaintProperty('water', 'fill-color', '#1A2234');
        
        // Điều chỉnh màu sắc của đất liền
        map.current.setPaintProperty('land', 'background-color', '#242F3E');
        
        // Điều chỉnh màu sắc của đường
        map.current.setPaintProperty('road-primary', 'line-color', '#3A4556');
        map.current.setPaintProperty('road-secondary-tertiary', 'line-color', '#2D3542');
        map.current.setPaintProperty('road-street', 'line-color', '#2A3241');
        
        // Điều chỉnh màu sắc của nhãn
        map.current.setPaintProperty('settlement-label', 'text-color', '#8D9CAD');
        map.current.setPaintProperty('poi-label', 'text-color', '#8D9CAD');
        
        // Điều chỉnh màu sắc của công viên
        map.current.setPaintProperty('park', 'fill-color', '#263240');
        
        // Điều chỉnh màu sắc của tòa nhà
        map.current.setPaintProperty('building', 'fill-color', '#2A3241');
        map.current.setPaintProperty('building', 'fill-opacity', 0.8);
      }
      
      // Add custom marker
      const marker = new mapboxgl.Marker({
        color: '#34d399',
        scale: 0.8
      })
        .setLngLat([106.6297, 10.8231])
        .addTo(map.current!);
      
      // Add pulsing dot effect
      const size = 150;
      
      // This implements `StyleImageInterface`
      // to draw a pulsing dot icon on the map.
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        
        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function() {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },
        
        // Call once before every frame where the icon will be used.
        render: function() {
          const duration = 1500;
          const t = (performance.now() % duration) / duration;
          
          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.7 * t + radius;
          const context = this.context;
          
          // Draw the outer circle.
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = `rgba(52, 211, 153, ${1 - t})`;
          context.fill();
          
          // Draw the inner circle.
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'rgba(52, 211, 153, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          
          // Update this image's data with data from the canvas.
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;
          
          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          map.current!.triggerRepaint();
          
          // Return `true` to let the map know that the image was updated.
          return true;
        }
      };
      
      map.current!.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      
      map.current!.addSource('dot-point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [106.6297, 10.8231]
              }
            }
          ]
        }
      });
      
      map.current!.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true
        }
      });
    });

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <motion.div 
      className="text-white mb-16 relative will-change-transform"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white bg-[length:200%_100%] animate-shimmer">location</span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 will-change-transform"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ boxShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}
          />
        </span>
      </motion.h1>
      
      <div className="mt-10 relative">
        <motion.div
          className="relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, delay: 0.3 }
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          onHoverStart={() => handleHoverStart('map')}
          onHoverEnd={handleHoverEnd}
        >
          {/* Map container */}
          <div 
            ref={mapContainer} 
            className="w-full h-[400px] rounded-xl relative z-10"
          />
          
          {/* Overlay with glass effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20 rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hoveredItem === 'map' ? 1 : 0,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            {/* Animated border */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.7), transparent)' }}
              animate={{ 
                left: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-full h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.7), transparent)' }}
              animate={{ 
                right: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-[1px]"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(52, 211, 153, 0.7), transparent)' }}
              animate={{ 
                top: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute right-0 bottom-0 h-full w-[1px]"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(52, 211, 153, 0.7), transparent)' }}
              animate={{ 
                bottom: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          
          {/* Loading indicator */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-30">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-green-300"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Location info */}
        <motion.div
          className="mt-6 relative pl-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, delay: 0.5 }
          }}
        >
          {/* Circle indicator */}
          <motion.div 
            className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-green-300"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 0 rgba(52, 211, 153, 0.4)',
                '0 0 10px rgba(52, 211, 153, 0.7)',
                '0 0 0 rgba(52, 211, 153, 0.4)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.h3 
            className="text-xl font-medium text-green-300"
            whileHover={{ scale: 1.02 }}
          >
            Ho Chi Minh City, Vietnam
          </motion.h3>
          
          <motion.p 
            className="text-zinc-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Currently living in the vibrant and bustling city of Ho Chi Minh, where technology meets tradition.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}