import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

// Définissez les langues que vous supportez
const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ja', name: '日本語' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
];

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div className="relative text-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="block w-full pl-9 pr-4 py-2 text-sm bg-gray-700 rounded-md border-gray-600 focus:border-blue-500 focus:ring-blue-500 appearance-none cursor-pointer transition-colors duration-200"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;