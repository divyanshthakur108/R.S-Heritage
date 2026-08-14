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
    <section id="features" className="py-24 bg-royal-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-royal-goldDark font-semibold text-sm uppercase tracking-widest block mb-2">
            Signature Amenities & Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-royal-emeraldDark mb-4">
            Everything for a Seamless Celebration
          </h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
          <p className="text-gray-600 text-base sm:text-lg">
            We provide end-to-end luxury event infrastructure, so you can relax and cherish your royal moments.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md border border-royal-gold/20 hover:border-royal-gold hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-royal-emeraldDark text-royal-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-royal-gold group-hover:text-royal-emeraldDark transition-all duration-300 shadow-md">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-royal-emeraldDark mb-3 group-hover:text-royal-goldDark transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
