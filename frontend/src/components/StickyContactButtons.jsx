import React from 'react';
import { Phone, Instagram, MessageCircle, MapPin } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

const StickyContactButtons = () => {
  const phoneUrl = `tel:${VENUE_INFO.phonePrimary.replace(/\s+/g, '')}`;
  const whatsappUrl = VENUE_INFO.whatsappUrl || `https://wa.me/918264825706?text=Hello!%20I%20would%20like%20to%20inquire%20about%20booking%20at%20R.S%20Heritage.`;
  const instagramUrl = VENUE_INFO.instagramUrl || `https://www.instagram.com/r.s.heritageecohuts/?hl=en`;

  return (
    <>
      {/* Floating Side Action Pill (Regal Empirus Signature Side Widget) - Desktop */}
      <div 
        aria-label="Quick action links"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 select-none hidden md:block"
      >
        <div className="re-side-bar py-4 px-2 flex flex-col items-center gap-4">
          
          {/* Instagram Link */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Follow on Instagram"
            className="w-9 h-9 rounded-full text-[#E1306C] hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* WhatsApp Link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="w-9 h-9 rounded-full text-[#25D366] hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Phone Link */}
          <a
            href={phoneUrl}
            title={`Call ${VENUE_INFO.phonePrimary}`}
            className="w-9 h-9 rounded-full text-[#34C759] hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Location Map Link */}
          <a
            href={VENUE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View Location on Maps"
            className="w-9 h-9 rounded-full text-gold-light hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
          >
            <MapPin className="w-5 h-5" />
          </a>

        </div>
      </div>

      {/* Floating Horizontal Mobile Quick Action Bar (Near Bottom) */}
      <div 
        aria-label="Mobile quick contact options"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden select-none max-w-[calc(100%-24px)]"
      >
        <div className="px-4 py-2 flex items-center gap-3.5 bg-[#0e1a14]/92 backdrop-blur-xl border border-gold/45 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.7)] transition-all">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="w-7 h-7 rounded-full text-[#25D366] hover:scale-110 active:scale-90 flex items-center justify-center transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Vertical Separator */}
          <div className="w-[1px] h-3.5 bg-gold/30 shrink-0" />

          {/* Phone Call */}
          <a
            href={phoneUrl}
            aria-label={`Call ${VENUE_INFO.phonePrimary}`}
            className="w-7 h-7 rounded-full text-[#34C759] hover:scale-110 active:scale-90 flex items-center justify-center transition-transform"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Vertical Separator */}
          <div className="w-[1px] h-3.5 bg-gold/30 shrink-0" />

          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-7 h-7 rounded-full text-[#E1306C] hover:scale-110 active:scale-90 flex items-center justify-center transition-transform"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Vertical Separator */}
          <div className="w-[1px] h-3.5 bg-gold/30 shrink-0" />

          {/* Map Location */}
          <a
            href={VENUE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Location"
            className="w-7 h-7 rounded-full text-gold-light hover:scale-110 active:scale-90 flex items-center justify-center transition-transform"
          >
            <MapPin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
};

export default StickyContactButtons;
