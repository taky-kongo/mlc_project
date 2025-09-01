// src/components/CallToAction.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const CallToAction: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-teal-500 py-16 text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {t('callToActionPage.title')}
                </h2>
                <button className="bg-gray-900 hover:bg-gray-800 text-teal-400 font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                    {t('callToActionPage.buttonText')}
                </button>
            </div>
        </section>
    );
};

export default CallToAction;