import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto w-full flex items-start gap-3 p-4 rounded-2xl shadow-xl backdrop-blur-md border animate-slideIn transition-all duration-300 ${
                isSuccess
                  ? 'bg-royal-emeraldDark/95 border-royal-gold/40 text-white shadow-royal-emeraldDark/20'
                  : isError
                  ? 'bg-red-950/95 border-red-500/40 text-red-200 shadow-red-950/20'
                  : 'bg-white/90 border-gray-200 text-gray-800'
              }`}
            >
              {/* Icon */}
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-royal-gold shrink-0 mt-0.5 animate-bounce" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              ) : (
                <Sparkles className="w-5 h-5 text-royal-goldDark shrink-0 mt-0.5" />
              )}

              {/* Message */}
              <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
                {toast.message}
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/40 hover:text-white transition-colors shrink-0 p-0.5 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
