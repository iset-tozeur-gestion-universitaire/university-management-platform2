import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DirectorSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-72 bg-gradient-to-br from-blue-900 to-blue-800 text-white flex flex-col shadow-2xl">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-blue-800">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent">
          RÉSEAU
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        {/* Menu Principal */}
        <div className="px-4 mb-6">
          <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3 px-3">
            Menu Principal
          </div>
          <button
            onClick={() => handleNavigation('/director-dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive('/director-dashboard')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="font-medium">Tableau de bord</span>
          </button>

          <button
            onClick={() => handleNavigation('/my-schedule')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mt-2 ${
              isActive('/my-schedule')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="font-medium">Mon Emploi du Temps</span>
          </button>
        </div>

        {/* Gestion Emplois du Temps */}
        <div className="px-4 mb-6">
          <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3 px-3">
            Emplois du Temps
          </div>
          <button
            onClick={() => handleNavigation('/schedule-builder')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive('/schedule-builder')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="font-medium">Créer emploi du temps</span>
          </button>

          <button
            onClick={() => handleNavigation('/schedule-viewer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mt-2 ${
              isActive('/schedule-viewer')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span className="font-medium">Voir emplois classes</span>
          </button>

          <button
            onClick={() => handleNavigation('/teacher-schedules')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mt-2 ${
              isActive('/teacher-schedules')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="font-medium">Emplois enseignants</span>
          </button>

          <button
            onClick={() => handleNavigation('/room-schedules')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mt-2 ${
              isActive('/room-schedules')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span className="font-medium">Emplois salles</span>
          </button>
        </div>

        {/* Gestion Utilisateurs */}
        <div className="px-4 mb-6">
          <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3 px-3">
            Gestion Utilisateurs
          </div>
          <button
            onClick={() => handleNavigation('/admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive('/admin')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="font-medium">Gérer utilisateurs</span>
          </button>
        </div>

        {/* Outils */}
        <div className="px-4 mb-6">
          <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3 px-3">
            Outils
          </div>
          <button
            onClick={() => handleNavigation('/messagerie')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive('/messagerie')
                ? 'bg-blue-700 shadow-lg'
                : 'hover:bg-blue-800'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="font-medium">Messagerie</span>
          </button>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-6 border-t border-blue-800 border-b">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user?.prenom} {user?.nom}</h3>
            <p className="text-blue-300 text-sm">Directeur de Département</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default DirectorSidebar;
