import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/venueData';
import { Sparkles, Maximize2, X } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const categories = ['All', 'Weddings', 'Receptions', 'Haldi & Sangeet', 'Night Decor'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-12 sm:py-20 md:py-24 lg:py-28 regal-bg-pattern relative text-white border-t border-gold-line w-full max-w-full">
      
      {/* Background Radial Overlay */}
      <div className="regal-bg-overlay" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-2.5 sm:mb-3">
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-gold uppercase">
              Visual Heritage & Memories
            </span>
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-2 sm:mb-4">
            Our Celebration <span className="font-hand text-gold-light text-3xl sm:text-5xl md:text-6xl px-1 font-normal">Showcase</span>
          </h2>
          <div className="flex items-center justify-center space-x-2 my-2.5 sm:my-4">
            <div className="w-10 sm:w-16 h-[1px] bg-gold/40" />
            <div className="w-1.5 h-1.5 border border-gold rotate-45 shrink-0" />
            <div className="w-10 sm:w-16 h-[1px] bg-gold/40" />
          </div>
          <p className="font-garamond text-sm sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed px-2">
            Take a glance at past royal weddings, mandap illuminations, and festive sangeet evenings hosted at R.S Heritage.
          </p>
        </div>

        {/* Regal Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-6 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-pill text-[10.5px] sm:text-xs py-2 px-3 sm:py-2 sm:px-4 min-h-[38px] ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="gallery-card group relative h-60 xs:h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-gold/25 cursor-pointer bg-[#14100d]"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              
              {/* Corner brackets on hover */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Overlay Details */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="inline-flex items-center space-x-1 text-[9.5px] sm:text-[10px] font-serif tracking-[0.2em] text-gold uppercase mb-1 bg-bg-dark/90 px-2.5 py-1 rounded-full border border-gold/30">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{item.category}</span>
                </span>
                <h3 className="font-serif text-base sm:text-lg font-light text-white leading-snug mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-[#14100d] border border-gold/40 rounded-2xl overflow-hidden shadow-2xl p-2 max-h-[92vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/75 text-gold hover:text-white border border-gold/40 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-hidden rounded-xl bg-black flex items-center justify-center max-h-[65vh]">
              <img src={selectedImage.image} alt={selectedImage.title} className="w-full max-h-[65vh] object-contain rounded-xl" />
            </div>
            <div className="p-3 sm:p-4 text-center">
              <span className="font-serif text-xs tracking-[0.2em] text-gold uppercase">{selectedImage.category}</span>
              <h3 className="font-serif text-lg sm:text-2xl font-light text-white mt-1">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Gallery;
