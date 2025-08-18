// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
    // Les champs doivent correspondre exactement à la casse de votre backend
    Nom: string;
    Email: string;
    Contacts: string;
    // J'ai laissé ce champ mais l'ai rendu optionnel car il n'est pas dans la réponse API
    date?: string;
}

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/admin/login');
        } else {
            fetchUsers(jwtToken);
        }
    }, [navigate]);

    const fetchUsers = async (token: string) => {
        setLoading(true);
        setError('');
        try {
            //const response = await fetch('http://127.0.0.1:8000/admin', {
            const response = await fetch('https://mon-back-mlc.onrender.com/api/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();

                if (Array.isArray(responseData.data)) {
                    setUsers(responseData.data);
                } else {
                    console.error("Le format de données de l'API est incorrect. La clé 'data' n'est pas un tableau.");
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

    if (users.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord administrateur</h1>
                <p className="text-gray-500">Aucune inscription trouvée.</p>
                <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Déconnexion
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Tableau de bord administrateur</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Déconnexion
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nom et Prénom
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            E-mail
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date d'inscription
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <tr key={index}>
                            {/* Les champs sont maintenant en majuscules pour correspondre au backend */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.Nom}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.Email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.Contacts}</td>
                            {/* Affiche la date si le champ est présent, sinon une cellule vide */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.date || 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;