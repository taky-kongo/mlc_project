// src/components/Benefits.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Benefits: React.FC = () => {
    const { t } = useTranslation();
    const benefits = [
        t('benefitsPage.benefitsList.0'),
        t('benefitsPage.benefitsList.1'),
        t('benefitsPage.benefitsList.2'),
        t('benefitsPage.benefitsList.3')
    ];
    // Remplacez cette URL par l'URL de votre vidéo de présentation.
    const videoUrl = "/img/presentation_mlc.mp4";

    return (
        <section id="benefits" className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    {t('benefitsPage.title')}
                </h2>
                <ul className="grid md:grid-cols-2 gap-8 text-lg max-w-4xl mx-auto mb-16">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-xl text-gray-700">
                            <span className="text-[#3a75ff] text-2xl">✓</span>
                            <p>{benefit}</p>
                        </li>
                    ))}
                </ul>

                {/* Section de la vidéo de présentation */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8">
                        {t('benefitsPage.videoSubtitle')}
                    </h3>
                    <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
                        <video
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            controls
                            muted
                            loop
                            src={videoUrl}
                            aria-label="Vidéo de présentation du projet MLC"
                        >
                            {t('benefitsPage.unsupportedVideo')}
                        </video>
                    </div>
                    {/* Nouveau texte ajouté sous la vidéo */}
                    <p className="text-lg text-gray-600 mt-8">
                        {t('benefitsPage.videoMessage')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Benefits;