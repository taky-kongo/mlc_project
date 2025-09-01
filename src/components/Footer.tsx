// src/components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Importez le hook de traduction

const Footer: React.FC = () => {
    // Le hook useTranslation fournit la fonction 't' pour traduire les clés.
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-950 py-12 text-gray-400 text-center">
            <div className="container mx-auto px-6">
                <p className="mb-4">
                    &copy; {new Date().getFullYear()} Projet MLC. {t('footer.rights')}
                </p>
                <div className="space-x-6">
                    <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                        {t('footer.privacyPolicy')}
                    </a>
                    <a href="#" className="hover:text-teal-400 transition-colors duration-300">
                        {t('footer.termsOfUse')}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;