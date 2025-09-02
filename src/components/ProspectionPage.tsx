// src/components/ProspectsPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

interface Prospect {
    Nom_Profil: string;
    Titre: string;
    Lien_Profil: string;
    Description_Profils: string;
}

export default function ProspectionPage() {

    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(prospects.length / itemsPerPage);
    const paginatedProspects = prospects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/admin/login');
        } else {
            fetchProspects(jwtToken);
        }
    }, [navigate]);

    const fetchProspects = async (token: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://mon-back-mlc.onrender.com/prospections', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();

                // La réponse de l'API est correcte, on peut directement utiliser la clé 'items'
                if (Array.isArray(responseData?.data)) {
                    responseData?.data.shift();
                    setProspects(responseData?.data);
                } else {
                    console.error("Le format de données de l'API est incorrect. La clé 'items' n'est pas un tableau.");
                    setError("Erreur : Le format de données de l'API est incorrect.");
                }
            } else if (response.status === 401 || response.status === 403) {
                console.error("Erreur d'authentification. Redirection vers la page de connexion.");
                handleLogout();
            } else {
                setError(`Erreur lors de la récupération des données : ${response.statusText}`);
            }
        } catch (err) {
            console.error('Erreur de connexion à l\'API :', err);
            setError(`Impossible de se connecter à l'API. Erreur: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAuthenticated');
        navigate('/admin/login');
    };

    if (loading) {
        return <div className="text-center mt-20">Chargement des données...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    if (prospects.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord administrateur</h1>
                <p className="text-gray-500">Aucune prospects trouvés.</p>
                <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Déconnexion
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prospects trouvés</h1>
                    <p className="text-gray-500">Liste des prospects touvés sur internet à convertir en client MLC</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-2">Liste des prospects</h2>
                <p className="text-gray-500 mb-6">
                    {prospects.length} prospect{prospects.length > 1 ? "s" : ""} au total
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre profil</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lien profil</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            {/* <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th> */}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProspects.map((prospect, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prospect.Nom_Profil}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.Titre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a href={prospect.Lien_Profil} target="_blank" rel="noopener noreferrer">{prospect.Lien_Profil}</a></td>
                                <td className="px-6 py-4 text-sm text-gray-500 break-words max-w-xs" title={prospect.Description_Profils}>{prospect.Description_Profils}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}