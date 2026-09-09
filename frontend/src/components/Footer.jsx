import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Heart, Instagram } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import Reveal from './Reveal';

const Footer = () => {
  return (
    <footer className="regal-bg-pattern text-white border-t border-gold-line relative overflow-hidden w-full max-w-full">
      <div className="regal-bg-overlay" />

      {/* Top Banner Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Col 1: Brand Info */}
          <Reveal className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full border border-gold overflow-hidden shadow-glow shrink-0 bg-bg-dark flex items-center justify-center">
                <img src="/logo.jpg" alt="R.S Heritage Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-xl font-bold text-gold-light tracking-wider">
                R.S HERITAGE
              </span>
            </div>
            <p className="font-garamond text-gray-300 text-base leading-relaxed">
              {VENUE_INFO.tagline}. Jaipur Road's premier destination for royal weddings, receptions, and memorable celebrations.
            </p>
          </Reveal>

          {/* Col 2: Quick Links */}
          <Reveal delay={100}>
            <h4 className="font-serif text-sm tracking-[0.2em] font-semibold text-gold mb-4 uppercase border-b border-gold-line pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-garamond text-base text-gray-300">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#resorts" className="hover:text-gold transition-colors">Venues & Lawns</a></li>
              <li><a href="#features" className="hover:text-gold transition-colors">Services & Amenities</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Photo Gallery</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </Reveal>

          {/* Col 3: Venues */}
          <Reveal delay={200}>
            <h4 className="font-serif text-sm tracking-[0.2em] font-semibold text-gold mb-4 uppercase border-b border-gold-line pb-2 inline-block">
              Our Venues
            </h4>
            <ul className="space-y-2.5 font-garamond text-base text-gray-300">
              <li>Grand Royal Lawn (2500+ Capacity)</li>
              <li>Imperial Heritage Banquet Hall</li>
              <li>Royal Grand Fountain Courtyard</li>
              <li>Bridal Preparation Suites</li>
              <li>Executive Guest Rooms</li>
            </ul>
          </Reveal>

          {/* Col 4: Reach Us */}
          <Reveal delay={300} className="space-y-3">
            <h4 className="font-serif text-sm tracking-[0.2em] font-semibold text-gold mb-4 uppercase border-b border-gold-line pb-2 inline-block">
              Connect With Us
            </h4>
            <div className="flex items-start space-x-3 font-garamond text-base text-gray-300">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
              <span className="text-xs font-sans text-gray-300">{VENUE_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href={`tel:${VENUE_INFO.phonePrimary}`} className="text-xs font-sans hover:text-gold">{VENUE_INFO.phonePrimary}</a>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href={`mailto:${VENUE_INFO.email}`} className="text-xs font-sans hover:text-gold">{VENUE_INFO.email}</a>
            </div>

            <a
              href={VENUE_INFO.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-gold hover:underline pt-2"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gold-line py-6 text-center text-xs text-gray-400 font-sans relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} R.S Heritage Marriage & Event Venue. All Rights Reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Developed by DIVYANSH THAKUR</span>
            <Heart className="w-3.5 h-3.5 text-gold inline fill-gold" />
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
