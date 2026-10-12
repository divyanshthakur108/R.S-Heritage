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

      {/* Floating Horizontal Mobile Quick Action Bar (Fixed Bottom, Centered, Rounded Pill) */}
      <div 
        aria-label="Mobile quick contact options"
        className="fixed left-1/2 -translate-x-1/2 z-40 md:hidden select-none max-w-[calc(100%-24px)]"
        style={{ bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="px-3.5 py-1.5 flex items-center gap-1.5 xs:gap-2.5 bg-[#0e1a14]/95 backdrop-blur-xl border border-gold/45 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)] transition-all">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="w-11 h-11 rounded-full text-[#25D366] hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Vertical Separator */}
          <div className="w-[1px] h-4 bg-gold/30 shrink-0" />

          {/* Phone Call */}
          <a
            href={phoneUrl}
            aria-label={`Call ${VENUE_INFO.phonePrimary}`}
            className="w-11 h-11 rounded-full text-[#34C759] hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all"
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Vertical Separator */}
          <div className="w-[1px] h-4 bg-gold/30 shrink-0" />

          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full text-[#E1306C] hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Vertical Separator */}
          <div className="w-[1px] h-4 bg-gold/30 shrink-0" />

          {/* Map Location */}
          <a
            href={VENUE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Location"
            className="w-11 h-11 rounded-full text-gold-light hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all"
          >
            <MapPin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default StickyContactButtons;
