// src/components/ProspectsPage.tsx

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import toast from "react-hot-toast";

interface Prospect {
    id: string;
    nom: string;
    email: string;
    contacts: string;
}

export default function ProspectsPage() {

    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10; // J'ai augmenté la valeur pour un affichage plus réaliste

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/admin/login');
        } else {
            fetchProspects(currentPage);
        }
    }, [currentPage]);

    const fetchProspects = async (page: number = 1) => {
        setLoading(true);
        setError('');
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/admin/login');
            return;
        }
        try {
            const response = await fetch(`https://mon-back-mlc.onrender.com/prospects/?page=${page}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setProspects([]);

                // La réponse de l'API est correcte, on peut directement utiliser la clé 'items'
                if (Array.isArray(responseData?.items)) {
                    setProspects(responseData.items);
                    setTotalPages(Math.ceil(responseData.total_count / itemsPerPage));
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
        fetchProspects(page);
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
                <p className="text-gray-500">Aucune inscription trouvée.</p>
                <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Déconnexion
                </button>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (editingProspect) {
            // Update existing prospect
            setProspects(prospects.map((p) => (p.id === editingProspect.id ? { ...p, ...formData } : p)));
            try {
                const response = await fetch(`https://mon-back-mlc.onrender.com/prospects/${editingProspect.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                    body: JSON.stringify({
                        nom: formData.name,
                        email: formData.email,
                        contacts: formData.phone,
                    }),
                });
                console.log('Update response:', response);
                if (!response.ok) {
                    console.error('Erreur lors de la mise à jour du prospect:', response.statusText);
                    // Tu peux aussi afficher une notification ou un toast ici
                    toast.error('Erreur lors de la mise à jour du prospect.')
                }
                fetchProspects(currentPage);
                resetForm();
                setIsModalOpen(false);
                setEditingProspect(null);
                toast.success('Prospect mis à jour avec succès !')
            } catch (error) {
                console.error('Erreur de mise à jour :', error);
                // Tu peux aussi afficher une notification ou un toast ici
            }finally {
                setIsLoading(false);
            }

        } else {

            try {
                const response = await fetch('https://mon-back-mlc.onrender.com/prospects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                    body: JSON.stringify({
                        nom: formData.name,
                        email: formData.email,
                        contacts: formData.phone,
                    }),
                });
                console.log('Add response:', response);
                if (!response.ok) {
                    console.error('Erreur lors de l\'ajout du prospect:', response.statusText);
                    // Tu peux aussi afficher une notification ou un toast ici
                    toast.error('Erreur lors de l\'ajout du prospect.')
                }
                fetchProspects(currentPage);
                resetForm();
                setIsModalOpen(false);
                setEditingProspect(null);
                toast.success('Prospect ajouté avec succès !')
            } catch (error) {
                console.error('Erreur d\'ajout :', error);
                // Tu peux aussi afficher une notification ou un toast ici
                toast.error('Erreur lors de l\'ajout du prospect.')
            }finally {
                setIsLoading(false);
            }
        }

        resetForm();
        setIsModalOpen(false);
    };

    const handleEdit = (prospect: Prospect) => {
        setEditingProspect(prospect);
        setFormData({
            name: prospect.nom,
            email: prospect.email,
            phone: prospect.contacts,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('jwtToken');
        setDeletingId(id);
        if (!token) {
            navigate('/admin/login');
            return;
        }
        try {
            const response = await fetch(`https://mon-back-mlc.onrender.com/prospects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                fetchProspects(currentPage);    
                toast.success('Prospect supprimé avec succès !')          
            } else if (response.status === 401 || response.status === 403) {
                console.error("Erreur d'authentification. Redirection vers la page de connexion.");
                handleLogout();
            } else {
                setError(`Erreur lors de la récupération des données : ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erreur de suppression :', error);
            // Tu peux aussi afficher une notification ou un toast ici
        }finally {
            setDeletingId(null);
        }
    };


    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
        });
        setEditingProspect(null);
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prospects</h1>
                    <p className="text-gray-500">Gérez vos prospects et suivez leur progression</p>
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un prospect
                </button>
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {prospects.map((prospect) => (
                            <tr key={prospect.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prospect.nom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.contacts}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(prospect)}
                                            className="text-blue-600 hover:text-blue-900"
                                            aria-label="Modifier"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prospect.id)}
                                            className="text-red-600 hover:text-red-900"
                                            aria-label="Supprimer"
                                            disabled={deletingId === prospect.id}
                                        >
                                            {deletingId === prospect.id ? (
                                                <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(newPage)=>handlePageChange(newPage)}
                />
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-10 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold">{editingProspect ? "Modifier le prospect" : "Ajouter un prospect"}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Fermer</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                    {isLoading && (
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    )}
                                    {editingProspect ? "Modifier" : "Ajouter"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}