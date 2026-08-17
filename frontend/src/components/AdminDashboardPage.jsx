import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import CommonTable from './CommonTable';
import { ShieldCheck, Mail, Phone, Calendar, Users, MapPin, MessageSquare, Clock, RefreshCw, AlertCircle, LogOut, ArrowLeft, PlusCircle, Check, Trash2 } from 'lucide-react';

const AdminDashboardPage = () => {
  const { token, isAdmin, login, logout } = useAuth();
  const { showToast } = useToast();
  
  // Login states (used if not authenticated)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard states
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Availability form state
  const [targetDate, setTargetDate] = useState('');
  const [targetStatus, setTargetStatus] = useState('available');
  const [updatingAvailability, setUpdatingAvailability] = useState(false);

  // Delete Dialog States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchDashboardData = async () => {
    if (!isAdmin || !token) return;
    setLoading(true);
    setError(null);

    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      
      // Fetch Bookings
      const bookingsRes = await fetch(`${baseUrl}/api/admin/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bookingsData = await bookingsRes.json();

      // Fetch Availability
      const availabilityRes = await fetch(`${baseUrl}/api/admin/availability`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const availabilityData = await availabilityRes.json();

      if (bookingsRes.ok && bookingsData.success) {
        setBookings(bookingsData.bookings || []);
      } else {
        setError(bookingsData.error || 'Failed to fetch bookings list.');
      }

      if (availabilityRes.ok && availabilityData.success) {
        setAvailability(availabilityData.availability || {});
      }
    } catch (err) {
      console.error('Fetch dashboard data error:', err);
      setError('Unable to retrieve data from Neon Database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin && token) {
      fetchDashboardData();
    }
  }, [isAdmin, token]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    const result = await login(username, password);
    setLoggingIn(false);
    if (!result.success) {
      setLoginError(result.error);
    }
  };

  const handleUpdateAvailability = async (e) => {
    e.preventDefault();
    if (!targetDate || !targetStatus) return;
    setUpdatingAvailability(true);

    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/admin/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dateStr: targetDate, status: targetStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAvailability(data.availability || {});
        showToast(`Successfully set ${targetDate} status to: ${targetStatus}`, 'success');
        setTargetDate('');
      } else {
        showToast(data.error || 'Failed to update date status', 'error');
      }
    } catch (err) {
      console.error('Update availability error:', err);
      showToast('Failed to connect to database endpoint.', 'error');
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const handleConfirmBooking = async (id) => {
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/admin/bookings/${id}/confirm`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Booking status updated to confirmed!', 'success');
        fetchDashboardData();
      } else {
        showToast(data.error || 'Failed to confirm booking.', 'error');
      }
    } catch (err) {
      console.error('Confirm booking error:', err);
      showToast('Connection error confirming booking.', 'error');
    }
  };

  const confirmDeleteBooking = async () => {
    if (!deletingBookingId) return;
    setDeleting(true);
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/admin/bookings/${deletingBookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Booking deleted successfully.', 'success');
        setIsDeleteOpen(false);
        setDeletingBookingId(null);
        fetchDashboardData();
      } else {
        showToast(data.error || 'Failed to delete booking.', 'error');
      }
    } catch (err) {
      console.error('Delete booking error:', err);
      showToast('Connection error deleting booking.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeletingBookingId(id);
    setIsDeleteOpen(true);
  };
  // --- RENDERING ADMIN LOGIN FORM (If not authenticated) ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-royal-emeraldDark flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal-gold/15 border-2 border-royal-gold mb-4 shadow-glow">
            <span className="text-3xl">👑</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wider text-gold-gradient">
            R.S HERITAGE
          </h2>
          <p className="mt-2 text-sm text-royal-goldLight/80">
            Admin Panel Login
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/5 border border-white/10 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 backdrop-blur-md">
            
            {loginError && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-royal-goldLight">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  autoComplete="off"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none text-sm text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-royal-goldLight">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none text-sm text-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-royal-gold to-royal-goldDark text-royal-emeraldDark font-bold text-sm tracking-wider uppercase shadow-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center space-x-2"
              >
                {loggingIn ? <span>Authenticating...</span> : <span>Sign In to Dashboard</span>}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center text-xs text-gray-400 border-t border-white/10 pt-4">
              <a href="/" className="flex items-center space-x-1 hover:text-royal-gold transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING DOCKBOARD PAGE (If authenticated) ---
  const headers = [
    'Client / Contact',
    'Event Details',
    'Message / Requirements',
    'Submitted On',
    'Actions'
  ];

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatEventDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-royal-cream text-gray-900 font-sans flex flex-col">
      
      {/* Dashboard Top Header */}
      <header className="bg-royal-emeraldDark text-white border-b-4 border-royal-gold px-6 py-4 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">👑</span>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient leading-none">
                R.S HERITAGE DASHBOARD
              </h1>
              <p className="text-[10px] sm:text-xs text-royal-goldLight/80 uppercase tracking-widest mt-1 font-medium">
                Admin Control Room
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/15 flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Visit Website</span>
            </a>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Panel */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-royal-gold/20 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-royal-emeraldDark/10 text-royal-emeraldDark flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Inquiries</span>
              <span className="text-2xl font-bold text-royal-emeraldDark">{bookings.length} Requests</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-royal-gold/20 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Fast-Filling Dates</span>
              <span className="text-2xl font-bold text-royal-emeraldDark">
                {Object.values(availability).filter(s => s === 'fast-filling').length} Days
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-royal-gold/20 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Booked Dates</span>
              <span className="text-2xl font-bold text-royal-emeraldDark">
                {bookings.filter(b => b.status === 'confirmed').length} Reserved
              </span>
            </div>
          </div>
        </div>

        {/* Middle split: Availability manager (left) + error indicator (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Bookings log table (Col span 12) */}
          <div className="lg:col-span-12 bg-white p-6 sm:p-8 rounded-3xl border border-royal-gold/20 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-royal-emeraldDark">
                Customer Inquiries Log Table
              </h3>
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-royal-emeraldDark transition-colors"
              >
                <RefreshCw className={`w-4.5 h-4.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw className="w-8 h-8 text-royal-emeraldDark animate-spin mb-3" />
                <p className="text-xs font-semibold text-gray-500">Querying data log table...</p>
              </div>
            ) : (
              <CommonTable
                headers={headers}
                data={bookings}
                emptyMessage="No booking inquiries submitted yet."
                renderRow={(row) => (
                  <>
                    {/* Client / Contact */}
                    <td className="px-4 py-3 space-y-1 align-top">
                      <div className="font-bold text-royal-emeraldDark text-sm">{row.name}</div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Mail className="w-3 h-3 text-royal-goldDark shrink-0" />
                        <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3 text-royal-goldDark shrink-0" />
                        <a href={`tel:${row.phone}`} className="hover:underline font-semibold">{row.phone}</a>
                      </div>
                      {row.location && (
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <MapPin className="w-3 h-3 text-royal-goldDark shrink-0" />
                          <span>{row.location}</span>
                        </div>
                      )}
                    </td>

                    {/* Event Details */}
                    <td className="px-4 py-3 space-y-1.5 align-top">
                      <span className="inline-block bg-rose-50 border border-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {row.event_type}
                      </span>
                      <div className="space-y-0.5 text-xs text-gray-700">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-royal-goldDark" />
                          <span className="font-bold text-royal-emeraldDark">{formatEventDate(row.event_date)}</span>
                        </div>
                        {row.guest_count && (
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Users className="w-3 h-3 text-royal-goldDark" />
                            <span>{row.guest_count}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-4 py-3 align-top max-w-xs">
                      {row.message ? (
                        <div className="bg-gray-50 border-l-2 border-royal-gold p-2 rounded-r-lg text-xs text-gray-500 leading-normal whitespace-pre-wrap">
                          {row.message}
                        </div>
                      ) : (
                        <span className="text-gray-300 italic text-xs">No message.</span>
                      )}
                    </td>

                    {/* Submitted Date */}
                    <td className="px-4 py-3 align-top whitespace-nowrap text-xs text-gray-400">
                      <span>{formatDate(row.created_at)}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 align-top whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        {row.status === 'confirmed' ? (
                          <span className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Confirmed</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleConfirmBooking(row.id)}
                            className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Confirm</span>
                          </button>
                        )}



                        <button
                          onClick={() => openDeleteModal(row.id)}
                          className="p-1 rounded-lg border border-red-200 hover:border-red-500 text-red-600 bg-red-50 hover:bg-red-100 transition-all"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              />
            )}
          </div>

        </div>

      </main>

      {/* Dashboard Footer */}
      <footer className="bg-royal-emeraldDark text-white/50 text-center py-6 text-xs border-t border-white/10 mt-auto">
        <p>© {new Date().getFullYear()} R.S Heritage Eco Huts Control Panel. Persistent via Neon Serverless Postgres.</p>
      </footer>

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && deletingBookingId && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-red-200 shadow-2xl w-full max-w-md overflow-hidden transition-all duration-200">
            {/* Header */}
            <div className="bg-red-50 text-red-800 px-6 py-4 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-serif text-base font-bold">
                  Delete Inquiry
                </h3>
              </div>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete this customer inquiry? This action cannot be undone and will permanently remove the record from the database.
              </p>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs uppercase tracking-wider hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteBooking}
                  disabled={deleting}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 active:scale-98 transition-all shadow-md"
                >
                  {deleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
