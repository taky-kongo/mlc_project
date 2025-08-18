// src/App.tsx
import {useState, useEffect, type JSX} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Composants de la page d'accueil
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import PhotoGallery from './components/PhotoGallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import TimedModal from './components/TimedModal';

// Nouveaux composants d'administration
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Composant pour la page d'accueil, regroupant tous les éléments publics
const HomePage = () => {
    // État central pour contrôler l'affichage de la modale
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Logique du timer de 10 secondes (30 secondes dans l'ancienne version, j'ai conservé 10s de la correction précédente)
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

    // Fonction pour ouvrir la modale, à passer aux autres composants
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Header onOpenModal={handleOpenModal} />
            <Hero onOpenModal={handleOpenModal} />
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

// Composant pour protéger l'accès à une route
// Il vérifie si l'utilisateur est authentifié. Si oui, il affiche la page demandée (children),
// sinon il le redirige vers la page de login.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route pour la page d'accueil */}
                <Route path="/" element={<HomePage />} />

                {/* Route pour le formulaire de connexion admin */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Route protégée pour le dashboard admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;