import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/venueData';
import { Camera, Sparkles } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Weddings', 'Receptions', 'Haldi & Sangeet', 'Night Decor'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-royal-emeraldDark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-royal-gold font-semibold text-sm uppercase tracking-widest block mb-2">
            Visual Heritage & Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Our Celebration Showcase
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mb-6" />
          <p className="text-gray-300 text-base">
            Take a glance at past royal weddings, mandap illuminations, and festive sangeet evenings hosted at R.S Heritage.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-royal-gold text-royal-emeraldDark shadow-glow scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-glass border border-royal-gold/20 hover:border-royal-gold transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-emeraldDark via-royal-emeraldDark/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Overlay Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-royal-gold uppercase tracking-wider mb-1 bg-royal-emeraldDark/80 px-2.5 py-0.5 rounded-full border border-royal-gold/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{item.category}</span>
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
