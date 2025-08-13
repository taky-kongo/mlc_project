// src/components/ContactForm.tsx
import React, { useState, useEffect, useRef } from 'react';

// Je définis le type pour les pays pour plus de clarté
interface Country {
    code: string;
    name: string;
    flag: string;
}

// Liste étendue des pays pour la démonstration.
const countries: Country[] = [
    { code: '+1', name: 'États-Unis', flag: '🇺🇸' },
    { code: '+7', name: 'Russie', flag: '🇷🇺' },
    { code: '+20', name: 'Égypte', flag: '🇪🇬' },
    { code: '+27', name: 'Afrique du Sud', flag: '🇿🇦' },
    { code: '+30', name: 'Grèce', flag: '🇬🇷' },
    { code: '+31', name: 'Pays-Bas', flag: '🇳🇱' },
    { code: '+32', name: 'Belgique', flag: '🇧🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+34', name: 'Espagne', flag: '🇪🇸' },
    { code: '+39', name: 'Italie', flag: '🇮🇹' },
    { code: '+44', name: 'Royaume-Uni', flag: '🇬🇧' },
    { code: '+49', name: 'Allemagne', flag: '🇩🇪' },
    { code: '+52', name: 'Mexique', flag: '🇲🇽' },
    { code: '+54', name: 'Argentine', flag: '🇦🇷' },
    { code: '+55', name: 'Brésil', flag: '🇧🇷' },
    { code: '+56', name: 'Chili', flag: '🇨🇱' },
    { code: '+61', name: 'Australie', flag: '🇦🇺' },
    { code: '+62', name: 'Indonésie', flag: '🇮🇩' },
    { code: '+63', name: 'Philippines', flag: '🇵🇭' },
    { code: '+64', name: 'Nouvelle-Zélande', flag: '🇳🇿' },
    { code: '+65', name: 'Singapour', flag: '🇸🇬' },
    { code: '+66', name: 'Thaïlande', flag: '🇹🇭' },
    { code: '+81', name: 'Japon', flag: '🇯🇵' },
    { code: '+82', name: 'Corée du Sud', flag: '🇰🇷' },
    { code: '+86', name: 'Chine', flag: '🇨🇳' },
    { code: '+90', name: 'Turquie', flag: '🇹🇷' },
    { code: '+91', name: 'Inde', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', name: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', name: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', name: 'Iran', flag: '🇮🇷' },
    { code: '+212', name: 'Maroc', flag: '🇲🇦' },
    { code: '+213', name: 'Algérie', flag: '🇩🇿' },
    { code: '+216', name: 'Tunisie', flag: '🇹🇳' },
    { code: '+220', name: 'Gambie', flag: '🇬🇲' },
    { code: '+221', name: 'Sénégal', flag: '🇸🇳' },
    { code: '+223', name: 'Mali', flag: '🇲🇱' },
    { code: '+224', name: 'Guinée', flag: '🇬🇳' },
    { code: '+225', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+227', name: 'Niger', flag: '🇳🇪' },
    { code: '+228', name: 'Togo', flag: '🇹🇬' },
    { code: '+229', name: 'Bénin', flag: '🇧🇯' },
    { code: '+230', name: 'Maurice', flag: '🇲🇺' },
    { code: '+233', name: 'Ghana', flag: '🇬🇭' },
    { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
    { code: '+237', name: 'Cameroun', flag: '🇨🇲' },
    { code: '+243', name: 'RD Congo', flag: '🇨🇩' },
    { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', name: 'Éthiopie', flag: '🇪🇹' },
    { code: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: '+255', name: 'Tanzanie', flag: '🇹🇿' },
    { code: '+260', name: 'Zambie', flag: '🇿🇲' },
    { code: '+263', name: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+353', name: 'Irlande', flag: '🇮🇪' },
    { code: '+358', name: 'Finlande', flag: '🇫🇮' },
    { code: '+420', name: 'Tchéquie', flag: '🇨🇿' },
    { code: '+421', name: 'Slovaquie', flag: '🇸🇰' },
    { code: '+48', name: 'Pologne', flag: '🇵🇱' },
    { code: '+971', name: 'Émirats arabes unis', flag: '🇦🇪' },
    { code: '+972', name: 'Israël', flag: '🇮🇱' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+966', name: 'Arabie saoudite', flag: '🇸🇦' },
    { code: '+961', name: 'Liban', flag: '🇱🇧' },
    { code: '+962', name: 'Jordanie', flag: '🇯🇴' },
    { code: '+963', name: 'Syrie', flag: '🇸🇾' },
    { code: '+964', name: 'Irak', flag: '🇮🇶' },
    { code: '+965', name: 'Koweït', flag: '🇰🇼' },
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+970', name: 'Palestine', flag: '🇵🇸' },
    { code: '+975', name: 'Bhoutan', flag: '🇧🇹' },
    { code: '+976', name: 'Mongolie', flag: '🇲🇳' },
    { code: '+977', name: 'Népal', flag: '🇳🇵' },
    { code: '+994', name: 'Azerbaïdjan', flag: '🇦🇿' },
    { code: '+995', name: 'Géorgie', flag: '🇬🇪' },
    { code: '+996', name: 'Kirghizistan', flag: '🇰🇬' },
    { code: '+998', name: 'Ouzbékistan', flag: '🇺🇿' },
];

const ContactForm: React.FC = () => {
    const phoneNumberDisplay = '+225 05 54 76 90 17';
    const whatsappNumber = '2250554769017';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    // États du formulaire
    const [nom, setNom] = useState('');
    const [contacts, setContacts] = useState('');
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le loader

    // États pour la recherche et la visibilité du dropdown
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === '+33') || countries[0]);

    // Référence pour détecter les clics en dehors du dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filtrer les pays en fonction de la recherche
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
    );

    // Gérer le clic en dehors du dropdown pour le fermer
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

    // Gérer la sélection d'un pays
    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Début du chargement
        setSubmissionStatus('idle'); // Réinitialiser le statut
        setMessage('');

        const formData = {
            nom: nom,
            contacts: selectedCountry.code + contacts,
            email,
        };

        try {
            console.log(formData);
            //const response = await fetch('http://localhost:8000/api/submit-form', {
            const response = await fetch('https://mon-back-mlc.onrender.com/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(formData);
                setSubmissionStatus('success');
                setMessage('C\'est parfait ! Vous recevrez un message WhatsApp et un e-mail avec les prochaines étapes à suivre. Merci !');
                setNom('');
                setContacts('');
                setEmail('');
                setSelectedCountry(countries.find(c => c.code === '+33') || countries[0]);
            } else {
                setSubmissionStatus('error');
                setMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
            setSubmissionStatus('error');
            setMessage('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');
        } finally {
            setIsLoading(false); // Fin du chargement
        }
    };

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Inscrivez-vous et rejoignez-nous !
                </h2>
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start max-w-5xl mx-auto">
                    {/* Formulaire d'inscription */}
                    <div className="w-full md:w-2/3 bg-gray-100 p-8 rounded-lg shadow-xl">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fullName" className="block text-gray-600">Nom & Prénom</label>
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
                                <label htmlFor="phone" className="block text-gray-600">Numéro de téléphone</label>
                                <div className="flex flex-col sm:flex-row mt-1 relative w-full" ref={dropdownRef}>
                                    {/* Déclencheur du dropdown personnalisé */}
                                    <div
                                        className="flex items-center justify-between w-full sm:w-48 px-4 py-3 bg-white border border-gray-300 rounded-md sm:rounded-r-none text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <span>{selectedCountry.flag}</span>
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

                                    {/* Contenu du dropdown avec barre de recherche (affiché conditionnellement) */}
                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                                            <input
                                                type="text"
                                                placeholder="Rechercher un pays..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3a75ff]"
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
                                                            <span>{country.code} - {country.name}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-2 text-gray-600">Aucun pays trouvé.</div>
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
                                <label htmlFor="email" className="block text-gray-600">Adresse e-mail</label>
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
                                        Envoi en cours...
                                    </>
                                ) : (
                                    "Envoyer"
                                )}
                            </button>
                            {message && (
                                <p className={`text-center mt-4 ${submissionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Informations de contact */}
                    <div className="w-full md:w-1/3 p-8 md:p-0">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="bg-[#3a75ff] p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.26 1.359a9.986 9.986 0 005.003 5.003l1.359-2.26a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-600">Numéro de téléphone</p>
                                <p className="text-lg font-semibold text-gray-800">{phoneNumberDisplay}</p>
                            </div>
                        </div>

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 transition-transform duration-300 transform hover:scale-105">
                            <div className="bg-green-500 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.04 2a10 10 0 00-9.87 11.23l-1.3 4.72a1 1 0 001.27 1.27l4.72-1.3A10 10 0 1012.04 2zm4.8 14.54a2.9 2.9 0 01-4.11 0l-2.07-2.07a.64.64 0 01-.16-.39.67.67 0 01.16-.39l1.1-1.1a.64.64 0 01.91 0l.44.44a.64.64 0 00.91 0l2.37-2.37a.64.64 0 000-.91l-.44-.44a.64.64 0 010-.91l1.1-1.1a.64.64 0 01.39-.16.67.67 0 01.39.16l2.07 2.07a2.9 2.9 0 010 4.11L16.84 16.54z" />
                                </svg>
                            </div>
                            <p className="text-lg font-semibold text-gray-800">Contactez-nous sur WhatsApp</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;