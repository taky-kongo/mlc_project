// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, Target } from "lucide-react";
import { useTranslation } from 'react-i18next'; // Importez le hook

interface UserData {
    Nom: string;
    Email: string;
    Contacts: string;
    date?: string;
}

const stats = [
    {
        titleKey: "dashboardPage.stats.totalProspectsTitle",
        value: "2,345",
        change: "+12%",
        icon: Users,
        color: "text-blue-600",
    },
    {
        titleKey: "dashboardPage.stats.conversionsTitle",
        value: "145",
        change: "+8%",
        icon: TrendingUp,
        color: "text-green-600",
    },
    {
        titleKey: "dashboardPage.stats.revenueTitle",
        value: "€45,231",
        change: "+23%",
        icon: DollarSign,
        color: "text-purple-600",
    },
    {
        titleKey: "dashboardPage.stats.conversionRateTitle",
        value: "6.2%",
        change: "+2%",
        icon: Target,
        color: "text-orange-600",
    },
];


const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
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
                    console.error(t("dashboardPage.errors.dataFormat"));
                    setError(t("dashboardPage.errors.dataFormat"));
                }
            } else if (response.status === 401 || response.status === 403) {
                console.error(t("dashboardPage.errors.auth"));
                handleLogout();
            } else {
                setError(t('dashboardPage.errors.fetch', { statusText: response.statusText }));
            }
        } catch (err) {
            console.error(t('dashboardPage.errors.apiConnection', { errorText: err instanceof Error ? err.message : String(err) }));
            setError(t('dashboardPage.errors.apiConnection', { errorText: err instanceof Error ? err.message : String(err) }));
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
        return <div className="text-center mt-20">{t('dashboardPage.loading')}</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    if (users.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {t('dashboardPage.title')}
                </h1>
                <p className="text-gray-500">{t('dashboardPage.noUsersFound')}</p>
                <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    {t('dashboardPage.logoutButton')}
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.titleKey} className="bg-white rounded-lg shadow p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-gray-500">{t(stat.titleKey)}</h3>
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold mt-2">{stat.value}</div>
                            <p className="text-xs text-green-600 font-medium mt-1">
                                {stat.change}{t('dashboardPage.stats.changeSuffix')}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AdminDashboard;