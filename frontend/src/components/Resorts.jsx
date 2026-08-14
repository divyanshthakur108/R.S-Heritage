import React from 'react';
import { Users, Maximize, CheckCircle2, Calendar } from 'lucide-react';
import { RESORTS_DATA } from '../data/venueData';

const Resorts = ({ onBookNowClick }) => {
  return (
    <section id="resorts" className="py-24 bg-royal-emeraldDark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-royal-gold font-semibold text-sm uppercase tracking-widest block mb-2">
            Venues & Event Spaces
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Explore Our Grand Venues
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mb-6" />
          <p className="text-gray-300 text-base sm:text-lg">
            Choose from magnificent open-air green lawns, climate-controlled imperial banquet halls, 
            and luxurious preparation suites tailored for events of any size.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {RESORTS_DATA.map((venue) => (
            <div
              key={venue.id}
              className="bg-royal-emeraldLight/50 rounded-2xl overflow-hidden border border-royal-gold/30 hover:border-royal-gold transition-all duration-300 shadow-glass flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-emeraldDark via-transparent to-transparent opacity-80" />
                
                {/* Badges Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-royal-emeraldDark/80 text-royal-gold text-xs font-semibold backdrop-blur-md border border-royal-gold/30">
                    <Users className="w-3.5 h-3.5" />
                    <span>{venue.capacity}</span>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-royal-gold/90 text-royal-emeraldDark text-xs font-bold shadow-sm">
                    <Maximize className="w-3.5 h-3.5" />
                    <span>{venue.size}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gold-gradient mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-royal-goldLight/80 font-medium uppercase tracking-wider mb-4">
                    {venue.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {venue.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-white/10 pt-4">
                    {venue.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-royal-gold shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  onClick={onBookNowClick}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-royal-gold/20 to-royal-gold/40 hover:from-royal-gold hover:to-royal-goldDark text-royal-gold hover:text-royal-emeraldDark font-bold text-sm border border-royal-gold/40 hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve {venue.name}</span>
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
