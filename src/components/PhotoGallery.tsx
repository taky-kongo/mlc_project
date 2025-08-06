// src/components/PhotoGallery.tsx
import React, { useState, useEffect, useRef } from 'react';

const PhotoGallery: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null); // Référence pour le conteneur du carrousel

    const photos = [
        { src: "/img/galerie/photo1.jpeg", alt: "Description Photo 1" },
        { src: "/img/galerie/photo2.jpeg", alt: "Description Photo 2" },
        { src: "/img/galerie/photo3.jpeg", alt: "Description Photo 3" },
        { src: "/img/galerie/photo4.jpeg", alt: "Description Photo 4" },
        { src: "/img/galerie/phoyo5.jpeg", alt: "Description Photo 5" },
        { src: "/img/galerie/photo6.jpeg", alt: "Description Photo 6" },
    ];

    // Effet pour la transition d'apparition de la section
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

    // Fonction pour faire défiler le carrousel
    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            // Défilement de la largeur d'une image pour un mouvement fluide
            const itemWidth = carouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
            const scrollAmount = itemWidth; // Défile d'une image à la fois

            if (direction === 'left') {
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Effet pour le défilement automatique
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isVisible) { // Démarrer le défilement automatique seulement si la section est visible
            interval = setInterval(() => {
                if (carouselRef.current) {
                    // Vérifier si nous sommes à la fin du carrousel
                    const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
                    const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

                    if (isAtEnd) {
                        // Revenir au début en douceur
                        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // Défiler vers la droite
                        scrollCarousel('right');
                    }
                }
            }, 3000); // Défilement toutes les 3 secondes
        }

        return () => {
            if (interval) {
                clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant ou si isVisible devient false
            }
        };
    }, [isVisible]); // Dépend du fait que la section soit visible

    return (
        <section
            id="photo-gallery"
            ref={sectionRef}
            className={`py-20 bg-gray-800 text-white transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">Notre Galerie Photo</h2>

                <div className="relative">
                    {/* Boutons de défilement */}
                    <button
                        onClick={() => scrollCarousel('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label="Faire défiler vers la gauche"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollCarousel('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 text-white p-3 rounded-full shadow-lg z-10 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                        aria-label="Faire défiler vers la droite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Conteneur du carrousel */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 hide-scrollbar" // 'hide-scrollbar' pour masquer la barre de défilement native
                    >
                        {photos.map((photo, index) => (
                            // Ajustement de la largeur pour afficher 2 images par ligne sur les grands écrans (lg:w-1/2)
                            // et augmentation de l'espacement (p-8)
                            <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/2 p-8">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    // Augmentation de la hauteur des images
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
