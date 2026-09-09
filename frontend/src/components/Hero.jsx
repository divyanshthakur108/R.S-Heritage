import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    }
    return false;
  });

  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Ensure instant, continuous autoplay across mobile and desktop
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      }
    }
  }, [isMobile]);

  return (
    <section 
      id="home" 
      className="relative w-full h-[100svh] min-h-[560px] md:h-screen md:min-h-[640px] overflow-hidden bg-[#0a0c0e]"
    >
      {/* Instant Image Backdrop */}
      <img
        src="/hero-bg.png"
        alt="R.S Heritage Grand Venue"
        className="pointer-events-none transition-all duration-300"
        style={{
          filter: 'brightness(100%)',
          WebkitFilter: 'brightness(100%)'
        }}
        loading="eager"
      />

      {/* Full-bleed background video */}
      <video
        ref={videoRef}
        src="/video/Create_a_cinematic_ultra_prem.mp4"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        poster="/hero-bg.png"
        className="pointer-events-none transition-all duration-300"
        style={{
          filter: 'brightness(100%)',
          WebkitFilter: 'brightness(100%)',
          opacity: 1
        }}
      >
        <source 
          src="/video/Create_a_cinematic_ultra_prem.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Hero Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none z-10" />

      {/* Hero Headline Overlay with 21Oaks Scribble Underline */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-20 px-6 sm:px-12 max-w-7xl mx-auto pointer-events-none">
        <div className="max-w-2xl space-y-3 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 border border-gold/40 text-gold text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif backdrop-blur-md">
            <span>👑</span>
            <span>Punjab's Landmark Venue</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl text-white font-light leading-tight drop-shadow-md">
            Experience Royal Grandeur at{' '}
            <span className="scribble-wrap text-gold-light font-normal">R.S Heritage</span>
          </h1>
        </div>
      </div>

      {/* Discreet Minimal Regal Scroll Indicator */}
      <a 
        href="#about" 
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1.5 sm:space-y-2 opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg pointer-events-auto"
        aria-label="Scroll to About Section"
      >
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white font-medium">Scroll</span>
        <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-white via-white/70 to-transparent animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
