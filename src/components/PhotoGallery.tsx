// src/components/PhotoGallery.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const PhotoGallery: React.FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const photos = [
        { src: "/img/galerie/photo1.jpeg", alt: t('photoGallery.photoAlt') + "1" },
        { src: "/img/galerie/photo2.jpeg", alt: t('photoGallery.photoAlt') + "2" },
        { src: "/img/galerie/photo3.jpeg", alt: t('photoGallery.photoAlt') + "3" },
        { src: "/img/galerie/photo4.jpeg", alt: t('photoGallery.photoAlt') + "4" },
        { src: "/img/galerie/phoyo5.jpeg", alt: t('photoGallery.photoAlt') + "5" },
        { src: "/img/galerie/photo6.jpeg", alt: t('photoGallery.photoAlt') + "6" },
        { src: "/img/galerie/photo07.jpg", alt: t('photoGallery.photoAlt') + "7" },
        { src: "/img/galerie/photo08.jpg", alt: t('photoGallery.photoAlt') + "8" },
        { src: "/img/galerie/photo09.jpg", alt: t('photoGallery.photoAlt') + "9" },
        { src: "/img/galerie/photo10.jpg", alt: t('photoGallery.photoAlt') + "10" },
    ];

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

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
            const scrollAmount = itemWidth;

            if (direction === 'left') {
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isVisible) {
            interval = setInterval(() => {
                if (carouselRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
                    const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

                    if (isAtEnd) {
                        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollCarousel('right');
                    }
                }
            }, 3000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isVisible]);

    return (
        <section
            id="photo-gallery"
            ref={sectionRef}
            className={`py-20 bg-gray-800 text-white transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">{t('photoGallery.title')}</h2>

                <div className="relative">
                    {/* Boutons de défilement */}
                    <button
                        onClick={() => scrollCarousel('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label={t('photoGallery.scrollLeft')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollCarousel('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label={t('photoGallery.scrollRight')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Conteneur du carrousel */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 hide-scrollbar"
                    >
                        {photos.map((photo, index) => (
                            <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/2 p-8">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-72 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;