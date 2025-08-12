// src/components/Header.tsx
import React, { useState } from 'react';
import logo from '/img/logo_mlc.png'; // Assurez-vous d'avoir votre logo dans ce chemin

// Définition des props pour le composant Header
interface HeaderProps {
    onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Gère l'ouverture de la modale et la fermeture du menu mobile
    const handleOpenModalClick = () => {
        onOpenModal();
        closeMobileMenu();
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo Projet MLC" className="h-8" />
                    <span className="text-xl font-bold text-gray-900">MLC</span>
                </a>

                {/* Navigation pour écrans larges (Desktop) */}
                <nav className="hidden md:flex space-x-8 items-center">
                    <a href="#benefits" className="text-gray-600 hover:text-[#3a75ff] transition-colors duration-300 cursor-pointer">
                        Avantages
                    </a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-[#3a75ff] transition-colors duration-300 cursor-pointer">
                        Fonctionnement
                    </a>
                    <a href="#about-us" className="text-gray-600 hover:text-[#3a75ff] transition-colors duration-300 cursor-pointer">
                        A propos
                    </a>
                    <button
                        onClick={onOpenModal}
                        className="bg-[#3a75ff] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                    >
                        Je veux investir
                    </button>
                </nav>

                {/* Bouton Hamburger pour Mobile */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none cursor-pointer">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menu Mobile (affiché conditionnellement) */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 z-40 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex justify-end p-6">
                    <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none cursor-pointer">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col items-center space-y-8 mt-12">
                    <a
                        href="#benefits"
                        className="text-gray-800 text-xl font-semibold hover:text-[#3a75ff] transition-colors duration-300 cursor-pointer"
                        onClick={closeMobileMenu}
                    >
                        Avantages
                    </a>
                    <a
                        href="#how-it-works"
                        className="text-gray-800 text-xl font-semibold hover:text-[#3a75ff] transition-colors duration-300 cursor-pointer"
                        onClick={closeMobileMenu}
                    >
                        Fonctionnement
                    </a>
                    <a
                        href="#about-us"
                        className="text-gray-800 text-xl font-semibold hover:text-[#3a75ff] transition-colors duration-300 cursor-pointer"
                        onClick={closeMobileMenu}
                    >
                        A propos
                    </a>
                    <button
                        onClick={handleOpenModalClick}
                        className="bg-[#3a75ff] text-white px-6 py-3 rounded-full font-bold text-xl hover:bg-blue-600 transition-colors duration-300 w-fit cursor-pointer"
                    >
                        Nous rejoindre
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;