// src/components/TimedModal.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidPhoneNumber, parsePhoneNumber, AsYouType } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';

// Je définis le type pour les pays pour plus de clarté
interface Country {
    code: string;
    isoCode: CountryCode;
    name: string;
    flag: string;
}

// Liste des pays (les noms seront traduits via i18n)
const countries: Country[] = [
    { code: '+1', isoCode: 'US', name: 'United States', flag: '🇺🇸' },
    { code: '+7', isoCode: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: '+20', isoCode: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: '+27', isoCode: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: '+30', isoCode: 'GR', name: 'Greece', flag: '🇬🇷' },
    { code: '+31', isoCode: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', isoCode: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: '+33', isoCode: 'FR', name: 'France', flag: '🇫🇷' },
    { code: '+34', isoCode: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: '+39', isoCode: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: '+44', isoCode: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', isoCode: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: '+52', isoCode: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: '+54', isoCode: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: '+55', isoCode: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: '+56', isoCode: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: '+61', isoCode: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: '+62', isoCode: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', isoCode: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: '+64', isoCode: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+65', isoCode: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: '+66', isoCode: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: '+81', isoCode: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', isoCode: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: '+86', isoCode: 'CN', name: 'China', flag: '🇨🇳' },
    { code: '+90', isoCode: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: '+91', isoCode: 'IN', name: 'India', flag: '🇮🇳' },
    { code: '+92', isoCode: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', isoCode: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', isoCode: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', isoCode: 'MM', name: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', isoCode: 'IR', name: 'Iran', flag: '🇮🇷' },
    { code: '+212', isoCode: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { code: '+213', isoCode: 'DZ', name: 'Algeria', flag: '🇩🇿' },
    { code: '+216', isoCode: 'TN', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+220', isoCode: 'GM', name: 'Gambia', flag: '🇬🇲' },
    { code: '+221', isoCode: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { code: '+223', isoCode: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: '+224', isoCode: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: '+225', isoCode: 'CI', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+226', isoCode: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+227', isoCode: 'NE', name: 'Niger', flag: '🇳🇪' },
    { code: '+228', isoCode: 'TG', name: 'Togo', flag: '🇹🇬' },
    { code: '+229', isoCode: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { code: '+230', isoCode: 'MU', name: 'Mauritius', flag: '🇲🇺' },
    { code: '+233', isoCode: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: '+234', isoCode: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: '+237', isoCode: 'CM', name: 'Cameroon', flag: '🇨🇲' },
    { code: '+243', isoCode: 'CD', name: 'DR Congo', flag: '🇨🇩' },
    { code: '+250', isoCode: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', isoCode: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { code: '+254', isoCode: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: '+255', isoCode: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: '+260', isoCode: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { code: '+263', isoCode: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+351', isoCode: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: '+353', isoCode: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: '+358', isoCode: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: '+420', isoCode: 'CZ', name: 'Czechia', flag: '🇨🇿' },
    { code: '+421', isoCode: 'SK', name: 'Slovakia', flag: '🇸🇰' },
    { code: '+48', isoCode: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: '+971', isoCode: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+972', isoCode: 'IL', name: 'Israel', flag: '🇮🇱' },
    { code: '+974', isoCode: 'QA', name: 'Qatar', flag: '🇶🇦' },
    { code: '+966', isoCode: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+961', isoCode: 'LB', name: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', isoCode: 'JO', name: 'Jordan', flag: '🇯🇴' },
    { code: '+963', isoCode: 'SY', name: 'Syria', flag: '🇸🇾' },
    { code: '+964', isoCode: 'IQ', name: 'Irak', flag: '🇮🇶' },
    { code: '+965', isoCode: 'KW', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+968', isoCode: 'OM', name: 'Oman', flag: '🇴🇲' },
    { code: '+970', isoCode: 'PS', name: 'Palestine', flag: '🇵🇸' },
    { code: '+975', isoCode: 'BT', name: 'Bhutan', flag: '🇧🇹' },
    { code: '+976', isoCode: 'MN', name: 'Mongolia', flag: '🇲🇳' },
    { code: '+977', isoCode: 'NP', name: 'Nepal', flag: '🇳🇵' },
    { code: '+994', isoCode: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', isoCode: 'GE', name: 'Georgia', flag: '🇬🇪' },
    { code: '+996', isoCode: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+998', isoCode: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
];

interface TimedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TimedModal: React.FC<TimedModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [view, setView] = useState<'intro' | 'form' | 'success'>('intro');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // États pour le formulaire
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [contacts, setContacts] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false); // Nouvel état pour la validation

    // États pour la recherche et la sélection de l'indicatif
    const [searchCode, setSearchCode] = useState('');
    const [showCodeDropdown, setShowCodeDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    // Effet pour réinitialiser la vue quand le modal s'ouvre
    useEffect(() => {
        if (isOpen) {
            setView('intro');
            // Réinitialise les champs du formulaire à chaque ouverture
            setNom('');
            setEmail('');
            setContacts('');
            setSearchCode('');
            setSelectedCountry(null);
            setIsPhoneNumberValid(false); // Réinitialise la validation
        }
    }, [isOpen]);

    // Effet pour valider le numéro de téléphone en temps réel
    useEffect(() => {
        // La validation ne doit se faire que si un pays est sélectionné ET qu'un numéro est entré.
        if (selectedCountry && contacts) {
            const formattedNumber = new AsYouType(selectedCountry.isoCode).input(contacts);
            setIsPhoneNumberValid(isValidPhoneNumber(formattedNumber, selectedCountry.isoCode));
        } else {
            setIsPhoneNumberValid(false);
        }
    }, [contacts, selectedCountry]);

    // Gérer la soumission du formulaire
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        // Validation finale avant l'envoi
        if (!isPhoneNumberValid || !selectedCountry) {
            // Utilisation de la clé de traduction
            setErrorMessage(t('timedModal.invalidPhoneNumber'));
            setIsLoading(false);
            return;
        }

        const phoneNumber = parsePhoneNumber(contacts, selectedCountry.isoCode);
        const contacts_formated = phoneNumber?.number || '';

        const formData = {
            nom: nom,
            email,
            contacts: contacts_formated,
        };

        try {
            //const response = await fetch('http://localhost:8000/api/submit-form', {
            const response = await fetch('https://mon-back-mlc.onrender.com/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                setErrorMessage(t('timedModal.formError'));
                console.error("Échec de l'envoi du formulaire", response.statusText);
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.status_code === 201) {
                setSubmissionMessage(t('timedModal.successMessage'));
                setView('success');
                localStorage.setItem('user_registration_data', JSON.stringify(formData));
            } else if (data.status_code === 409) {
                setErrorMessage(t('timedModal.formErrorEmail'));
                console.error("Échec de l'envoi du formulaire", response.statusText);
            }
        } catch (error) {
            setErrorMessage(t('timedModal.formError'));
            console.error("Erreur d'envoi du formulaire:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filtrer les pays en fonction de la recherche
    const filteredCountries = countries.filter(country =>
        t(`countries.${country.name}`).toLowerCase().includes(searchCode.toLowerCase()) ||
        country.code.includes(searchCode)
    );

    // Le composant ne rend rien si la prop `isOpen` est fausse
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-md">
            <div className="relative bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label={t('timedModal.close')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {view === 'intro' && (
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#3a75ff] mb-4">{t('timedModal.introTitle')}</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            {t('timedModal.introSubtitle')}
                        </p>
                        <button
                            onClick={() => setView('form')}
                            className="w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 cursor-pointer"
                        >
                            {t('timedModal.introButton')}
                        </button>
                    </div>
                )}

                {view === 'form' && (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#3a75ff] mb-4">{t('timedModal.formTitle')}</h3>
                        {errorMessage && (<p className="text-center text-red-500 font-medium">{errorMessage}</p>)}

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t('timedModal.labelFullName')}</label>
                            <input
                                type="text"
                                id="fullName"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff] text-gray-900"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('timedModal.labelEmail')}</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff] text-gray-900"
                                required
                            />
                        </div>

                        {/* Champ WhatsApp avec la recherche d'indicatif intégrée */}
                        <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">{t('timedModal.labelWhatsApp')}</label>
                            <div className="flex mt-1">
                                {/* Composant de recherche d'indicatif */}
                                <div className="relative w-1/3 mr-2">
                                    <input
                                        type="text"
                                        placeholder={t('timedModal.placeholderCode')}
                                        value={selectedCountry ? `${selectedCountry.flag} ${selectedCountry.code}` : searchCode}
                                        onFocus={() => setShowCodeDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowCodeDropdown(false), 200)}
                                        onChange={(e) => {
                                            setSearchCode(e.target.value);
                                            setSelectedCountry(null);
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff]"
                                    />
                                    {showCodeDropdown && (
                                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto mt-1">
                                            {filteredCountries.length > 0 ? (
                                                filteredCountries.map(country => (
                                                    <li
                                                        key={country.code}
                                                        onClick={() => {
                                                            setSelectedCountry(country);
                                                            setSearchCode('');
                                                            setShowCodeDropdown(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-900"
                                                    >
                                                        <span className="mr-2">{country.flag}</span>
                                                        <span>{country.code} ({t(`countries.${country.name}`)})</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">{t('timedModal.noCountryFound')}</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                {/* Champ pour le numéro de téléphone */}
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    value={contacts}
                                    onChange={(e) => setContacts(e.target.value.replace(/[^0-9]/g, ''))}
                                    className={`w-2/3 px-4 py-2 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff] text-gray-900 ${isPhoneNumberValid ? 'border border-gray-300' : 'border-2 border-red-500'}`}
                                    required
                                />
                            </div>
                            {!isPhoneNumberValid && (
                                <p className="text-sm text-red-500 mt-1">
                                    {/* Utilisation de la clé de traduction */}
                                    {t('timedModal.invalidPhoneNumber')}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={isLoading || !isPhoneNumberValid} // Désactivation si le numéro n'est pas valide
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('timedModal.submittingButton')}
                                </>
                            ) : (
                                t('timedModal.submitButton')
                            )}
                        </button>
                    </form>
                )}

                {view === 'success' && (
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">{t('timedModal.successTitle')}</h3>
                        <p className="text-lg text-gray-700 mb-6">{submissionMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimedModal;