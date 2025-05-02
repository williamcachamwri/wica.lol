"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./GitHubComments.module.css";

interface GitHubCommentsProps {
  repositoryOwner: string;
  repositoryName: string;
  repositoryId: string;
  categoryId: string;
  slug: string;
}

export default function GitHubComments({
  repositoryOwner,
  repositoryName,
  repositoryId,
  categoryId,
  slug,
}: GitHubCommentsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    const scriptId = "giscus-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    // Create script element to load Giscus
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", `${repositoryOwner}/${repositoryName}`);
    script.setAttribute("data-repo-id", repositoryId);
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark_dimmed");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    // Add script to DOM
    const commentsContainer = document.getElementById("github-comments");
    if (commentsContainer) {
      commentsContainer.appendChild(script);
    }

    // Check and add style after iframe is loaded
    const checkGiscusLoaded = setInterval(() => {
      const giscusFrame = document.querySelector('iframe.giscus-frame');
      if (giscusFrame) {
        clearInterval(checkGiscusLoaded);
        setIsLoaded(true);
        
        // Add event listener to listen for events from iframe
        window.addEventListener('message', (event) => {
          if (event.origin !== 'https://giscus.app') return;
          
          // Process events from giscus
          if (event.data.giscus?.discussion) {
            // Discussion has been loaded
            console.log('Discussion loaded:', event.data.giscus.discussion);
          }
        });
      }
    }, 300);

    // Appear effect when scrolled to
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const commentSection = document.querySelector('.comments-section');
    if (commentSection) {
      observer.observe(commentSection);
    }

    return () => {
      clearInterval(checkGiscusLoaded);
      observer.disconnect();
    };
  }, [repositoryOwner, repositoryName, repositoryId, categoryId, slug]);

  return (
    <motion.div
      className="mt-16 mb-12 comments-section relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="border-t border-zinc-800 pt-10">
        <motion.h3
          className="text-2xl font-medium mb-8 relative inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300">
            Comments
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? "100%" : 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.h3>

        <motion.p
          className="text-zinc-400 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.8 : 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Share your thoughts about this article. All comments are stored in GitHub Discussions and you can use Markdown syntax.
        </motion.p>

        {/* Container with custom style */}
        <motion.div
          className={`relative ${styles.customGiscusContainer}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className={styles.glowEffect}></div>
          
          <div id="github-comments" className="github-comments-container">
            {!isLoaded && (
              <div className={styles.loadingContainer}>
                <motion.div
                  className={styles.loadingDot}
                  animate={{ 
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className={styles.loadingDot}
                  animate={{ 
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5,
                    delay: 0.2,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className={styles.loadingDot}
                  animate={{ 
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5,
                    delay: 0.4,
                    ease: "easeInOut"
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Add small note */}
        <motion.div
          className="flex items-center justify-center mt-6 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.7 : 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-green-300"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <p className="text-xs text-zinc-500">
            Sign in with GitHub to comment. All comments are stored in GitHub Discussions.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}