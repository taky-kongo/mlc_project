// src/App.tsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import PhotoGallery from './components/PhotoGallery';
import ContactForm from './components/ContactForm';
import TimedModal from './components/TimedModal';
import Footer from './components/Footer';

const App = () => {
    // État central pour contrôler l'affichage de la modale
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Logique du timer de 30 secondes
    useEffect(() => {
        // On vérifie si l'utilisateur est déjà inscrit pour ne pas afficher la modale
        const userRegistered = localStorage.getItem('user_registration_data');
        if (userRegistered) {
            return;
        }

        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    // Fonction pour ouvrir la modale, à passer au Header
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Header onOpenModal={handleOpenModal} />
            <Hero />
            <AboutUs />
            <HowItWorks />
            <Benefits />
            <PhotoGallery />
            <ContactForm />
            <Footer />
            <TimedModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default App;