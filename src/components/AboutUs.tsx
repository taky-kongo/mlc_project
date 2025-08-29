// src/components/AboutUs.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs: React.FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
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
                <h2 className="text-4xl font-bold mb-4">
                    {t('aboutUsPage.title')}
                </h2>
                <h3 className="text-3xl font-semibold text-[#3a75ff] mb-8">
                    {t('aboutUsPage.subtitle')}
                </h3>
                <p className="text-lg max-w-3xl mx-auto mb-16 text-gray-300">
                    {t('aboutUsPage.paragraph1')}
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Image 1 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/img/offre_mlc.jpg"
                            alt="Innovation"
                            className="rounded-lg shadow-lg mb-4 w-full h-auto object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200">
                            {t('aboutUsPage.image1Caption')}
                        </p>
                    </div>

                    {/* Image 2 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/img/certificat_mlc.jpg"
                            alt="Recherche et Développement"
                            className="rounded-lg shadow-lg mb-4 w-full h-auto object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200">
                            {t('aboutUsPage.image2Caption')}
                        </p>
                    </div>

                    {/* Image 3 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/img/prevision_mlc.jpg"
                            alt="Impact sur la Santé"
                            className="rounded-lg shadow-lg mb-4 w-full h-auto object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200">
                            {t('aboutUsPage.image3Caption')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;