"use client";
import TransitionWrapper from "~/components/utils/TransitionWrapper"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GitHubComments from "~/components/GitHubComments";

export default function BlogPostClient({ 
  children, 
  slug 
}: { 
  children: React.ReactNode;
  slug: string;
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const windowScrollTop = window.scrollY || document.documentElement.scrollTop;
      if (windowScrollTop === 0) {
        setReadingProgress(0);
      } else {
        setReadingProgress(Math.min(windowScrollTop / totalHeight, 1));
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Reactive glow effect that follows mouse */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none -z-5"
        style={{
          background: ` rgba(0, 0, 0, 0.15)`,
        }}
      />    
      
      {/* Main content */}
      {children}
      
      {/* GitHub Comments Section */}
      <section className="max-w-4xl mx-auto px-6 font-mono">
        <GitHubComments
          repositoryOwner="williamcachamwri"
          repositoryName="blog-data"
          repositoryId="R_kgDOOYrY-w"
          categoryId="DIC_kwDOOYrY-84Cpsfz"
          slug={slug}
        />
      </section>
      
      {/* Beautiful Thank You Footnote as Footer */}
      <footer className="max-w-4xl mx-auto px-6 font-mono">
        {/* Enhanced separator with animated particles */}
        <div className="relative h-24 flex items-center justify-center my-8 overflow-hidden">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-green-300/40 to-transparent"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-green-300/30"
                initial={{ 
                  x: Math.random() * 200 - 100, 
                  y: Math.random() * 60 - 30,
                  opacity: 0 
                }}
                animate={{ 
                  y: [Math.random() * 20 - 10, Math.random() * -20 - 10],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4 + Math.random() * 3,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <motion.div 
            className="absolute w-40 h-[1px]"
            style={{ 
              background: "linear-gradient(to right, transparent, rgba(52, 211, 153, 0.9), transparent)",
              boxShadow: "0 0 15px rgba(52, 211, 153, 0.5)"
            }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          
          <motion.div
            className="absolute flex items-center space-x-4 backdrop-blur-sm px-6 py-2 rounded-full"
            style={{ background: "rgba(10, 10, 10, 0.3)" }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-300/40"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-300/30 border border-green-300/50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-300/40"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="mb-16 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="mb-6 text-sm text-zinc-400 uppercase tracking-widest"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 0.8, letterSpacing: "0.2em" }}
            transition={{ delay: 0.2, duration: 1.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-zinc-500">
              Thanks for reading
            </span>
          </motion.div>
          
          <motion.h3 
            className="text-3xl font-medium mb-4 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 relative z-10">
              Enjoyed this article?
            </span>
            <motion.span 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 rounded-full opacity-20"
              style={{ background: "linear-gradient(to right, #10b981, #34d399)" }}
              initial={{ width: 0 }}
              whileInView={{ width: "36%" }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.h3>
          
          <motion.p 
            className="text-zinc-400 max-w-md mx-auto mb-8 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            If you found this content valuable, consider sharing it with others who might benefit. 
            Your support helps me create more content like this.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-5 justify-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/blog" passHref>
              <motion.span
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800/70 transition-all border border-zinc-800/50 text-sm backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                More articles
              </motion.span>
            </Link>
            
            <motion.a
              href="https://twitter.com/intent/tweet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-green-300/10 to-emerald-500/10 text-green-300 hover:from-green-300/20 hover:to-emerald-500/20 transition-all border border-green-300/20 text-sm backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                y: -2, 
                boxShadow: "0 10px 25px -5px rgba(52, 211, 153, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Share on Twitter
            </motion.a>
          </motion.div>
          
          {/* Enhanced bottom design */}
          <div className="relative py-8">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-green-300/10 to-transparent"></div>
            
            <motion.div 
              className="flex justify-center items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="w-1 h-1 rounded-full bg-green-300/30"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
            
            {/* Copyright text */}
            <motion.div 
              className="text-xs text-zinc-500 flex flex-col items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              <span className="mb-1">© {new Date().getFullYear()} William Cachamwri</span>
              <span className="text-zinc-600/50 text-[10px]">All rights reserved</span>
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </>
  );
}