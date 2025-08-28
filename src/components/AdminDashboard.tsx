// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, Target } from "lucide-react";

interface UserData {
    // Les champs doivent correspondre exactement à la casse de votre backend
    Nom: string;
    Email: string;
    Contacts: string;
    // J'ai laissé ce champ mais l'ai rendu optionnel car il n'est pas dans la réponse API
    date?: string;
}

const stats = [
  {
    title: "Total Prospects",
    value: "2,345",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Conversions",
    value: "145",
    change: "+8%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Revenus",
    value: "€45,231",
    change: "+23%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Taux de conversion",
    value: "6.2%",
    change: "+2%",
    icon: Target,
    color: "text-orange-600",
  },
];


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
            const response = await fetch('https://api.mlc.ci/admin', {
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
            const Icon = stat.icon;
            return (
            // Remplacement du composant Card par une div stylisée
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                <div className="text-2xl font-bold mt-2">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium mt-1">{stat.change} par rapport au mois dernier</p>
                </div>
            </div>
            );
        })}
        </div>
    );
};

export default AdminDashboard;