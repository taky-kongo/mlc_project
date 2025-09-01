// src/components/PhotoGallery.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const PhotoGallery: React.FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const photoCarouselRef = useRef<HTMLDivElement>(null);
    const videoCarouselRef = useRef<HTMLDivElement>(null);

    const photos = [
        { src: "/img/galerie/photo1.jpeg", alt: "Description Photo 1" },
        { src: "/img/galerie/photo2.jpeg", alt: "Description Photo 2" },
        { src: "/img/galerie/photo3.jpeg", alt: "Description Photo 3" },
        { src: "/img/galerie/photo4.jpeg", alt: "Description Photo 4" },
        { src: "/img/galerie/phoyo5.jpeg", alt: "Description Photo 5" },
        { src: "/img/galerie/photo6.jpeg", alt: "Description Photo 6" },
        { src: "/img/galerie/photo07.jpg", alt: "Description Photo 7" },
        { src: "/img/galerie/photo08.jpg", alt: "Description Photo 8" },
        { src: "/img/galerie/photo09.jpg", alt: "Description Photo 9" },
        { src: "/img/galerie/photo10.jpg", alt: "Description Photo 10" },
    ];

    // Liste des vidéos avec les identifiants Vimeo
    // Remplacez '123456789' par l'ID de votre vidéo Vimeo
    const videos = [
        { id: "1114323603", title: "Vidéo 1" },
        { id: "987654321", title: "Vidéo 2" },
        { id: "135792468", title: "Vidéo 3" },
        { id: "246813579", title: "Vidéo 4" },
        { id: "112233445", title: "Vidéo 5" }
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

    const scrollPhotoCarousel = (direction: 'left' | 'right') => {
        if (photoCarouselRef.current) {
            const itemWidth = photoCarouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
            const scrollAmount = itemWidth;

            if (direction === 'left') {
                photoCarouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                photoCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const scrollVideoCarousel = (direction: 'left' | 'right') => {
        if (videoCarouselRef.current) {
            const itemWidth = videoCarouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
            const scrollAmount = itemWidth;

            if (direction === 'left') {
                videoCarouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                videoCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isVisible) {
            interval = setInterval(() => {
                if (photoCarouselRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = photoCarouselRef.current;
                    const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

                    if (isAtEnd) {
                        photoCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollPhotoCarousel('right');
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

    useEffect(() => {
        let videoInterval: NodeJS.Timeout;
        if (isVisible) {
            videoInterval = setInterval(() => {
                if (videoCarouselRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = videoCarouselRef.current;
                    const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

                    if (isAtEnd) {
                        videoCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollVideoCarousel('right');
                    }
                }
            }, 4500);
        }

        return () => {
            if (videoInterval) {
                clearInterval(videoInterval);
            }
        };
    }, [isVisible]);

    return (
        <section
            id="gallery"
            ref={sectionRef}
            className={`py-20 bg-gray-800 text-white transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">{t('photoGallery.title')}</h2>
                <div className="relative mb-20">
                    <button
                        onClick={() => scrollPhotoCarousel('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label="Faire défiler les photos vers la gauche"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollPhotoCarousel('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label="Faire défiler les photos vers la droite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div
                        ref={photoCarouselRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 hide-scrollbar"
                    >
                        {photos.map((photo, index) => (
                            <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/2 p-4 md:p-8">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-72 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-4xl font-bold mb-12">{t('videoGallery.title')}</h2>
                <div className="relative">
                    <button
                        onClick={() => scrollVideoCarousel('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label="Faire défiler les vidéos vers la gauche"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollVideoCarousel('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label="Faire défiler les vidéos vers la droite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div
                        ref={videoCarouselRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 hide-scrollbar"
                    >
                        {videos.map((video, index) => (
                            <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/2 p-4 md:p-8">
                                {/* Utilisation de l'iframe de Vimeo */}
                                <div className="aspect-w-16 aspect-h-9 w-full h-72 rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src={`https://player.vimeo.com/video/${video.id}?title=0&byline=0&portrait=0`}
                                        title={t(`videoGallery.videos.${video.title}`)}
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;