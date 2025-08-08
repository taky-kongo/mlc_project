// src/components/TimedModal.tsx
import React, { useState, useEffect } from 'react';

const TimedModal: React.FC = () => {
    // État pour contrôler la visibilité du modal
    const [isVisible, setIsVisible] = useState(false);
    // État pour gérer la vue actuelle du modal : 'intro', 'form' ou 'success'
    const [view, setView] = useState<'intro' | 'form' | 'success'>('intro');
    // État pour stocker le message de succès
    const [submissionMessage, setSubmissionMessage] = useState('');
    // État pour stocker un message d'erreur en cas d'échec de la soumission
    const [errorMessage, setErrorMessage] = useState('');

    // États pour les champs du formulaire
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    // Effet pour déclencher le minuteur au chargement du composant
    useEffect(() => {
        // Le timer est configuré pour 30 000 ms (30 secondes)
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 30000);

        // Fonction de nettoyage pour annuler le timer si le composant est démonté
        return () => clearTimeout(timer);
    }, []);

    // Gérer la soumission du formulaire
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(''); // Réinitialise le message d'erreur avant l'envoi

        const formData = {
            firstName,
            lastName,
            email,
            whatsapp,
        };

        try {
            const response = await fetch(
                "https://n8n-mtpk.onrender.com/webhook-test/7bcba2bc-9dd2-49c5-902b-28170a5ec7f3",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                // Envoi réussi
                setSubmissionMessage("C'est parfait ! Vous recevrez un message WhatsApp et un e-mail avec les prochaines étapes à suivre. Merci !");
                setView('success');
            } else {
                // Gérer les erreurs de réponse non OK
                setErrorMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
                console.error("Échec de l'envoi du formulaire", response.statusText);
            }
        } catch (error) {
            // Gérer les erreurs réseau
            setErrorMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
            console.error("Erreur d'envoi du formulaire:", error);
        }

        // Réinitialiser les champs du formulaire après l'envoi, qu'il réussisse ou échoue
        setFirstName('');
        setLastName('');
        setEmail('');
        setWhatsapp('');
    };

    // Ne rien afficher si le modal n'est pas visible
    if (!isVisible) {
        return null;
    }

    return (
        // Conteneur de l'overlay du modal. Le positionnement `fixed` le place au-dessus de tout.
        // Ajout d'une opacité légère et d'un effet de flou pour l'arrière-plan.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-md">
            {/* Contenu du modal */}
            <div className="relative bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 scale-100">
                {/* Bouton pour fermer le modal avec une icône en forme de croix */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Contenu de la modale en fonction de la vue actuelle */}
                {view === 'intro' && (
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#3a75ff] mb-4">Rejoignez-nous !</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            Pour vous inscrire et commencer à investir, nous avons besoin de quelques informations. Vous recevrez ensuite un message WhatsApp et un e-mail avec toutes les instructions.
                        </p>
                        <button
                            onClick={() => setView('form')}
                            className="w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600"
                        >
                            Commencer l'inscription
                        </button>
                    </div>
                )}

                {view === 'form' && (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#3a75ff] mb-4">Formulaire d'inscription</h3>
                        {/* Afficher un message d'erreur s'il existe */}
                        {errorMessage && (
                            <p className="text-center text-red-500 font-medium">{errorMessage}</p>
                        )}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff]"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff]"
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
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff]"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Numéro WhatsApp</label>
                            <input
                                type="tel"
                                id="whatsapp"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3a75ff] focus:border-[#3a75ff]"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#3a75ff] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600"
                        >
                            Je m'inscris
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
