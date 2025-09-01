// src/components/ContactForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from "react-icons/fa";

// Je définis le type pour les pays pour plus de clarté
interface Country {
    code: string;
    name: string; // Cette propriété est maintenant la clé de traduction
    flag: string;
}

// Liste des pays utilisant les clés de traduction pour le nom.
const countries: Country[] = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', name: 'Philippines', flag: '🇵🇭' },
    { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: '+66', name: 'Thailand', flag: '🇹🇭' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+90', name: 'Turkey', flag: '🇹🇷' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', name: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', name: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', name: 'Iran', flag: '🇮🇷' },
    { code: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+220', name: 'Gambia', flag: '🇬🇲' },
    { code: '+221', name: 'Senegal', flag: '🇸🇳' },
    { code: '+223', name: 'Mali', flag: '🇲🇱' },
    { code: '+224', name: 'Guinea', flag: '🇬🇳' },
    { code: '+225', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+227', name: 'Niger', flag: '🇳🇪' },
    { code: '+228', name: 'Togo', flag: '🇹🇬' },
    { code: '+229', name: 'Benin', flag: '🇧🇯' },
    { code: '+230', name: 'Mauritius', flag: '🇲🇺' },
    { code: '+233', name: 'Ghana', flag: '🇬🇭' },
    { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
    { code: '+237', name: 'Cameroon', flag: '🇨🇲' },
    { code: '+243', name: 'DR Congo', flag: '🇨🇩' },
    { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', name: 'Ethiopia', flag: '🇪🇹' },
    { code: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: '+255', name: 'Tanzania', flag: '🇹🇿' },
    { code: '+260', name: 'Zambia', flag: '🇿🇲' },
    { code: '+263', name: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+420', name: 'Czechia', flag: '🇨🇿' },
    { code: '+421', name: 'Slovakia', flag: '🇸🇰' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+972', name: 'Israel', flag: '🇮🇱' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', name: 'Jordan', flag: '🇯🇴' },
    { code: '+963', name: 'Syria', flag: '🇸🇾' },
    { code: '+964', name: 'Iraq', flag: '🇮🇶' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+970', name: 'Palestine', flag: '🇵🇸' },
    { code: '+975', name: 'Bhutan', flag: '🇧🇹' },
    { code: '+976', name: 'Mongolia', flag: '🇲🇳' },
    { code: '+977', name: 'Nepal', flag: '🇳🇵' },
    { code: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', name: 'Georgia', flag: '🇬🇪' },
    { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+998', name: 'Uzbekistan', flag: '🇺🇿' }
];

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const phoneNumberDisplay = '+225 07 07 08 96 31';
    const whatsappNumber = '2250707089631';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    const [nom, setNom] = useState('');
    const [contacts, setContacts] = useState('');
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === '+33') || countries[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filtrer les pays en fonction de la recherche (note : les noms de pays filtrés seront en anglais)
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmissionStatus('idle');
        setMessage('');

        const formData = {
            nom: nom,
            contacts: selectedCountry.code + contacts,
            email,
        };

        try {
            console.log(formData);
            const response = await fetch('https://api.mlc.ci/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(formData);
                setSubmissionStatus('success');
                setMessage(t('contactForm.successMessage'));
                setNom('');
                setContacts('');
                setEmail('');
                setSelectedCountry(countries.find(c => c.code === '+33') || countries[0]);
            } else {
                setSubmissionStatus('error');
                setMessage(t('contactForm.errorMessage'));
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
            setSubmissionStatus('error');
            setMessage(t('contactForm.connectionError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    {t('contactForm.title')}
                </h2>
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start max-w-5xl mx-auto">
                    <div className="w-full md:w-2/3 bg-gray-100 p-8 rounded-lg shadow-xl">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fullName" className="block text-gray-600">
                                    {t('contactForm.nameLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-600">
                                    {t('contactForm.phoneLabel')}
                                </label>
                                <div className="flex flex-col sm:flex-row mt-1 relative w-full" ref={dropdownRef}>
                                    <div
                                        className="flex items-center justify-between w-full sm:w-48 px-4 py-3 bg-white border border-gray-300 rounded-md sm:rounded-r-none text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <span>{selectedCountry.flag}</span>
                                            {/* Traduction du nom du pays sélectionné */}
                                            <span>{t(`countries.${selectedCountry.name}`)}</span>
                                            <span>{selectedCountry.code}</span>
                                        </span>
                                        <svg
                                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                                            <input
                                                type="text"
                                                placeholder={t('contactForm.searchCountryPlaceholder')}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-md text-gray-800 focus:outline-none focus:ring-2 focus:focus:ring-[#3a75ff]"
                                                autoFocus
                                            />
                                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                                {filteredCountries.length > 0 ? (
                                                    filteredCountries.map((country, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-gray-800"
                                                            onClick={() => handleCountrySelect(country)}
                                                        >
                                                            <span>{country.flag}</span>
                                                            {/* Traduction du nom du pays dans la liste */}
                                                            <span>{t(`countries.${country.name}`)} - {country.code}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-2 text-gray-600">
                                                        {t('contactForm.noCountryFound')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md sm:rounded-l-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3a75ff] mt-2 sm:mt-0"
                                        value={contacts}
                                        onChange={(e) => setContacts(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-600">
                                    {t('contactForm.emailLabel')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('contactForm.sendingText')}
                                    </>
                                ) : (
                                    t('contactForm.sendButton')
                                )}
                            </button>
                            {message && (
                                <p className={`text-center mt-4 ${submissionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>

                    <div className="w-full md:w-1/3 p-8 md:p-0">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="bg-[#3a75ff] p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.26 1.359a9.986 9.986 0 005.003 5.003l1.359-2.26a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    {t('contactForm.phoneInfoLabel')}
                                </p>
                                <p className="text-lg font-semibold text-gray-800">{phoneNumberDisplay}</p>
                            </div>
                        </div>

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 transition-transform duration-300 transform hover:scale-105">
                            <div className="bg-green-500 p-3 rounded-full">
                                <FaWhatsapp className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-lg font-semibold text-gray-800">
                                {t('contactForm.whatsappLinkText')}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;