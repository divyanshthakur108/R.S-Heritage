import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Heart, Instagram } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

const Footer = () => {
  return (
    <footer 
      className="regal-bg-pattern text-white border-t border-gold-line relative overflow-hidden w-full max-w-full pb-24 sm:pb-8"
      style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="regal-bg-overlay" />

      {/* Top Banner Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold overflow-hidden shadow-glow shrink-0 bg-bg-dark flex items-center justify-center">
                <img src="/logo.jpg" alt="R.S Heritage Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-bold text-gold-light tracking-wider">
                R.S HERITAGE
              </span>
            </div>
            <p className="font-garamond text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-none">
              {VENUE_INFO.tagline}. Punjab's premier destination for royal weddings, receptions, and memorable celebrations.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] font-semibold text-gold mb-3 sm:mb-4 uppercase border-b border-gold-line pb-1.5 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 font-garamond text-sm sm:text-base text-gray-300">
              <li><a href="#home" className="hover:text-gold transition-colors py-1 inline-block">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors py-1 inline-block">About Us</a></li>
              <li><a href="#resorts" className="hover:text-gold transition-colors py-1 inline-block">Venues & Lawns</a></li>
              <li><a href="#features" className="hover:text-gold transition-colors py-1 inline-block">Services & Amenities</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors py-1 inline-block">Photo Gallery</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors py-1 inline-block">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Venues */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] font-semibold text-gold mb-3 sm:mb-4 uppercase border-b border-gold-line pb-1.5 inline-block">
              Our Venues
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 font-garamond text-sm sm:text-base text-gray-300">
              <li>Grand Royal Lawn (2500+ Capacity)</li>
              <li>Imperial Heritage Banquet Hall</li>
              <li>Royal Grand Fountain Courtyard</li>
              <li>Bridal Preparation Suites</li>
              <li>Executive Guest Rooms</li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-3 flex flex-col items-center sm:items-start">
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] font-semibold text-gold mb-3 sm:mb-4 uppercase border-b border-gold-line pb-1.5 inline-block">
              Connect With Us
            </h4>
            <div className="flex items-center sm:items-start space-x-2.5 font-garamond text-sm sm:text-base text-gray-300 justify-center sm:justify-start">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="text-xs font-sans text-gray-300 text-center sm:text-left">{VENUE_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-2.5 text-sm text-gray-300 justify-center sm:justify-start">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href={`tel:${VENUE_INFO.phonePrimary}`} className="text-xs font-sans hover:text-gold py-1 inline-block">{VENUE_INFO.phonePrimary}</a>
            </div>
            <div className="flex items-center space-x-2.5 text-sm text-gray-300 justify-center sm:justify-start">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href={`mailto:${VENUE_INFO.email}`} className="text-xs font-sans hover:text-gold py-1 inline-block">{VENUE_INFO.email}</a>
            </div>

            <a
              href={VENUE_INFO.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-gold hover:underline pt-2 justify-center sm:justify-start"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gold-line py-5 text-center text-xs text-gray-400 font-sans relative z-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p>© {new Date().getFullYear()} R.S Heritage Marriage & Event Venue. All Rights Reserved.</p>
          <p className="flex items-center justify-center space-x-1">
            <span>Developed by DIVYANSH THAKUR</span>
            <Heart className="w-3.5 h-3.5 text-gold inline fill-gold" />
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
