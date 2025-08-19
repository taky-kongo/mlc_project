// src/App.tsx
import { useState, useEffect, type JSX } from 'react';
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

// Composants de la nouvelle structure du dashboard
import DashboardLayout from './components/DashboardLayout';
import ProspectsPage from './components/ProspectsPage';
import UserProfilePage from './components/UserProfilePage';


// Composant pour la page d'accueil, regroupant tous les éléments publics
const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const userRegistered = localStorage.getItem('user_registration_data');
        if (userRegistered) {
            return;
        }

        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

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

                {/* Route protégée pour le dashboard et toutes ses sous-pages */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="prospects" element={<ProspectsPage />} />
                    <Route path="profile" element={<UserProfilePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;