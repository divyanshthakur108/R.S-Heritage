import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Calendar, Users, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import PhoneInput from 'react-phone-input-2';
import { useToast } from '../context/ToastContext';
import Reveal from './Reveal';
import 'react-phone-input-2/lib/style.css';

const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const ContactForm = ({ selectedDate }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    eventDate: '',
    guestCount: '',
    eventType: 'Wedding Ceremony',
    message: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    eventDate: '',
    guestCount: ''
  });

  React.useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, eventDate: selectedDate }));
      setErrors(prev => ({ ...prev, eventDate: '' }));
    }
  }, [selectedDate]);

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null
  });

  const validateField = (name, value) => {
    let errMsg = '';
    if (name === 'phone') {
      const clean = (value || '').replace(/\D/g, '');
      if (!clean || clean.length < 10) {
        errMsg = 'Please enter a valid 10-digit phone number.';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value.trim())) {
        errMsg = 'Please enter a valid email address (e.g. name@domain.com).';
      }
    } else if (name === 'eventDate') {
      const today = getTodayDateString();
      if (!value) {
        errMsg = 'Event date is required.';
      } else if (value < today) {
        errMsg = 'Venue bookings cannot be set for past days.';
      }
    } else if (name === 'guestCount') {
      if (!value) {
        errMsg = 'Please enter estimated guest count.';
      } else if (!/^\d+$/.test(value) || parseInt(value, 10) <= 0) {
        errMsg = 'Estimated guests count must be greater than 0.';
      }
    }
    setErrors(prev => ({ ...prev, [name]: errMsg }));
    return !errMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'eventDate' || name === 'email') {
      validateField(name, value);
    }
  };

  const handleGuestChange = (e) => {
    const { value } = e.target;
    const cleanValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, guestCount: cleanValue }));
    
    if (!cleanValue) {
      setErrors(prev => ({ ...prev, guestCount: 'Guest count is required.' }));
    } else {
      setErrors(prev => ({ ...prev, guestCount: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate name, email, phone, event date, guest count
    const isNameValid = !!formData.name.trim();
    const isEmailValid = validateField('email', formData.email);
    const isPhoneValid = validateField('phone', formData.phone);
    const isDateValid = validateField('eventDate', formData.eventDate);
    const isGuestsValid = validateField('guestCount', formData.guestCount);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isDateValid || !isGuestsValid) {
      setStatus({
        loading: false,
        success: null,
        error: 'Please correct the validation errors below before submitting.'
      });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.', 'success');
        setStatus({
          loading: false,
          success: null,
          error: null
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          eventDate: '',
          guestCount: '',
          eventType: 'Wedding Ceremony',
          message: ''
        });
        setErrors({
          email: '',
          phone: '',
          eventDate: '',
          guestCount: ''
        });
      } else {
        setStatus({
          loading: false,
          success: null,
          error: data.error || 'Unable to submit your enquiry right now. Please try again or call us directly.'
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus({
        loading: false,
        success: null,
        error: 'Unable to submit your enquiry right now. Please try again or call us directly.'
      });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 regal-bg-pattern relative overflow-hidden text-white border-t border-gold-line w-full max-w-full">
      <div className="regal-bg-overlay" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-gold uppercase">
              Reserve Your Dates
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white mb-3 sm:mb-4">
            Book Your Wedding & <span className="font-hand text-gold-light text-3xl sm:text-5xl md:text-6xl px-1 font-normal">Celebration</span>
          </h2>
          <div className="flex items-center justify-center space-x-2 my-3 sm:my-4">
            <div className="w-12 sm:w-16 h-[1px] bg-gold/40" />
            <div className="w-1.5 h-1.5 border border-gold rotate-45 shrink-0" />
            <div className="w-12 sm:w-16 h-[1px] bg-gold/40" />
          </div>
          <p className="font-garamond text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            Send us your event details or call our venue manager directly to check dates and schedule a private site visit.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Venue Contacts */}
          <div className="lg:col-span-5 bg-[#14100d]/90 text-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-gold/30 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-gold text-xs font-serif tracking-[0.2em] uppercase mb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Private Consultation</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-gold-light mb-3">
                R.S Heritage Office
              </h3>
              <p className="font-garamond text-gray-300 text-base leading-relaxed">
                Visit our estate for a personal tour of the Grand Lawns, Imperial Banquet Hall, and Luxury Preparation Suites.
              </p>
            </div>

            <div className="space-y-6 border-t border-gold-line pt-6">
              
              <div className="flex items-start space-x-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs text-gold uppercase tracking-wider font-serif">Direct Calls & WhatsApp</h4>
                  <a href={`tel:${VENUE_INFO.phonePrimary}`} className="contact-link block text-white font-bold hover:text-gold text-base mt-0.5 font-sans">
                    {VENUE_INFO.phonePrimary}
                  </a>
                  <a href={`tel:${VENUE_INFO.phoneSecondary}`} className="contact-link block text-gray-400 text-sm hover:text-gold font-sans">
                    {VENUE_INFO.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs text-gold uppercase tracking-wider font-serif">Email Inquiries</h4>
                  <a href={`mailto:${VENUE_INFO.email}`} className="contact-link text-white font-medium hover:text-gold text-sm block mt-0.5 font-sans break-all">
                    {VENUE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs text-gold uppercase tracking-wider font-serif">Venue Address</h4>
                  <p className="text-gray-300 text-sm leading-snug mt-0.5 font-sans">
                    {VENUE_INFO.address}
                  </p>
                </div>
              </div>

            </div>

            <div className="bg-bg-dark/80 p-4 rounded-xl border border-gold/25 text-center">
              <span className="text-xs text-gold/80 block font-serif tracking-wider uppercase">Office Hours</span>
              <span className="text-sm font-bold text-white font-sans">Monday - Sunday: 9:00 AM - 9:00 PM</span>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-[#14100d]/90 p-5 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gold/30 text-white">
            <h3 className="font-serif text-2xl font-light text-gold-light mb-6">
              Send Date Availability Request
            </h3>

            {/* Notification Badges */}
            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 flex items-start space-x-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.success}</p>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={formData.phone}
                    onChange={(phone) => {
                      setFormData(prev => ({ ...prev, phone }));
                      if (phone.length < 10) {
                        setErrors(prev => ({ ...prev, phone: 'Please enter a valid 10-digit phone number.' }));
                      } else {
                        setErrors(prev => ({ ...prev, phone: '' }));
                      }
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '46px',
                      borderRadius: '12px',
                      border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                      fontSize: '15px',
                      paddingLeft: '48px',
                      outline: 'none',
                      fontFamily: 'sans-serif'
                    }}
                    buttonStyle={{
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                      border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                      borderRight: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }}
                    dropdownStyle={{
                      backgroundColor: '#14100d',
                      color: '#ffffff',
                      borderColor: 'rgba(200, 164, 74, 0.3)'
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-400 font-medium mt-1.5 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Email & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vikram@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/15'
                    } text-white placeholder-gray-400 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 font-medium mt-1.5 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                    Event Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#1c1611] border border-white/15 text-white focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                  >
                    <option value="Wedding Ceremony" className="bg-[#14100d] text-white">Wedding Ceremony</option>
                    <option value="Grand Reception" className="bg-[#14100d] text-white">Grand Reception</option>
                    <option value="Haldi / Sangeet / Mehendi" className="bg-[#14100d] text-white">Haldi / Sangeet / Mehendi</option>
                    <option value="Ring Ceremony / Engagement" className="bg-[#14100d] text-white">Ring Ceremony / Engagement</option>
                    <option value="Birthday & Anniversary" className="bg-[#14100d] text-white">Birthday & Anniversary</option>
                    <option value="Corporate Gala / Exhibition" className="bg-[#14100d] text-white">Corporate Gala / Exhibition</option>
                  </select>
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                  Customer Location / City
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Chandigarh / Mohali / Panchkula"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Date & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                    Target Event Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    min={getTodayDateString()}
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white outline-none text-sm transition-all ${
                      errors.eventDate ? 'border-red-500 focus:ring-red-400/20' : 'border-white/15 focus:border-royal-gold focus:ring-royal-gold/20'
                    } focus:ring-2`}
                  />
                  {errors.eventDate && (
                    <span className="text-xs text-red-400 font-medium mt-1.5 block">
                      {errors.eventDate}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                    Estimated Guests <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="guestCount"
                    required
                    value={formData.guestCount}
                    onChange={handleGuestChange}
                    placeholder="e.g. 500"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-400 outline-none text-sm transition-all ${
                      errors.guestCount ? 'border-red-500 focus:ring-red-400/20' : 'border-white/15 focus:border-royal-gold focus:ring-royal-gold/20'
                    } focus:ring-2`}
                  />
                  {errors.guestCount && (
                    <span className="text-xs text-red-400 font-medium mt-1.5 block">
                      {errors.guestCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                  Special Requirements / Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your catering, decor preferences, or specific lawn requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-royal-gold via-royal-goldLight to-royal-goldDark text-royal-emeraldDark font-bold text-base tracking-wider uppercase shadow-glow hover:brightness-105 active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Venue Inquiry</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
