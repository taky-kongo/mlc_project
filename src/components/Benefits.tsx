// src/components/Benefits.tsx
import React from 'react';

const Benefits: React.FC = () => {
    const benefits = [
        "Opportunités de croissance",
        "Simplicité et clarté",
        "Soutien de la communauté",
        "Transparence totale",
    ];
    // Remplacez cette URL par l'URL de votre vidéo de présentation.
    // Utilisez un format compatible avec le web (ex: .mp4, .webm) ou un lien de partage YouTube valide.
    // Les liens "blob:https://www.youtube.com/..." sont temporaires et ne fonctionneront pas ici.
    const videoUrl = "/img/presentation_mlc.mp4"; // Exemple : remplacez par votre lien valide

    return (
        <section id="benefits" className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Les avantages de rejoindre le projet <span className="text-[#3a75ff]">MLC</span>
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
                    <h3 className="text-3xl font-bold text-gray-800 mb-8">SOYONS TOUS PARTENAIRE MLC</h3>
                    {/* Le cadre de la vidéo a été élargi à max-w-6xl */}
                    <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}> {/* Ratio 16:9 */}
                        <video
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            controls
                            muted
                            loop
                            src={videoUrl}
                            aria-label="Vidéo de présentation du projet MLC"
                        >
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                    {/* Nouveau texte ajouté sous la vidéo */}
                    <p className="text-lg text-gray-600 mt-8">
                        Investir dans la santé signifie toujours un investissement dans un avenir meilleur.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
