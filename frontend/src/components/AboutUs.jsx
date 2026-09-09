import React from 'react';
import { HeartHandshake, Shield, ArrowRight } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import Reveal from './Reveal';

const AboutUs = () => {
  return (
    <section 
      id="about" 
      className="py-10 sm:py-16 md:py-20 lg:py-28 regal-bg-pattern relative overflow-hidden text-white border-t border-gold-line w-full max-w-full"
    >
      
      {/* Background Radial Overlays */}
      <div className="regal-bg-overlay" />

      {/* Large Roman Numeral Watermark (Regal Empirus Signature) */}
      <div 
        aria-hidden="true" 
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 font-garamond font-light text-[5rem] sm:text-[9rem] md:text-[14rem] lg:text-[18rem] text-gold/[0.035] select-none pointer-events-none z-0 leading-none overflow-hidden max-w-full"
      >
        II
      </div>

      {/* Responsive Centered Container: width min(100% - 40px, 1380px) */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Responsive Grid: 1 col on mobile (<768px), 2 col on tablet & desktop (45% image / 55% content) */}
        <div className="grid grid-cols-1 md:grid-cols-[44fr_56fr] lg:grid-cols-[45fr_55fr] gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Corner-Bracketed Luxury Image Frame */}
          <Reveal variant="left" className="relative w-full max-w-full">
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[460px] lg:h-[540px] xl:h-[580px] rounded-lg overflow-hidden border border-gold/30 shadow-2xl group">
              <img
                src="/97ef2420-d4f9-433e-a89c-253e3c25e5a9.png"
                alt="R.S Heritage Grand Venue Entrance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 4 Gold Corner Accents (Regal Empirus Style) */}
            <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-gold pointer-events-none" />

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-3 sm:left-5 md:left-6 z-20 bg-[#0f0b04]/95 border border-gold/40 rounded-md py-2.5 px-3.5 sm:py-3.5 sm:px-5 md:p-5 shadow-2xl backdrop-blur-md max-w-[calc(100%-24px)] text-center">
              <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-gold to-transparent mx-auto mb-1 sm:mb-2" />
              <div className="font-garamond text-xl sm:text-2xl md:text-3xl font-light text-gold-light tracking-wide leading-tight">
                {VENUE_INFO.lawnArea}
              </div>
              <p className="font-serif text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] text-gold/90 uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                Lush Green Open Lawns
              </p>
            </div>
          </Reveal>

          {/* Right Column: Narrative Content */}
          <Reveal variant="right" delay={120} className="space-y-4 sm:space-y-5 lg:space-y-6 pt-3 sm:pt-0 max-w-full">
            
            {/* Tagline Indicator */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-7 sm:w-9 h-[1px] bg-gradient-to-r from-gold to-gold/30 shrink-0" />
              <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.3em] text-gold uppercase">
                About The Venue
              </span>
            </div>

            {/* Main Heading with Responsive Clamp Typography & Script Accent */}
            <h2 
              className="font-serif font-light text-white tracking-tight"
              style={{
                fontSize: 'clamp(32px, 2.5vw + 24px, 62px)',
                lineHeight: 'clamp(1.08, 1.12, 1.16)'
              }}
            >
              Presenting a sanctuary that defines royal grandeur{' '}
              <span className="scribble-wrap font-hand text-gold-light italic font-normal inline-block px-1">
                in Punjab
              </span>
            </h2>

            {/* Diamond Line Divider */}
            <div className="flex items-center space-x-2.5 sm:space-x-3 py-0.5">
              <div className="w-8 sm:w-12 h-[1px] bg-gold/50 shrink-0" />
              <div className="w-1.5 h-1.5 border border-gold/70 rotate-45 shrink-0" />
              <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            {/* Body Text in Cormorant Garamond with Responsive Sizing */}
            <div className="font-garamond text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-300 font-light leading-[1.7] sm:leading-[1.75] space-y-3 sm:space-y-4 max-w-full">
              <p className="break-words">
                Nested in a serene royal enclave, <strong className="text-gold-light font-normal">R.S Heritage</strong> is a premier destination designed to celebrate love, tradition, and togetherness. Spanning over {VENUE_INFO.lawnArea}, our property blends timeless architectural magnificence with contemporary 5-star amenities.
              </p>
              <p className="break-words">
                Whether you are planning a grand wedding celebration for {VENUE_INFO.capacityMax}, an intimate ring ceremony, a vibrant sangeet night, or a corporate gala, our dedicated venue management and hospitality team ensures every detail is executed to perfection.
              </p>
            </div>

            {/* Key Value Highlights Grid: Single column on small mobile, 2 cols on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2 w-full max-w-full">
              <div className="p-3.5 sm:p-4 rounded-xl glass-card border border-gold/20 flex items-start space-x-3 w-full min-w-0 transition-transform hover:-translate-y-0.5">
                <HeartHandshake className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-white">Unmatched Hospitality</h4>
                  <p className="font-sans text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">Dedicated event coordinators for seamless ceremony execution.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl glass-card border border-gold/20 flex items-start space-x-3 w-full min-w-0 transition-transform hover:-translate-y-0.5">
                <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-white">All-In-One Venue</h4>
                  <p className="font-sans text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">AC Banquets, Open Lawns, Catering, Decor & Bridal Suites.</p>
                </div>
              </div>
            </div>

            {/* CTA Button (21Oaks Interactive Button Style) */}
            <div className="pt-2 sm:pt-3">
              <a href="#resorts" className="button-21oaks inline-flex items-center gap-2 max-w-full">
                <span className="truncate">Explore Venues & Lawns</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold shrink-0 arrow-icon-rotate" />
              </a>
            </div>

          </Reveal>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;
