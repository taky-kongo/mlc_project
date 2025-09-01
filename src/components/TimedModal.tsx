// src/components/TimedModal.tsx
import React, { useState, useEffect } from 'react';

// Je définis le type pour les pays pour plus de clarté
interface Country {
    code: string;
    name: string;
    flag: string;
}

// Liste des pays
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

// Définition des props que le composant attend
interface TimedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TimedModal: React.FC<TimedModalProps> = ({ isOpen, onClose }) => {
    // État pour gérer la vue actuelle du modal : 'intro', 'form' ou 'success'
    const [view, setView] = useState<'intro' | 'form' | 'success'>('intro');
    // États pour les messages
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // Nouvel état pour le loader
    const [isLoading, setIsLoading] = useState(false);

    // États pour le formulaire
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [contacts, setContacts] = useState('');

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
        }
    }, [isOpen]);

    // Gérer la soumission du formulaire
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true); // Début du chargement

        const formData = {
            nom: nom,
            email,
            contacts: selectedCountry?.code + contacts,
        };

        try {
            //const response = await fetch('http://localhost:8000/api/submit-form', {
            const response = await fetch('https://mon-back-mlc.onrender.com/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                setErrorMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
                console.error("Échec de l'envoi du formulaire", response.statusText);
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.status_code === 201) {
                setSubmissionMessage("C'est parfait ! Vous recevrez un e-mail avec les prochaines étapes à suivre. Merci !");
                setView('success');
                localStorage.setItem('user_registration_data', JSON.stringify(formData));
            } else if (data.status_code === 409) {
                setErrorMessage("L'email est déjà utilisé. Veuillez en utiliser un autre.");
                console.error("Échec de l'envoi du formulaire", response.statusText);
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
            console.error("Erreur d'envoi du formulaire:", error);
        } finally {
            setIsLoading(false); // Fin du chargement, que ce soit un succès ou un échec
        }
    };

    // Filtrer les pays en fonction de la recherche
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchCode.toLowerCase()) ||
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
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {view === 'intro' && (
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#3a75ff] mb-4">Rejoignez-nous !</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            Rejoignez la communauté d'investisseurs passionnés et découvrez des opportunités exclusives pour faire fructifier votre patrimoine. Inscrivez-vous en moins d'une minute.
                        </p>
                        <button
                            onClick={() => setView('form')}
                            className="w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 cursor-pointer"
                        >
                            Je rejoins la communauté
                        </button>
                    </div>
                )}

                {view === 'form' && (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#3a75ff] mb-4">Formulaire d'inscription</h3>
                        {errorMessage && (<p className="text-center text-red-500 font-medium">{errorMessage}</p>)}

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nom et Prénom</label>
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
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
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
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Numéro WhatsApp</label>
                            <div className="flex mt-1">
                                {/* Composant de recherche d'indicatif */}
                                <div className="relative w-1/3 mr-2">
                                    <input
                                        type="text"
                                        placeholder="Code..."
                                        value={selectedCountry ? `${selectedCountry.flag} ${selectedCountry.code}` : searchCode}
                                        onFocus={() => setShowCodeDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowCodeDropdown(false), 200)}
                                        onChange={(e) => {
                                            setSearchCode(e.target.value);
                                            setSelectedCountry(null); // Réinitialise le pays sélectionné si l'utilisateur modifie la recherche
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
                                                        <span>{country.code} ({country.name})</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">Aucun pays trouvé</li>
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
                                    className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff] text-gray-900"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
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
                                "Je m'inscris"
                            )}
                        </button>
                    </form>
                )}

                {view === 'success' && (
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">C'est parfait !</h3>
                        <p className="text-lg text-gray-700 mb-6">{submissionMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimedModal;