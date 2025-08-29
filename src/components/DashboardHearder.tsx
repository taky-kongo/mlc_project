// src/components/DashboardHeader.tsx
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function DashboardHeader() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAuthenticated');
        navigate('/admin/login');
    };

    return (
        <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
                {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder={t('dashboardHeaderPage.searchPlaceholder')}
            className="pl-10 w-64 h-9 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div> */}
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    <span>{t('dashboardHeaderPage.logout')}</span>
                </button>

                <button
                    className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label={t('dashboardHeaderPage.profile')}
                    onClick={() => navigate('/admin/profile')}
                >
                    <User className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}

export default DashboardHeader;