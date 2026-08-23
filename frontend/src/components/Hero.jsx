import React from 'react';
import { Calendar, ChevronDown, MapPin, Users, Award, Sparkles } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useAuth } from '../context/AuthContext';

const Hero = ({ onBookNowClick, onOpenAdminCalendar }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20 overflow-hidden bg-royal-emeraldDark">
      
      {/* Layer 0: Sharp & Responsive R.S Heritage Background Image */}
      <img
        src="/hero-bg.jpg"
        alt="R.S Heritage Royal Marriage Venue"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center pointer-events-none transition-transform duration-1000"
      />

      {/* Layer 1: Dark Emerald Gradient Overlay with High Contrast on Mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031E18]/90 via-[#031E18]/55 to-[#031E18]/90 sm:from-[#031E18]/80 sm:via-[#031E18]/45 sm:to-[#031E18]/85 pointer-events-none" />

      {/* Layer 2: Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,30,24,0.4)_100%)] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Heritage Badge */}
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-royal-gold/15 border border-royal-gold/50 text-royal-goldLight text-[10.5px] sm:text-xs md:text-sm font-medium mb-4 sm:mb-6 tracking-wider sm:tracking-widest uppercase backdrop-blur-md max-w-full text-center shadow-glow">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0 animate-spin-slow" />
          <span className="truncate">Premiere Wedding & Celebration Destination</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-tight mb-4 sm:mb-6 drop-shadow-md">
          EXPERIENCE ROYAL <br className="hidden sm:inline" />
          CELEBRATIONS AT <br />
          <span className="text-gold-gradient drop-shadow-lg">R.S HERITAGE</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-xs sm:text-base md:text-lg lg:text-xl text-gray-200 font-light leading-relaxed mb-7 sm:mb-10 px-2 drop-shadow-sm">
          Transform your special occasions into legendary memories. Featuring sprawling lush green lawns, 
          crystal-chandelier banquet halls, luxury suites, and impeccable royal hospitality.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mb-10 sm:mb-16">
          {/* Admin Role Gate: Only visible to authenticated Admin users */}
          {isAdmin && (
            <button
              onClick={onOpenAdminCalendar}
              className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-royal-gold via-royal-goldLight to-royal-goldDark text-royal-emeraldDark font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2.5"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-royal-emeraldDark shrink-0" />
              <span>Check Date Availability</span>
            </button>
          )}
          
          <a
            href="#resorts"
            className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm md:text-base border border-royal-gold/40 backdrop-blur-md transition-all flex items-center justify-center space-x-2 hover:border-royal-gold active:scale-95"
          >
            <span>Explore Lawns & Venues</span>
          </a>
        </div>

        {/* Highlights Bar */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl glass-panel border border-royal-gold/30 shadow-glass">
          <div className="p-2 sm:p-3 text-center border-r border-b md:border-b-0 border-white/10">
            <Users className="w-4 h-4 sm:w-6 sm:h-6 text-royal-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl font-bold text-white">{VENUE_INFO.capacityMax}</div>
            <div className="text-[9.5px] sm:text-xs text-royal-goldLight/75 uppercase tracking-wider font-medium">Guest Capacity</div>
          </div>
          <div className="p-2 sm:p-3 text-center border-b md:border-b-0 md:border-r border-white/10">
            <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-royal-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl font-bold text-white">{VENUE_INFO.lawnArea}</div>
            <div className="text-[9.5px] sm:text-xs text-royal-goldLight/75 uppercase tracking-wider font-medium">Sprawling Area</div>
          </div>
          <div className="p-2 sm:p-3 text-center border-r border-white/10">
            <Award className="w-4 h-4 sm:w-6 sm:h-6 text-royal-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl font-bold text-white">5 Star</div>
            <div className="text-[9.5px] sm:text-xs text-royal-goldLight/75 uppercase tracking-wider font-medium">Hospitality & Decor</div>
          </div>
          <div className="p-2 sm:p-3 text-center">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-royal-gold mx-auto mb-1" />
            <div className="font-serif text-base sm:text-xl font-bold text-white">100% AC</div>
            <div className="text-[9.5px] sm:text-xs text-royal-goldLight/75 uppercase tracking-wider font-medium">Banquet & Suites</div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a 
        href="#about" 
        className="absolute bottom-4 sm:bottom-6 left-0 right-0 mx-auto w-fit text-royal-goldLight/70 hover:text-royal-gold transition-colors flex flex-col items-center space-y-1 animate-bounce"
        aria-label="Scroll to About Section"
      >
        <span className="text-[10px] sm:text-xs tracking-widest uppercase">Discover More</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-royal-gold" />
      </a>
    </section>
  );
};

export default Hero;

