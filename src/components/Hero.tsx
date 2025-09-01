// src/components/Hero.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Importez le hook de traduction
import imgHero from '/img/hero2.jpg';

// Définition des props pour le composant Hero
interface HeroProps {
    onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
    const { t, i18n } = useTranslation();

    const isChinese = i18n.language === 'zh';

    return (
        <section
            className="relative text-center py-40 z-0"
            style={{ backgroundImage: `url(${imgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Overlay pour assombrir l'image et améliorer la lisibilité du texte */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-white">
                    {t('hero.title1')} <span className="text-[#3a75ff]">{t('hero.title2')}</span>
                    {isChinese && <span className="text-white">{t('hero.title3')}</span>}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
                    {t('hero.subtitle')}
                </p>
                {/* Le lien a été remplacé par un bouton qui appelle la fonction d'ouverture de la modale */}
                <button
                    onClick={onOpenModal}
                    className="inline-block bg-[#3a75ff] hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                    {t('hero.button')}
                </button>
            </div>
        </section>
    );
};

export default Hero;