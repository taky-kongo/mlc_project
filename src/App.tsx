// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm'; // Import du nouveau composant
import Footer from './components/Footer';
import AboutUs from "./components/AboutUs.tsx";
import PhotoGallery from "./components/PhotoGallery.tsx";
import TimedModal from "./components/TimedModal.tsx";

const App: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white font-sans antialiased">
            <Header />
            <main>
                <Hero />
                <TimedModal />
                <Benefits />
                <HowItWorks />
                <AboutUs />
                <PhotoGallery />
                {/* Ajout du formulaire de contact */}
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
};

export default App;