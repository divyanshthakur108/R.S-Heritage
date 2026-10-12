import React from 'react';
import { Users, Maximize, CheckCircle2, Calendar, ArrowUpRight } from 'lucide-react';
import { RESORTS_DATA } from '../data/venueData';

const Resorts = ({ onBookNowClick }) => {
  return (
    <section id="resorts" className="py-12 sm:py-20 md:py-24 lg:py-28 regal-bg-pattern relative text-white border-t border-gold-line w-full max-w-full">
      
      {/* Background Radial Overlay */}
      <div className="regal-bg-overlay" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-2.5 sm:mb-3">
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-gold uppercase">
              Venues & Event Spaces
            </span>
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-2 sm:mb-4">
            Explore Our <span className="scribble-wrap font-hand text-gold-light text-3xl sm:text-5xl md:text-6xl px-1 font-normal">Grand</span> Venues
          </h2>
          <div className="flex items-center justify-center space-x-2 my-2.5 sm:my-4">
            <div className="w-10 sm:w-16 h-[1px] bg-gold/40" />
            <div className="w-1.5 h-1.5 border border-gold rotate-45 shrink-0" />
            <div className="w-10 sm:w-16 h-[1px] bg-gold/40" />
          </div>
          <p className="font-garamond text-sm sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed px-2">
            Choose from magnificent open-air green lawns, climate-controlled imperial banquet halls, 
            and luxurious preparation suites tailored for events of any size.
          </p>
        </div>

        {/* Venues Grid (21Oaks + Regal Empirus Card Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">
          {RESORTS_DATA.map((venue) => (
            <div
              key={venue.id}
              className="bg-[#14100d]/90 rounded-xl overflow-hidden border border-gold/25 hover:border-gold/60 transition-all duration-300 shadow-2xl flex flex-col group relative"
            >
              {/* Image Container with Top Gold Corner Brackets & Availability Tag */}
              <div className="relative h-48 xs:h-56 sm:h-64 md:h-72 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-transparent to-transparent opacity-90" />
                
                {/* 21Oaks Style Top Available Tag */}
                <div className="absolute top-3 left-3 z-10 inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-950/85 text-emerald-300 text-[9.5px] sm:text-[10px] font-serif tracking-wider backdrop-blur-md border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Booking Open</span>
                </div>

                {/* Badges Overlay */}
                <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1.5 px-2 sm:px-3 py-1 rounded-full bg-bg-dark/85 text-gold-light text-[10px] sm:text-xs font-serif tracking-wider backdrop-blur-md border border-gold/30">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    <span>{venue.capacity}</span>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-2 sm:px-3 py-1 rounded-full bg-gold/90 text-bg-dark text-[10px] sm:text-xs font-serif font-bold shadow-sm">
                    <Maximize className="w-3.5 h-3.5" />
                    <span>{venue.size}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-gold-light mb-1">
                    {venue.name}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[11px] text-gold/80 font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] mb-3 sm:mb-4">
                    {venue.subtitle}
                  </p>
                  <p className="font-garamond text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    {venue.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gold-line pt-3 sm:pt-4">
                    {venue.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button (21Oaks Button Style with min 48px height) */}
                <button
                  onClick={onBookNowClick}
                  className="button-21oaks w-full min-h-[48px] justify-center py-3 text-xs sm:text-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Reserve {venue.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold arrow-icon-rotate" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Resorts;
