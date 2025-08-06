// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-950 py-12 text-gray-400 text-center">
            <div className="container mx-auto px-6">
                <p className="mb-4">&copy; {new Date().getFullYear()} Projet MLC. Tous droits réservés.</p>
                <div className="space-x-6">
                    <a href="#" className="hover:text-teal-400 transition-colors duration-300">Politique de confidentialité</a>
                    <a href="#" className="hover:text-teal-400 transition-colors duration-300">Conditions d'utilisation</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;