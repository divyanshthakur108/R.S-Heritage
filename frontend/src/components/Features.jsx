import React from 'react';
import { UtensilsCrossed, Sparkles, Car, Zap, Music, ShieldCheck } from 'lucide-react';
import { FEATURES_SERVICES } from '../data/venueData';

const iconMap = {
  UtensilsCrossed,
  Sparkles,
  Car,
  Zap,
  Music,
  ShieldCheck,
};

const Features = () => {
  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 regal-bg-pattern relative text-white border-t border-gold-line w-full max-w-full">
      <div className="regal-bg-overlay" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-gold uppercase">
              Signature Amenities & Services
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-3 sm:mb-4">
            Everything For A <span className="scribble-wrap font-hand text-gold-light text-3xl sm:text-5xl md:text-6xl px-1 font-normal">Seamless</span> Celebration
          </h2>
          <div className="flex items-center justify-center space-x-2 my-3 sm:my-4">
            <div className="w-12 sm:w-16 h-[1px] bg-gold/40" />
            <div className="w-1.5 h-1.5 border border-gold rotate-45 shrink-0" />
            <div className="w-12 sm:w-16 h-[1px] bg-gold/40" />
          </div>
          <p className="font-garamond text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            We provide end-to-end luxury event infrastructure, so you can relax and cherish your royal moments.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {FEATURES_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <div
                key={index}
                className="bg-[#14100d]/90 p-6 sm:p-8 rounded-2xl border border-gold/25 hover:border-gold/60 transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-bg-dark transition-all duration-300 shadow-md border border-gold/30">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-gold-light transition-colors">
                  {service.title}
                </h3>
                <p className="font-garamond text-gray-400 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
