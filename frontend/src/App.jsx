import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Resorts from './components/Resorts';
import Features from './components/Features';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CalendarModal from './components/CalendarModal';
import AdminLoginModal from './components/AdminLoginModal';
import { AuthProvider } from './context/AuthContext';

function MainApp() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-royal-cream text-gray-900 font-sans">
      <Navbar 
        onBookNowClick={scrollToContact} 
        onOpenCalendar={() => setIsCalendarOpen(true)} 
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />
      <main>
        <Hero 
          onBookNowClick={scrollToContact} 
          onOpenAdminCalendar={() => setIsCalendarOpen(true)}
        />
        <AboutUs />
        <Resorts onBookNowClick={scrollToContact} />
        <Features />
        <Gallery />
        <ContactForm selectedDate={selectedDate} />
      </main>
      <Footer />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
