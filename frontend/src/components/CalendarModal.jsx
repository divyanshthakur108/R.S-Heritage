import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, AlertCircle, Sparkles, Send, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const CalendarModal = ({ isOpen, onClose, onDateSelect }) => {
  const { token, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchAvailability();
    }
  }, [isOpen, isAdmin, token]);

  const fetchAvailability = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const endpoint = (isAdmin && token) ? '/api/admin/availability' : '/api/availability';
      const headers = (isAdmin && token) ? { 'Authorization': `Bearer ${token}` } : {};

      const response = await fetch(`${baseUrl}${endpoint}`, { headers });
      const data = await response.json();

      if (response.ok && data.success) {
        setAvailabilityMap(data.availability || {});
      } else {
        setApiError(data.error || 'Failed to fetch date availability');
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
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/admin/availability`, {
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
        showToast(`Successfully updated date status for ${dateStr}.`, 'success');
      } else {
        showToast(data.error || 'Failed to update date status', 'error');
      }
    } catch (err) {
      console.error('Update status error:', err);
      showToast('Failed to update date status.', 'error');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-royal-emeraldDark/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-royal-emeraldDark text-white rounded-2xl sm:rounded-3xl border border-royal-gold/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 bg-royal-emeraldLight/80 border-b border-royal-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-royal-gold/20 text-royal-gold flex items-center justify-center border border-royal-gold/40 shrink-0">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-xl font-bold text-gold-gradient leading-tight">
                Date Availability
              </h3>
              <p className="text-[10.5px] sm:text-xs text-royal-goldLight/80 mt-0.5">
                Select your target wedding or event date
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Calendar Modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-royal-gold hover:bg-royal-gold/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="text-center">
              <span className="font-serif text-base sm:text-lg font-bold text-white block">
                {monthNames[month]} {year}
              </span>
              <span className="text-[9.5px] sm:text-[11px] text-royal-gold uppercase tracking-wider font-semibold">
                Availability Calendar
              </span>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-royal-gold hover:bg-royal-gold/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-gray-300 py-1 border-y border-white/5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-sm" />
              <span>Fast Filling</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm" />
              <span>Booked</span>
            </div>
          </div>

          {/* Calendar Days Grid */}
          <div>
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-bold text-royal-gold mb-1.5 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Empty padding days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9 sm:h-11 rounded-lg sm:rounded-xl bg-transparent" />
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
                    className={`h-9 sm:h-11 rounded-lg sm:rounded-xl border transition-all flex flex-col items-center justify-center relative ${statusBg}`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">{day}</span>
                    <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${dotColor} absolute bottom-1 sm:bottom-1.5`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Summary & CTA */}
          {selectedDate ? (
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-royal-gold/10 border border-royal-gold/40 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 animate-fadeIn">
              <div className="flex items-center space-x-2.5 sm:space-x-3 text-center sm:text-left">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-royal-gold shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-xs text-royal-goldLight uppercase tracking-wider block">Selected Date</span>
                  <span className="font-serif text-sm sm:text-lg font-bold text-white">
                    {selectedDate.dateStr} ({selectedDate.status === 'fast-filling' ? 'Fast Filling ⚡' : 'Available ✨'})
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmDate}
                className="w-full sm:w-auto min-h-[44px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-royal-gold to-royal-goldDark text-royal-emeraldDark font-bold text-xs sm:text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Book This Date</span>
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400 py-1.5">
              💡 Tip: Click on any green or amber date to pre-select it for your booking inquiry.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CalendarModal;
