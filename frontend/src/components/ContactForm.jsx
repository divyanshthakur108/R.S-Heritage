import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Calendar, Users, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import PhoneInput from 'react-phone-input-2';
import { useToast } from '../context/ToastContext';
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
      if (!value || value.length < 10) {
        errMsg = 'Please enter a valid phone number.';
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
      } else if (!/^\d+$/.test(value)) {
        errMsg = 'Estimated guests count must be a numeric value.';
      }
    }
    setErrors(prev => ({ ...prev, [name]: errMsg }));
    return !errMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'eventDate') {
      validateField('eventDate', value);
    }
  };

  const handleGuestChange = (e) => {
    const { value } = e.target;
    // Strip non-digit characters so user cannot type string characters
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
    
    // Validate phone, event date, guest count
    const isPhoneValid = validateField('phone', formData.phone);
    const isDateValid = validateField('eventDate', formData.eventDate);
    const isGuestsValid = validateField('guestCount', formData.guestCount);

    if (!isPhoneValid || !isDateValid || !isGuestsValid) {
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
          phone: '',
          eventDate: '',
          guestCount: ''
        });
      } else {
        setStatus({
          loading: false,
          success: null,
          error: 'Unable to submit your enquiry right now. Please try again or call us directly.'
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
    <section id="contact" className="py-24 bg-royal-sand relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-royal-goldDark font-semibold text-sm uppercase tracking-widest block mb-2">
            Reserve Your Dates
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-royal-emeraldDark mb-4">
            Book Your Wedding & Celebration
          </h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
          <p className="text-gray-600 text-base sm:text-lg">
            Send us your event details or call our venue manager directly to check dates and schedule a private site visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Venue Contacts */}
          <div className="lg:col-span-5 bg-royal-emeraldDark text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-royal-gold/30 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-royal-gold text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Private Consultation</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient mb-3">
                R.S Heritage Office
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Visit our estate for a personal tour of the Grand Lawns, Imperial Banquet Hall, and Luxury Preparation Suites.
              </p>
            </div>

            <div className="space-y-6 border-t border-white/10 pt-6">
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-royal-gold/10 text-royal-gold flex items-center justify-center shrink-0 border border-royal-gold/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-royal-goldLight uppercase tracking-wider font-semibold">Direct Calls & WhatsApp</h4>
                  <a href={`tel:${VENUE_INFO.phonePrimary}`} className="block text-white font-bold hover:text-royal-gold text-base mt-0.5">
                    {VENUE_INFO.phonePrimary}
                  </a>
                  <a href={`tel:${VENUE_INFO.phoneSecondary}`} className="block text-gray-300 text-sm hover:text-royal-gold">
                    {VENUE_INFO.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-royal-gold/10 text-royal-gold flex items-center justify-center shrink-0 border border-royal-gold/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-royal-goldLight uppercase tracking-wider font-semibold">Email Inquiries</h4>
                  <a href={`mailto:${VENUE_INFO.email}`} className="text-white font-medium hover:text-royal-gold text-sm block mt-0.5">
                    {VENUE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-royal-gold/10 text-royal-gold flex items-center justify-center shrink-0 border border-royal-gold/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-royal-goldLight uppercase tracking-wider font-semibold">Venue Address</h4>
                  <p className="text-gray-300 text-sm leading-snug mt-0.5">
                    {VENUE_INFO.address}
                  </p>
                </div>
              </div>

            </div>

            <div className="bg-royal-emeraldLight/60 p-4 rounded-xl border border-royal-gold/20 text-center">
              <span className="text-xs text-royal-goldLight/80 block">Office Hours</span>
              <span className="text-sm font-bold text-white">Monday - Sunday: 9:00 AM - 9:00 PM</span>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-royal-gold/20">
            <h3 className="font-serif text-2xl font-bold text-royal-emeraldDark mb-6">
              Send Date Availability Request
            </h3>

            {/* Notification Badges */}
            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start space-x-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.success}</p>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={formData.phone}
                    onChange={(phone) => {
                      setFormData(prev => ({ ...prev, phone }));
                      if (phone.length < 10) {
                        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number with country code.' }));
                      } else {
                        setErrors(prev => ({ ...prev, phone: '' }));
                      }
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '46px',
                      borderRadius: '12px',
                      border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      paddingLeft: '48px',
                      outline: 'none',
                      fontFamily: 'sans-serif'
                    }}
                    buttonStyle={{
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                      border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRight: 'none',
                      backgroundColor: 'transparent'
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500 font-medium mt-1.5 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Email & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vikram@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all bg-white"
                  >
                    <option value="Wedding Ceremony">Wedding Ceremony</option>
                    <option value="Grand Reception">Grand Reception</option>
                    <option value="Haldi / Sangeet / Mehendi">Haldi / Sangeet / Mehendi</option>
                    <option value="Ring Ceremony / Engagement">Ring Ceremony / Engagement</option>
                    <option value="Birthday & Anniversary">Birthday & Anniversary</option>
                    <option value="Corporate Gala / Exhibition">Corporate Gala / Exhibition</option>
                  </select>
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Customer Location / City
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Chandigarh / Mohali / Panchkula"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Date & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Target Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    min={getTodayDateString()}
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                      errors.eventDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-royal-gold focus:ring-royal-gold/20'
                    } focus:ring-2`}
                  />
                  {errors.eventDate && (
                    <span className="text-xs text-red-500 font-medium mt-1.5 block">
                      {errors.eventDate}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Estimated Guests <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="guestCount"
                    required
                    value={formData.guestCount}
                    onChange={handleGuestChange}
                    placeholder="e.g. 500"
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                      errors.guestCount ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-royal-gold focus:ring-royal-gold/20'
                    } focus:ring-2`}
                  />
                  {errors.guestCount && (
                    <span className="text-xs text-red-500 font-medium mt-1.5 block">
                      {errors.guestCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Special Requirements / Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your catering, decor preferences, or specific lawn requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none text-sm transition-all"
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
