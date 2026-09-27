import React, { useState, useEffect } from 'react';

export const ScrollProgressIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentScroll = window.scrollY;
            const progress = (currentScroll / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3.5px] bg-slate-200/30 dark:bg-slate-800/30 pointer-events-none overflow-hidden"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 transition-all duration-100 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Subtle glowing leading tip */}
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.9)] rounded-full blur-[0.5px]" />
      </div>
    </div>
  );
};
