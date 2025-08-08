// src/components/HowItWorks.tsx
import React, { useState, useEffect, useRef } from 'react';
import fonctionnementImg from '/img/fonctionnement.png'; // Import de l'image

const HowItWorks: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    // État pour gérer l'erreur de chargement de l'image
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 } // Déclenche l'animation lorsque 10% de la section est visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const steps = [
        { title: "Inscrivez-vous et rejoignez notre groupe", description: "En un seul clic, accédez à toutes les informations et à notre communauté de membres." },
        { title: "Explorez les packs d'investissement", description: "Une fois dans votre back-office, découvrez les différentes options qui s'offrent à vous." },
        { title: "Investissez et suivez vos progrès", description: "Choisissez le pack qui vous convient le mieux et commencez à construire votre avenir financier." }
    ];
    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className={`py-20 bg-white transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Comment ça marche ?
                </h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:bg-gray-200">
                            <div className="text-5xl font-bold text-[#3a75ff] mb-4">{index + 1}</div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* Nouvelle image ajoutée sous les cadres */}
                <div className="mt-16 text-center">
                    <img
                        // Utilise l'image importée ou une image de remplacement en cas d'erreur
                        src={imageError ? "https://placehold.co/1024x576/cccccc/333333?text=Image+non+trouvée" : fonctionnementImg}
                        alt="Fonctionnement du projet"
                        className="w-full max-w-5xl mx-auto rounded-lg shadow-xl object-cover"
                        onError={() => setImageError(true)} // Définit l'état d'erreur si l'image ne charge pas
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
