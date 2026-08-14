import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CommonTable from './CommonTable';
import { ShieldCheck, Mail, Phone, Calendar, Users, MapPin, MessageSquare, Clock, RefreshCw, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { token, isAdmin } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    if (!isAdmin || !token) return;
    setLoading(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${baseUrl}/api/admin/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookings(data.bookings || []);
      } else {
        setError(data.error || 'Failed to fetch bookings list.');
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
      setError('Unable to connect to backend api to retrieve bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin && token) {
      fetchBookings();
    }
  }, [isAdmin, token]);

  if (!isAdmin) return null;

  const headers = [
    'Client / Contact',
    'Event Details',
    'Message / Requirements',
    'Submitted On'
  ];

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatEventDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section id="admin-dashboard" className="py-20 bg-royal-cream border-t-4 border-royal-gold relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-royal-emeraldDark text-royal-gold flex items-center justify-center border-2 border-royal-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-royal-emeraldDark">
                Admin Control Panel
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Review client inquiries & wedding bookings stored in Neon PostgreSQL database
              </p>
            </div>
          </div>

          <button
            onClick={fetchBookings}
            disabled={loading}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-royal-emeraldDark hover:bg-royal-emeraldLight text-royal-gold text-xs font-bold border border-royal-gold/40 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Table</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-royal-gold/20 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-royal-emeraldDark/10 text-royal-emeraldDark flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Total Inquiries</span>
              <span className="text-3xl font-serif font-bold text-royal-emeraldDark">{bookings.length} Requests</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-royal-gold/20 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-royal-emeraldDark/10 text-royal-emeraldDark flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Target Database</span>
              <span className="text-sm font-bold text-royal-emeraldDark truncate block max-w-[200px]" title="Neon Serverless PostgreSQL">Neon Serverless SQL</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-royal-gold/20 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-royal-emeraldDark/10 text-royal-emeraldDark flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Session Access</span>
              <span className="text-sm font-bold text-royal-emeraldDark block">Role-Based Admin (JWT)</span>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Inquiries Table */}
        <div className="relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/60 rounded-2xl border border-royal-gold/20">
              <RefreshCw className="w-10 h-10 text-royal-emeraldDark animate-spin mb-4" />
              <p className="text-sm font-medium text-royal-emeraldDark">Loading database inquiry logs...</p>
            </div>
          ) : (
            <CommonTable
              headers={headers}
              data={bookings}
              emptyMessage="No booking inquiries registered in Neon Database yet."
              renderRow={(row) => (
                <>
                  {/* Client / Contact */}
                  <td className="px-6 py-4.5 space-y-1.5 align-top">
                    <div className="font-bold text-royal-emeraldDark text-sm">{row.name}</div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-royal-goldDark shrink-0" />
                      <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-royal-goldDark shrink-0" />
                      <a href={`tel:${row.phone}`} className="hover:underline font-semibold">{row.phone}</a>
                    </div>
                    {row.location && (
                      <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-royal-goldDark shrink-0" />
                        <span>{row.location}</span>
                      </div>
                    )}
                  </td>

                  {/* Event Details */}
                  <td className="px-6 py-4.5 space-y-2 align-top">
                    <div>
                      <span className="inline-block bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {row.event_type}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-royal-goldDark shrink-0" />
                        <span className="font-bold text-royal-emeraldDark">{formatEventDate(row.event_date)}</span>
                      </div>
                      {row.guest_count && (
                        <div className="flex items-center space-x-1.5 text-gray-500">
                          <Users className="w-3.5 h-3.5 text-royal-goldDark shrink-0" />
                          <span>{row.guest_count}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Message */}
                  <td className="px-6 py-4.5 align-top max-w-sm">
                    {row.message ? (
                      <div className="bg-gray-50 border-l-2 border-royal-gold p-2.5 rounded-r-lg text-xs text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                        {row.message}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-xs">No special requirements mentioned.</span>
                    )}
                  </td>

                  {/* Submitted Date */}
                  <td className="px-6 py-4.5 align-top whitespace-nowrap text-xs text-gray-500 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-royal-goldDark shrink-0" />
                      <span>{formatDate(row.created_at)}</span>
                    </div>
                  </td>
                </>
              )}
            />
          )}
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;
