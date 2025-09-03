// src/components/Sidebar.tsx

import { NavLink, useLocation } from 'react-router-dom';
import { useState } from "react";
import { useTranslation } from "react-i18next"; // Import du hook de traduction
import { Users, Menu, X, UserRoundSearch } from 'lucide-react';

interface SidebarProps {
    className?: string;
}

const navigation = [
    // { name: 'Dashboard', nameKey: 'sidebar.dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Prospects', nameKey: 'sidebar.prospects', href: '/admin/prospects', icon: Users },
    { name: 'Prospection', nameKey: 'sidebar.prospection', href: '/admin/prospection', icon: UserRoundSearch },
    // { name: 'Mon compte', nameKey: 'sidebar.myAccount', href: '/admin/profile', icon: UserRoundCog },
];

export default function Sidebar({ className }: SidebarProps) {
    const { t } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    return (
        <div
            className={`flex flex-col border-r border-gray-700 bg-gray-900 text-white transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-64'
            } ${className}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!isCollapsed && <h1 className="text-xl font-bold text-blue-400">{t('sidebar.dashboard')}</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-white hover:bg-gray-700 p-2 rounded-md transition-colors"
                >
                    {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.href);

                    return (
                        <NavLink
                            key={item.nameKey} // Utilise la clé de traduction comme clé unique
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-100 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && <span>{t(item.nameKey)}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">A</span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{t('sidebar.admin')}</p>
                            <p className="text-xs text-gray-400 truncate">{t('sidebar.emailExample')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}