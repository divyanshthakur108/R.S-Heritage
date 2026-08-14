import React from 'react';
import { Crown, Phone, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

const Footer = () => {
  return (
    <footer className="bg-royal-emeraldDark text-white border-t border-royal-gold/30">
      
      {/* Top Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full border-2 border-royal-gold overflow-hidden shadow-glow shrink-0 bg-royal-emeraldDark flex items-center justify-center">
                <img src="/logo.jpg" alt="R.S Heritage Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-2xl font-bold text-gold-gradient">
                R.S HERITAGE
              </span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {VENUE_INFO.tagline}. Jaipur Road's premier destination for royal weddings, receptions, and memorable celebrations.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-royal-gold mb-4 border-b border-royal-gold/20 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="#home" className="hover:text-royal-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-royal-gold transition-colors">About Us</a></li>
              <li><a href="#resorts" className="hover:text-royal-gold transition-colors">Venues & Lawns</a></li>
              <li><a href="#features" className="hover:text-royal-gold transition-colors">Services & Amenities</a></li>
              <li><a href="#gallery" className="hover:text-royal-gold transition-colors">Photo Gallery</a></li>
              <li><a href="#contact" className="hover:text-royal-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Venues */}
          <div>
            <h4 className="font-serif text-lg font-bold text-royal-gold mb-4 border-b border-royal-gold/20 pb-2 inline-block">
              Our Venues
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>Grand Royal Lawn (2500+ Capacity)</li>
              <li>Imperial Heritage Banquet Hall</li>
              <li>Poolside Sundown Courtyard</li>
              <li>Bridal Preparation Suites</li>
              <li>Executive Guest Rooms</li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-royal-gold mb-4 border-b border-royal-gold/20 pb-2 inline-block">
              Connect With Us
            </h4>
            <div className="flex items-start space-x-3 text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-royal-gold shrink-0 mt-1" />
              <span className="text-xs">{VENUE_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-royal-gold shrink-0" />
              <a href={`tel:${VENUE_INFO.phonePrimary}`} className="text-xs hover:text-royal-gold">{VENUE_INFO.phonePrimary}</a>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-royal-gold shrink-0" />
              <a href={`mailto:${VENUE_INFO.email}`} className="text-xs hover:text-royal-gold">{VENUE_INFO.email}</a>
            </div>

            <a
              href={VENUE_INFO.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-royal-gold hover:underline pt-2"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} R.S Heritage Marriage & Event Venue. All Rights Reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Crafted with royal elegance for your special moments</span>
            <Heart className="w-3.5 h-3.5 text-royal-gold inline fill-royal-gold" />
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
