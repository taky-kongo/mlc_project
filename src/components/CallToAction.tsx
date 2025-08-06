// src/components/CallToAction.tsx
import React from 'react';

const CallToAction: React.FC = () => {
    return (
        <section className="bg-teal-500 py-16 text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Ne manquez pas cette opportunité.</h2>
                <button className="bg-gray-900 hover:bg-gray-800 text-teal-400 font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                    Je m'inscris maintenant et j'investis dans mon avenir
                </button>
            </div>
        </section>
    );
};

export default CallToAction;