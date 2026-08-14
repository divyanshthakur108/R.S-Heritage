import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, AlertCircle, Sparkles, Send, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CalendarModal = ({ isOpen, onClose, onDateSelect }) => {
  const { token, isAdmin } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026 default
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (isOpen && isAdmin && token) {
      fetchAdminAvailability();
    }
  }, [isOpen, isAdmin, token]);

  const fetchAdminAvailability = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const response = await fetch('/api/admin/availability', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAvailabilityMap(data.availability || {});
      } else {
        setApiError(data.error || 'Failed to fetch protected admin availability');
      }
    } catch (err) {
      console.error('Fetch availability error:', err);
      setApiError('Unable to connect to backend availability endpoint.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (dateStr, newStatus) => {
    if (!isAdmin || !token) return;

    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dateStr, status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAvailabilityMap(data.availability);
      } else {
        alert(data.error || 'Failed to update date status');
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const getBookedStatus = (day) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    if (availabilityMap[dateStr]) {
      return availabilityMap[dateStr];
    }

    const defaultBookedDays = [5, 12, 18, 24, 28];
    const defaultFastFillingDays = [2, 9, 15, 21, 29];

    if (defaultBookedDays.includes(day)) return 'booked';
    if (defaultFastFillingDays.includes(day)) return 'fast-filling';
    return 'available';
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDayClick = (day, status) => {
    if (status === 'booked') return;
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    setSelectedDate({ day, dateStr, status });
  };

  const handleConfirmDate = () => {
    if (selectedDate && onDateSelect) {
      onDateSelect(selectedDate.dateStr);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-royal-emeraldDark/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-royal-emeraldDark text-white rounded-3xl border border-royal-gold/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-royal-emeraldLight/80 border-b border-royal-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-royal-gold/20 text-royal-gold flex items-center justify-center border border-royal-gold/40">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gold-gradient leading-none">
                Check Venue Date Availability
              </h3>
              <p className="text-xs text-royal-goldLight/80 mt-1">
                Select your target wedding or event date
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Calendar Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl text-royal-gold hover:bg-royal-gold/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <span className="font-serif text-lg font-bold text-white block">
                {monthNames[month]} {year}
              </span>
              <span className="text-[11px] text-royal-gold uppercase tracking-widest font-semibold">
                R.S Heritage Availability Calendar
              </span>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl text-royal-gold hover:bg-royal-gold/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Color Legend */}
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-300 py-1 border-y border-white/5">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
              <span>Fast Filling</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm" />
              <span>Booked / Reserved</span>
            </div>
          </div>

          {/* Calendar Days Grid */}
          <div>
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-royal-gold mb-2 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty padding days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-11 rounded-xl bg-transparent" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const status = getBookedStatus(day);
                const isSelected = selectedDate?.day === day;

                let statusBg = 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100 hover:border-royal-gold hover:bg-royal-gold/20 cursor-pointer';
                let dotColor = 'bg-emerald-500';

                if (status === 'booked') {
                  statusBg = 'bg-rose-950/30 border-rose-500/20 text-rose-300/40 cursor-not-allowed line-through';
                  dotColor = 'bg-rose-500';
                } else if (status === 'fast-filling') {
                  statusBg = 'bg-amber-950/40 border-amber-500/40 text-amber-100 hover:border-royal-gold hover:bg-royal-gold/20 cursor-pointer';
                  dotColor = 'bg-amber-400';
                }

                if (isSelected) {
                  statusBg = 'bg-royal-gold text-royal-emeraldDark font-bold border-2 border-white scale-105 shadow-glow';
                }

                return (
                  <button
                    key={day}
                    disabled={status === 'booked'}
                    onClick={() => handleDayClick(day, status)}
                    className={`h-11 rounded-xl border transition-all flex flex-col items-center justify-center relative ${statusBg}`}
                  >
                    <span className="text-sm font-semibold">{day}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} absolute bottom-1.5`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Summary & CTA */}
          {selectedDate ? (
            <div className="p-4 rounded-2xl bg-royal-gold/10 border border-royal-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-royal-gold shrink-0" />
                <div>
                  <span className="text-xs text-royal-goldLight uppercase tracking-wider block">Selected Date</span>
                  <span className="font-serif text-lg font-bold text-white">
                    {selectedDate.dateStr} ({selectedDate.status === 'fast-filling' ? 'Fast Filling ⚡' : 'Available ✨'})
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmDate}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-royal-gold to-royal-goldDark text-royal-emeraldDark font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Book This Date</span>
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400 py-2">
              💡 Tip: Click on any green or amber date to pre-select it for your booking inquiry.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CalendarModal;
