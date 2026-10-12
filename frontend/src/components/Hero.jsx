import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown, MapPin, Users, Award, Sparkles, ArrowUpRight } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

const Hero = ({ onBookNowClick, onOpenAdminCalendar }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoSrc = isMobile 
    ? '/video/Create_a_cinematic_vertical_.mp4' 
    : '/video/Create_a_cinematic_ultra_prem.mp4';

  // Play video reliably across devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => {
            // Browser autoplay restrictions fallback
            if (video) {
              video.muted = true;
              video.play().then(() => setVideoLoaded(true)).catch(() => {});
            }
          });
      }
    }
  }, [videoSrc]);

  return (
    <section 
      id="home" 
      className="hero relative w-full min-h-[100vh] min-h-[100svh] min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-[#0a0c0e] isolate"
    >
      {/* Background Media Container (Layer 0) - Always full-bleed, zero gaps */}
      <div className="hero-bg absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Layer 0: Instant Crisp High-Res Image Backdrop (Ensures zero black flash on load) */}
        <img
          src="/hero-bg.png"
          alt="R.S Heritage Royal Marriage & Event Venue"
          className="hero-bg-media absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
          fetchpriority="high"
        />

        {/* Layer 1: Cinematic Full-bleed Background Video (Vertical on mobile, horizontal on desktop) */}
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          poster="/hero-bg.png"
          onCanPlay={() => setVideoLoaded(true)}
          className={`hero-bg-media absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Layer 2: Subtle Luxury Gradient Overlays - Clean contrast without dark voids */}
        {/* Soft top fade for floating navbar readability */}
        <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none z-[1]" />
        
        {/* Balanced contrast overlay allowing the grand venue architecture to shine through */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none z-[1] bg-black/35 sm:bg-black/40"
        />

        {/* Bottom smooth bleed into About Us section */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#0a0c0e] via-[#0a0c0e]/60 to-transparent pointer-events-none z-[1]" />
      </div>

      {/* Main Content Container - Centered and clearing floating navbar and bottom contact bar */}
      <div className="hero-content relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-12 md:pb-16">
        
        {/* Royal Crown Badge */}
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#111d17]/90 border border-gold/40 text-gold-light text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.25em] font-serif backdrop-blur-md shadow-lg mb-2.5 sm:mb-4 max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-spin-slow" />
          <span className="text-center break-words">Punjab's Premier Royal Wedding & Event Resort</span>
        </div>

        {/* Grand Title */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight mb-3 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] break-words max-w-full">
          EXPERIENCE ROYAL <br />
          CELEBRATIONS AT <br />
          <span className="text-gold-gradient drop-shadow-[0_2px_16px_rgba(200,164,74,0.45)]">
            R.S HERITAGE
          </span>
        </h1>

        {/* Refined Subtitle */}
        <p className="max-w-2xl lg:max-w-3xl mx-auto font-garamond text-xs sm:text-base md:text-lg lg:text-xl text-gray-200/95 font-light leading-relaxed mb-5 sm:mb-7 md:mb-9 px-2 drop-shadow-md">
          Where timeless royal traditions meet contemporary 5-star opulence. Featuring sprawling lush green lawns, 
          crystal-chandelier banquet halls, luxury suites, and unforgettable royal hospitality.
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-sm sm:max-w-none mb-6 sm:mb-10">
          <button
            onClick={onBookNowClick}
            className="w-full sm:w-auto h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] px-6 sm:px-9 py-2.5 sm:py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold-dark text-[#0a0c0e] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(200,164,74,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>Reserve Your Date</span>
            <ArrowUpRight className="w-4 h-4 text-[#0a0c0e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenAdminCalendar}
            className="w-full sm:w-auto h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-[#14100d]/85 hover:bg-[#14100d] text-gold-light font-serif font-semibold text-xs sm:text-sm tracking-wider uppercase border border-gold/45 backdrop-blur-md shadow-lg hover:border-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-gold shrink-0" />
            <span>Check Date Availability</span>
          </button>

          <a
            href="#resorts"
            className="w-full sm:w-auto h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-serif font-medium text-xs sm:text-sm tracking-wider uppercase border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2 hover:border-gold/50"
          >
            <span>Explore Venues</span>
          </a>
        </div>

        {/* 4 Signature Venue Highlights / Metric Cards */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4 rounded-2xl glass-card border border-gold/30 shadow-2xl backdrop-blur-xl">
          <div className="p-2 sm:p-3 text-center border-r border-b md:border-b-0 border-gold/15">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide">{VENUE_INFO.capacityMax}</div>
            <div className="font-sans text-[8.5px] sm:text-xs text-gold-light/80 uppercase tracking-wider font-medium mt-0.5">Guest Capacity</div>
          </div>
          <div className="p-2 sm:p-3 text-center border-b md:border-b-0 md:border-r border-gold/15">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide">{VENUE_INFO.lawnArea}</div>
            <div className="font-sans text-[8.5px] sm:text-xs text-gold-light/80 uppercase tracking-wider font-medium mt-0.5">Lush Royal Lawns</div>
          </div>
          <div className="p-2 sm:p-3 text-center border-r border-gold/15">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide">5-Star</div>
            <div className="font-sans text-[8.5px] sm:text-xs text-gold-light/80 uppercase tracking-wider font-medium mt-0.5">Hospitality & Decor</div>
          </div>
          <div className="p-2 sm:p-3 text-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide">100% AC</div>
            <div className="font-sans text-[8.5px] sm:text-xs text-gold-light/80 uppercase tracking-wider font-medium mt-0.5">Banquets & Suites</div>
          </div>
        </div>

        {/* Elegant Scroll Down Indicator */}
        <a 
          href="#about" 
          className="mt-4 sm:mt-6 md:mt-8 inline-flex flex-col items-center space-y-1 text-gold-light/70 hover:text-gold transition-colors pointer-events-auto"
          aria-label="Scroll to About Section"
        >
          <span className="font-serif text-[8.5px] sm:text-[10px] tracking-[0.25em] uppercase">Discover The Heritage</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gold animate-bounce" />
        </a>

      </div>
    </section>
  );
};

export default Hero;
