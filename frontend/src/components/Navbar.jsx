import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar, Crown, ShieldCheck, LogOut } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onBookNowClick, onOpenCalendar, onOpenAdminLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active section scroll spy
      const sections = ['home', 'about', 'resorts', 'features', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Venues & Lawns', href: '#resorts', id: 'resorts' },
    { name: 'Services', href: '#features', id: 'features' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-royal-emeraldDark/95 backdrop-blur-md shadow-2xl h-20 border-b border-royal-gold/30' 
        : 'bg-gradient-to-b from-royal-emeraldDark/90 via-royal-emeraldDark/60 to-transparent h-20 sm:h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Brand Logo (Left) */}
          <a href="#home" className="flex items-center space-x-3.5 group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-royal-gold overflow-hidden shadow-glow group-hover:scale-105 transition-transform shrink-0 bg-royal-emeraldDark flex items-center justify-center">
              <img src="/logo.jpg" alt="R.S Heritage Emblem" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient block leading-tight">
                R.S HERITAGE
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-royal-goldLight/80 block mt-0.5 font-medium whitespace-nowrap">
                Marriage & Event Venue
              </span>
            </div>
          </a>

          {/* Navigation Links (Centered) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-royal-gold font-semibold'
                      : 'text-white/90 hover:text-royal-gold'
                  }`}
                >
                  {link.name}
                  
                  {/* Active & Hover Underline Indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-royal-gold rounded-full transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 shrink-0">
            
            {/* Admin Authentication Entry Point */}
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenCalendar}
                  className="px-3.5 py-2 rounded-full bg-royal-gold/20 text-royal-gold text-xs font-bold border border-royal-gold/60 flex items-center space-x-1.5 transition-all hover:bg-royal-gold/30 shadow-glow"
                >
                  <Calendar className="w-3.5 h-3.5 text-royal-gold" />
                  <span>Admin Availability</span>
                </button>
                <button
                  onClick={logout}
                  title="Sign out of Admin Session"
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-royal-goldLight text-xs font-medium border border-royal-gold/30 hover:border-royal-gold/60 flex items-center space-x-1.5 transition-all shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-royal-gold" />
                <span>Admin Login</span>
              </button>
            )}

            {/* Phone Quick Call */}
            <a
              href={`tel:${VENUE_INFO.phonePrimary}`}
              className="flex items-center space-x-1.5 text-royal-goldLight hover:text-royal-gold text-xs xl:text-sm font-semibold transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-royal-gold animate-bounce" />
              <span>{VENUE_INFO.phonePrimary}</span>
            </a>

            {/* Primary CTA: Book Venue */}
            <button
              onClick={onBookNowClick}
              className="px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-royal-gold via-royal-goldLight to-royal-goldDark text-royal-emeraldDark text-xs sm:text-sm font-bold tracking-wide shadow-glow hover:brightness-110 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Venue</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-royal-goldLight hover:text-royal-gold p-2 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-royal-emeraldDark/95 backdrop-blur-xl border-b border-royal-gold/30 px-6 py-6 space-y-4 animate-fadeIn shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block text-base sm:text-lg font-medium transition-colors py-2 border-b border-white/5 flex items-center justify-between ${
                  isActive ? 'text-royal-gold font-bold' : 'text-white hover:text-royal-gold'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-royal-gold" />}
              </a>
            );
          })}

          <div className="pt-4 flex flex-col space-y-3">
            {isAdmin ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalendar();
                  }}
                  className="w-full py-2.5 rounded-full bg-royal-gold/20 text-royal-gold text-center font-bold text-xs tracking-wider border border-royal-gold/60 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Admin Availability</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 rounded-full bg-red-500/20 text-red-300 text-center font-semibold text-xs border border-red-500/30 flex items-center justify-center space-x-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out (Admin)</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full py-2.5 rounded-full bg-white/10 text-royal-goldLight text-center font-semibold text-xs tracking-wider border border-royal-gold/30 flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-royal-gold" />
                <span>Admin Login</span>
              </button>
            )}

            <a
              href={`tel:${VENUE_INFO.phonePrimary}`}
              className="flex items-center justify-center space-x-2 text-royal-goldLight py-2 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-royal-gold" />
              <span>{VENUE_INFO.phonePrimary}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-royal-gold via-royal-goldLight to-royal-goldDark text-royal-emeraldDark text-center font-bold tracking-wider shadow-glow text-sm"
            >
              Book Venue Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
