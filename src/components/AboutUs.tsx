// src/components/AboutUs.tsx
import React, { useState, useEffect, useRef } from 'react';

const AboutUs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                    // Si vous voulez que l'animation se réinitialise lorsque l'élément quitte l'écran,
                    // décommentez la ligne ci-dessous:
                    // else {
                    //   setIsVisible(false);
                    // }
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

    return (
        <section
            id="about-us"
            ref={sectionRef}
            className={`py-20 bg-gray-800 text-white transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">Qui sommes-nous ?</h2>
                <h3 className="text-3xl font-semibold text-[#3a75ff] mb-8">MLC Engineering</h3>
                <p className="text-lg max-w-3xl mx-auto mb-16 text-gray-300">
                    Est une société d'ingénierie spécialisée dans la création et la mise sur le marché international
                    d'un système de surveillance continue de la glycémie.
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Image 1 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/src/assets/img/offre_mlc.jpg"
                            alt="Innovation"
                            className="rounded-lg shadow-lg mb-4 w-full h-auto object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200">
                            Offre aux investisseurs choisissez le montant d'investissement. Le montant d'investissements est compris entre 100 et 2 000 000 dollars.
                        </p>
                    </div>

                    {/* Image 2 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/src/assets/img/certificat_mlc.jpg"
                            alt="Recherche et Développement"
                            className="rounded-lg shadow-lg mb-4 w-full h-auto object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200">
                            Un certificat vous sera donné à la fin de vos investissements dans le projet, un document qui prouve que vous détenez des parts de la société MLC avant son entrée en bourse (IPO) en 2030.
                        </p>
                    </div>

                    {/* Image 3 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/src/assets/img/prevision_mlc.jpg"
                            alt="Impact sur la Santé"
                            className="rounded-lg shadow-lg mb-4 w-full h-auto object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200">
                            Notre offre est le premier but du projet, il y a 537 millions de consommateurs potentiels sur notre planète, et nous allons augmenter nos ventes d'année en année.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
