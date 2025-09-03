// src/components/ProspectsPage.tsx

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface Prospect {
    id: string;
    nom: string;
    email: string;
    contacts: string;
//   company: string;
//   status: "nouveau" | "contacté" | "qualifié" | "converti";
}

export default function ProspectsPage() {
    const { t } = useTranslation();
    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
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

                if (Array.isArray(responseData?.items)) {
                    setProspects(responseData.items);
                    setTotalPages(Math.ceil(responseData.total_count / itemsPerPage));
                } else {
                    console.error("Le format de données de l'API est incorrect. La clé 'items' n'est pas un tableau.");
                    setError(t('prospectsPage.errorFormat'));
                }
            } else if (response.status === 401 || response.status === 403) {
                console.error("Erreur d'authentification. Redirection vers la page de connexion.");
                handleLogout();
            } else {
                setError(`${t('prospectsPage.errorApi')}${response.statusText}`);
            }
        } catch (err) {
            console.error('Erreur de connexion à l\'API :', err);
            setError(`${t('prospectsPage.errorConnection')}${err instanceof Error ? err.message : String(err)}`);
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
        return <div className="text-center mt-20">{t('prospectsPage.loading')}</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    if (prospects.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('prospectsPage.listTitle')}</h1>
                <p className="text-gray-500">{t('prospectsPage.noProspects')}</p>
                <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    {t('prospectsPage.logout')}
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
                    toast.error(t('prospectsPage.submitEditError'));
                }
                fetchProspects(currentPage);
                resetForm();
                setIsModalOpen(false);
                setEditingProspect(null);
                toast.success(t('prospectsPage.submitEditSuccess'));
            } catch (error) {
                console.error('Erreur de mise à jour :', error);
                toast.error(t('prospectsPage.submitEditError'));
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
                    toast.error(t('prospectsPage.submitAddError'));
                }
                fetchProspects(currentPage);
                resetForm();
                setIsModalOpen(false);
                setEditingProspect(null);
                toast.success(t('prospectsPage.submitAddSuccess'));
            } catch (error) {
                console.error('Erreur d\'ajout :', error);
                toast.error(t('prospectsPage.submitAddError'));
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
                toast.success(t('prospectsPage.deleteSuccess'));
            } else if (response.status === 401 || response.status === 403) {
                console.error("Erreur d'authentification. Redirection vers la page de connexion.");
                handleLogout();
            } else {
                setError(`${t('prospectsPage.errorApi')}${response.statusText}`);
                toast.error(t('prospectsPage.deleteError'));
            }
        } catch (error) {
            console.error('Erreur de suppression :', error);
            toast.error(t('prospectsPage.deleteError'));
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
                    <h1 className="text-3xl font-bold tracking-tight">{t('prospectsPage.title')}</h1>
                    <p className="text-gray-500">{t('prospectsPage.subtitle')}</p>
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {t('prospectsPage.addProspect')}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-2">{t('prospectsPage.listTitle')}</h2>
                <p className="text-gray-500 mb-6">
                    {t('prospectsPage.totalProspects', { count: prospects.length })}
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('prospectsPage.tableHeaderName')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('prospectsPage.tableHeaderEmail')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('prospectsPage.tableHeaderPhone')}</th>
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
                                            aria-label={t('prospectsPage.actionEdit')}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prospect.id)}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={deletingId === prospect.id}
                                            aria-label={t('prospectsPage.actionDelete')}
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
                            <h3 className="text-xl font-semibold">
                                {editingProspect ? t('prospectsPage.modalTitleEdit') : t('prospectsPage.modalTitleAdd')}
                            </h3>
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('prospectsPage.labelName')}</label>
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
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('prospectsPage.labelEmail')}</label>
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
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('prospectsPage.labelPhone')}</label>
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
                                    {t('prospectsPage.cancel')}
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    {isLoading && (
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    )}
                                    {editingProspect ? t('prospectsPage.submitEdit') : t('prospectsPage.submitAdd')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}