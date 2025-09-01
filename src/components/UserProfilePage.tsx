// src/components/UserProfilePage.tsx

import React, { useState } from 'react';
import { User, Mail, Lock, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UserProfile {
    name: string;
    email: string;
}

export function UserProfilePage() {
    const { t } = useTranslation();

    // Utiliser un état pour les données du profil (ici, des données de démo)
    const [profileData, setProfileData] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        // Simulation d'une attente API
        await new Promise(resolve => setTimeout(resolve, 1500));

        setMessage(t('userProfilePage.successMessage'));
        setIsSubmitting(false);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div className="">
                    <h1 className="text-3xl font-bold tracking-tight">{t('userProfilePage.title')}</h1>
                    <p className="text-gray-500">{t('userProfilePage.subtitle')}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">{t('userProfilePage.accountInfo')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                            <User className="mr-2 h-4 w-4 text-gray-400" />
                            {t('userProfilePage.labelName')}
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={profileData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-gray-400" />
                            {t('userProfilePage.labelEmail')}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        />
                    </div>

                    {/* Section pour changer le mot de passe, si désiré */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold">{t('userProfilePage.changePasswordTitle')}</h3>
                        <div className="space-y-2">
                            <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 flex items-center">
                                <Lock className="mr-2 h-4 w-4 text-gray-400" />
                                {t('userProfilePage.labelCurrentPassword')}
                            </label>
                            <input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 flex items-center">
                                <Lock className="mr-2 h-4 w-4 text-gray-400" />
                                {t('userProfilePage.labelNewPassword')}
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isSubmitting ? t('userProfilePage.saving') : t('userProfilePage.save')}
                        </button>
                    </div>
                    {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default UserProfilePage;