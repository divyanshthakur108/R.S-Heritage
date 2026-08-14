import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await login(username, password);

    setSubmitting(false);

    if (result.success) {
      onClose();
      // Wait for UI to mount, then scroll to dashboard
      setTimeout(() => {
        const dashboard = document.getElementById('admin-dashboard');
        if (dashboard) {
          dashboard.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-royal-emeraldDark/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-royal-emeraldDark text-white rounded-3xl border border-royal-gold/40 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-royal-gold/20 text-royal-gold flex items-center justify-center border border-royal-gold/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gold-gradient">
                Admin Authentication
              </h3>
              <p className="text-xs text-royal-goldLight/80">
                Sign in to manage venue date availability
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-goldLight mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-royal-gold absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none text-sm text-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-goldLight mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-royal-gold absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none text-sm text-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-royal-gold to-royal-goldDark text-royal-emeraldDark font-bold text-sm tracking-wider uppercase shadow-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In As Admin</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLoginModal;
