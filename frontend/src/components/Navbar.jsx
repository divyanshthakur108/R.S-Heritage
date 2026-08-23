import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, Calendar, ShieldCheck, LogOut, Instagram, ChevronRight } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onBookNowClick, onOpenCalendar, onOpenAdminLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, isAdmin, logout } = useAuth();
  const navRef = useRef(null);

  // Handle scroll detection and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Active section scroll spy
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

  // Lock background body scroll when mobile menu drawer is open
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

  // Close mobile drawer on Escape key or when window resizes past tablet breakpoint
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
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
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Venues & Lawns', href: '#resorts', id: 'resorts' },
    { name: 'Services', href: '#features', id: 'features' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
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
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-royal-emeraldDark/95 backdrop-blur-md shadow-2xl h-16 sm:h-20 border-b border-royal-gold/30'
            : 'bg-gradient-to-b from-royal-emeraldDark/95 via-royal-emeraldDark/75 to-transparent h-16 sm:h-20 md:h-24'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-2 md:gap-4">
            
            {/* Brand Logo & Title (Left) */}
            <a
              href="#home"
              onClick={() => handleNavLinkClick('home')}
              className="flex items-center space-x-2 sm:space-x-3 group shrink-0 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-royal-gold/50 rounded-lg p-1"
              aria-label="R.S Heritage Homepage"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-royal-gold overflow-hidden shadow-glow group-hover:scale-105 transition-transform shrink-0 bg-royal-emeraldDark flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="R.S Heritage Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wider text-gold-gradient block leading-tight whitespace-nowrap">
                  R.S HERITAGE
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-royal-goldLight/80 block mt-0.5 font-medium whitespace-nowrap">
                  Marriage & Event Venue
                </span>
              </div>
            </a>

            {/* Desktop & Tablet Navigation Links (768px+) */}
            <nav
              className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4 xl:space-x-7 shrink-0"
              aria-label="Primary Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavLinkClick(link.id)}
                    className={`group relative text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 py-2 px-1 lg:px-2 min-h-[44px] inline-flex items-center whitespace-nowrap rounded-md focus:outline-none focus:ring-1 focus:ring-royal-gold/60 ${
                      isActive
                        ? 'text-royal-gold font-semibold'
                        : 'text-white/85 hover:text-royal-gold'
                    }`}
                  >
                    <span>{link.name}</span>
                    
                    {/* Active & Hover Gold Indicator */}
                    <span
                      className={`absolute bottom-1.5 left-1 lg:left-2 right-1 lg:right-2 h-[2px] bg-royal-gold rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-[calc(100%-8px)] lg:w-[calc(100%-16px)] opacity-100'
                          : 'w-0 opacity-0 group-hover:w-[calc(100%-8px)] lg:group-hover:w-[calc(100%-16px)] group-hover:opacity-70'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Desktop & Tablet Action Group (768px+) */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-3.5 shrink-0">
              
              {/* Admin Auth Status */}
              {isAdmin ? (
                <div className="flex items-center space-x-1.5 shrink-0">
                  <a
                    href="/dashboard"
                    className="min-h-[44px] px-3 py-2 rounded-full bg-royal-gold/20 text-royal-gold text-xs font-bold border border-royal-gold/60 flex items-center space-x-1.5 transition-all hover:bg-royal-gold/30 shadow-glow whitespace-nowrap"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-royal-gold shrink-0" />
                    <span className="hidden xl:inline">Admin Dashboard</span>
                    <span className="xl:hidden">Dashboard</span>
                  </a>
                  <button
                    onClick={logout}
                    title="Sign out of Admin Session"
                    aria-label="Sign out of Admin Session"
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/20 transition-all flex items-center justify-center"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAdminLogin}
                  className="hidden xl:flex min-h-[44px] px-3 py-2 rounded-full bg-white/5 hover:bg-white/15 text-royal-goldLight text-xs font-medium border border-royal-gold/30 hover:border-royal-gold/60 items-center space-x-1.5 transition-all shadow-sm shrink-0 whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-royal-gold shrink-0" />
                  <span>Admin Login</span>
                </button>
              )}

              {/* Phone Quick Call */}
              <a
                href={`tel:${VENUE_INFO.phonePrimary}`}
                className="hidden lg:flex min-h-[44px] items-center space-x-1.5 text-royal-goldLight hover:text-royal-gold text-xs font-semibold transition-colors shrink-0 whitespace-nowrap px-1"
                aria-label={`Call R.S Heritage at ${VENUE_INFO.phonePrimary}`}
              >
                <Phone className="w-3.5 h-3.5 text-royal-gold animate-bounce shrink-0" />
                <span>{VENUE_INFO.phonePrimary}</span>
              </a>

              {/* Instagram Quick Link */}
              <a
                href="https://www.instagram.com/rs_heritage_eco_huts/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-royal-gold/30 hover:border-royal-gold/60 text-royal-goldLight hover:text-royal-gold bg-white/5 hover:bg-white/10 transition-colors shrink-0 items-center justify-center"
                title="Follow us on Instagram"
                aria-label="Follow R.S Heritage on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              {/* Primary CTA: Book Venue */}
              <button
                onClick={handleBookNow}
                className="min-h-[44px] px-3.5 sm:px-4 lg:px-5 py-2.5 rounded-full bg-gradient-to-r from-royal-gold via-royal-goldLight to-royal-goldDark text-royal-emeraldDark text-xs lg:text-sm font-bold tracking-wide shadow-glow hover:brightness-110 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 shrink-0 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Book Venue</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button (below 768px / md:hidden) */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl border border-royal-gold/30 bg-white/5 hover:bg-white/10 active:scale-95 text-royal-goldLight hover:text-royal-gold flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-royal-gold/50"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 transform rotate-0 transition-transform duration-200" />
                ) : (
                  <Menu className="w-6 h-6 transition-transform duration-200" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/65 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Slide-Down Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed top-16 sm:top-20 left-0 right-0 z-40 md:hidden bg-royal-emeraldDark/98 backdrop-blur-2xl border-b border-royal-gold/30 shadow-2xl transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible max-h-[calc(100vh-4rem)]'
            : 'opacity-0 -translate-y-3 pointer-events-none invisible max-h-0'
        }`}
      >
        <div className="px-4 py-5 sm:px-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
          
          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Mobile Navigation Menu">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`min-h-[48px] px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 ${
                    isActive
                      ? 'bg-royal-gold/15 text-royal-gold font-bold border border-royal-gold/30'
                      : 'text-gray-100 hover:text-royal-gold hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  <span className="text-sm sm:text-base font-medium tracking-wide">{link.name}</span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-royal-gold shadow-glow" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action & Contact Section in Mobile Drawer */}
          <div className="pt-3 border-t border-white/10 flex flex-col space-y-2.5">
            
            {/* Admin Authentication */}
            {isAdmin ? (
              <div className="space-y-2">
                <a
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-royal-gold/20 text-royal-gold font-bold text-xs sm:text-sm tracking-wider border border-royal-gold/60 flex items-center justify-center space-x-2 transition-all hover:bg-royal-gold/30 shadow-glow"
                >
                  <ShieldCheck className="w-4 h-4 text-royal-gold shrink-0" />
                  <span>Admin Dashboard</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-red-500/15 text-red-300 font-semibold text-xs sm:text-sm border border-red-500/30 flex items-center justify-center space-x-2 transition-all hover:bg-red-500/25"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sign Out (Admin)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdminLogin) {
                    onOpenAdminLogin();
                  }
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-royal-goldLight font-medium text-xs sm:text-sm tracking-wide border border-royal-gold/30 flex items-center justify-center space-x-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-royal-gold shrink-0" />
                <span>Admin Login</span>
              </button>
            )}

            {/* Phone Quick Call */}
            <a
              href={`tel:${VENUE_INFO.phonePrimary}`}
              className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-royal-goldLight flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-royal-gold shrink-0 animate-bounce" />
              <span>{VENUE_INFO.phonePrimary}</span>
            </a>

            {/* Instagram Quick Link */}
            <a
              href="https://www.instagram.com/rs_heritage_eco_huts/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-royal-goldLight hover:text-royal-gold flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium border border-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4 text-royal-gold shrink-0" />
              <span>Follow on Instagram</span>
            </a>

            {/* Primary CTA: Book Venue Now */}
            <button
              onClick={handleBookNow}
              className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-gradient-to-r from-royal-gold via-royal-goldLight to-royal-goldDark text-royal-emeraldDark font-bold tracking-wider shadow-glow text-sm uppercase flex items-center justify-center space-x-2 hover:brightness-110 active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book Venue Now</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;

