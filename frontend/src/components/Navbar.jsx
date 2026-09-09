import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onBookNowClick, onOpenCalendar, onOpenAdminLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isAdmin, logout } = useAuth();
  const navRef = useRef(null);

  // Handle scroll detection and active section scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'resorts', 'features', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 140;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key or window resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Venues', href: '#resorts', id: 'resorts' },
    { name: 'Services', href: '#features', id: 'features' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavLinkClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const handleBookNow = () => {
    setMobileMenuOpen(false);
    if (onBookNowClick) {
      onBookNowClick();
    }
  };

  return (
    <>
      {/* Floating Regal Header Container */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-2.5 sm:pt-4 transition-all duration-500 pointer-events-none ${
          isScrolled ? 'pt-2 sm:pt-3' : 'pt-2.5 sm:pt-5'
        }`}
      >
        <div className="relative w-full max-w-[1100px] pointer-events-auto">
          
          {/* Animated Gold Glowing Outer Pill Container */}
          <div className="relative flex items-center justify-between h-13 sm:h-16 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#15231c]/95 via-[#111d17]/98 to-[#15231c]/95 backdrop-blur-xl border border-gold/30 shadow-2xl animate-gold-pulse transition-all">
            
            {/* Subtle Gradient Border Accent Overlay */}
            <div 
              aria-hidden="true" 
              className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-gold-light/40 via-gold/15 to-gold-light/35 -z-10 opacity-75 pointer-events-none" 
            />

            {/* Brand Logo Section (Left) */}
            <a
              href="#home"
              onClick={() => handleNavLinkClick('home')}
              className="flex items-center space-x-2 sm:space-x-3 shrink-0 lg:pr-4 lg:border-r border-gold-line/40 my-1 group focus:outline-none"
              aria-label="R.S Heritage Homepage"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gold/60 overflow-hidden shadow-glow group-hover:scale-105 transition-transform shrink-0 bg-bg-dark flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="R.S Heritage Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-[10.5px] sm:text-sm md:text-base font-bold tracking-[0.12em] sm:tracking-[0.18em] text-[#e8c97a] block leading-none whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  R.S HERITAGE
                </span>
                <span className="text-[6.5px] sm:text-[8px] md:text-[8.5px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#c8a44a] block mt-1 font-medium whitespace-nowrap font-sans">
                  Marriage & Event Venue
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Center - hidden on mobile/tablet) */}
            <nav
              className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2 flex-1 px-3"
              aria-label="Primary Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavLinkClick(link.id)}
                    className={`re-nav-link ${isActive ? 're-nav-active' : ''}`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action Group - Book Venue & Hamburger Menu */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 lg:pl-4 lg:border-l border-gold-line/40 shrink-0">
              
              {/* Book Venue CTA Button (Responsive for all screen sizes) */}
              <button
                onClick={handleBookNow}
                className="button-21oaks text-[9.5px] sm:text-xs py-1.5 px-3 sm:py-2 sm:px-4"
              >
                <span>Book Venue</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold arrow-icon-rotate" />
              </button>

              {/* Mobile Hamburger Toggle Button (lg:hidden) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gold/40 bg-white/5 hover:bg-white/10 active:scale-95 text-gold-light flex lg:hidden items-center justify-center transition-all focus:outline-none shrink-0"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-gold" />
                ) : (
                  <Menu className="w-4 h-4 text-gold" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay & Content */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-nav-drawer"
        className={`fixed top-16 sm:top-20 left-2.5 right-2.5 sm:left-4 sm:right-4 z-40 lg:hidden regal-bg-pattern border border-gold/30 rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-400 ease-out origin-top ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
      >
        <div className="flex flex-col space-y-4 text-center">
          
          <div className="font-serif text-xs tracking-[0.3em] text-gold/60 uppercase border-b border-gold-line pb-3">
            R.S Heritage Menu
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation Menu">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`font-serif text-base sm:text-lg tracking-[0.18em] uppercase py-2 sm:py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'text-gold-light font-bold bg-gold/15 border border-gold/30'
                      : 'text-gray-300 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile Action Section */}
          <div className="pt-3 border-t border-gold-line flex flex-col space-y-2.5 items-center">
            {isAdmin ? (
              <a
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-gold/20 text-gold-light font-serif font-bold text-xs tracking-wider border border-gold/60 flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Admin Dashboard</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdminLogin) onOpenAdminLogin();
                }}
                className="w-full py-2 rounded-full bg-white/5 text-gold-light font-serif text-xs tracking-wider border border-gold/30 flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={handleBookNow}
              className="re-cta w-full justify-center py-2.5 text-xs"
            >
              <span>Book Venue Now</span>
              <ArrowUpRight className="w-4 h-4 text-gold" />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
