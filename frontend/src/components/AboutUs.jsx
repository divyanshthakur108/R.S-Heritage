import React from 'react';
import { Crown, HeartHandshake, Shield, Sparkles } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-royal-sand relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/about-building.jpg"
                alt="R.S Heritage Grand Venue Entrance"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Overlapping Floating Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 z-20 bg-royal-emeraldDark text-white p-6 rounded-xl shadow-2xl border border-royal-gold/40 max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <Crown className="w-8 h-8 text-royal-gold" />
                <span className="font-serif text-2xl font-bold text-royal-gold">2+ Years</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Of crafting unforgettable weddings, royal receptions, & cultural celebrations.
              </p>
            </div>

            {/* Subtle Gold Backdrop Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-royal-gold/30 rounded-2xl -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Narrative Content */}
          <div className="space-y-6">
            
            <div className="inline-flex items-center space-x-2 text-royal-goldDark text-sm font-semibold tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-royal-gold" />
              <span>Welcome to R.S Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-royal-emeraldDark leading-tight">
              A Royal Sanctuary for Your Lifetime Moments
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Nested in a serene royal enclave, <strong className="text-royal-emeraldDark">R.S Heritage</strong> is a premier destination designed to celebrate love, tradition, and togetherness. Spanning over {VENUE_INFO.lawnArea}, our property blends timeless architectural magnificence with contemporary 5-star amenities.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Whether you are planning a grand wedding celebration for {VENUE_INFO.capacityMax}, an intimate ring ceremony, a vibrant sangeet night, or a corporate gala, our dedicated venue management and hospitality team ensures every detail is flawless.
            </p>

            {/* Key Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl shadow-sm border border-royal-gold/20 flex items-start space-x-3">
                <HeartHandshake className="w-6 h-6 text-royal-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-royal-emeraldDark text-base">Unmatched Hospitality</h4>
                  <p className="text-xs text-gray-500 mt-1">Dedicated event coordinators for seamless ceremony execution.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-sm border border-royal-gold/20 flex items-start space-x-3">
                <Shield className="w-6 h-6 text-royal-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-royal-emeraldDark text-base">All-In-One Facilities</h4>
                  <p className="text-xs text-gray-500 mt-1">AC Banquets, Open Lawns, Catering, Decor & Bridal Suites.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;
