import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { directorService } from "../services/directorService";
import { 
  LayoutDashboard, 
  Calendar, 
  Plus, 
  Eye, 
  Users, 
  Building2, 
  MessageSquare, 
  BarChart3, 
  FileText, 
  LogOut, 
  User, 
  X,
  Edit
} from 'lucide-react';

const DirectorDashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [profileData, setProfileData] = useState({
    prenom: user?.prenom || "",
    nom: user?.nom || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    departement: user?.departement || "",
    specialite: user?.specialite || "",
  });

  useEffect(() => {
    console.log('🚀 DirectorDashboard useEffect déclenché');
    console.log('👤 Utilisateur:', user);
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    console.log('🔄 Chargement des données du dashboard directeur...');
    
    try {
      const stats = await directorService.getStats();
      console.log('✅ Statistiques récupérées:', stats);

      const data = {
        title: "Espace Directeur de Département",
        stats: [
          { label: "Enseignants", value: stats.enseignants.toString(), icon: "👨‍🏫", color: "blue" },
          { label: "Étudiants", value: stats.etudiants.toString(), icon: "👥", color: "green" },
          { label: "Classes", value: stats.classes.toString(), icon: "📚", color: "purple" },
          { label: "Taux de réussite", value: `${stats.tauxReussite}%`, icon: "📊", color: "orange" },
        ],
        actions: [
          { label: "👥 Gérer utilisateurs", description: "Administration des comptes utilisateurs", action: "manageUsers" },
          { label: "👨‍🏫 Gérer enseignants", description: "Gestion du personnel enseignant", action: "manageTeachers" },
          { label: "👨‍🎓 Gérer étudiants", description: "Gestion des étudiants du département", action: "manageStudents" },
          { label: "💬 Messagerie", description: "Messagerie interne avec enseignants et étudiants", action: "messaging" },
          { label: "📊 Rapports", description: "Générer des rapports département", action: "reports" },
          { label: "💰 Budget", description: "Suivi budgétaire du département", action: "budget" },
          { label: "📝 Évaluations", description: "Gestion des évaluations", action: "evaluations" },
        ],
      };
      
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des stats:', error);
      const data = {
        title: "Espace Directeur de Département",
        stats: [
          { label: "Enseignants", value: "—", icon: "👨‍🏫", color: "blue" },
          { label: "Étudiants", value: "—", icon: "👥", color: "green" },
          { label: "Classes", value: "—", icon: "📚", color: "purple" },
          { label: "Taux de réussite", value: "—", icon: "📊", color: "orange" },
        ],
        actions: [
          { label: "👥 Gérer utilisateurs", description: "Administration des comptes utilisateurs", action: "manageUsers" },
          { label: "👨‍🏫 Gérer enseignants", description: "Gestion du personnel enseignant", action: "manageTeachers" },
          { label: "👨‍🎓 Gérer étudiants", description: "Gestion des étudiants du département", action: "manageStudents" },
          { label: "💬 Messagerie", description: "Messagerie interne avec enseignants et étudiants", action: "messaging" },
          { label: "📊 Rapports", description: "Générer des rapports département", action: "reports" },
          { label: "💰 Budget", description: "Suivi budgétaire du département", action: "budget" },
          { label: "📝 Évaluations", description: "Gestion des évaluations", action: "evaluations" },
        ],
      };
      setDashboardData(data);
      setLoading(false);
    }
  };

  const handleAction = (action) => {
    setActiveNav(action);
    switch (action) {
      case "dashboard":
        break;
      case "mySchedule":
        navigate("/my-schedule");
        break;
      case "createSchedule":
        navigate("/schedule-builder");
        break;
      case "viewSchedules":
        navigate("/schedule-viewer");
        break;
      case "teacherSchedules":
        navigate("/teacher-schedules");
        break;
      case "roomSchedules":
        navigate("/room-schedules");
        break;
      case "manageUsers":
        navigate("/admin");
        break;
      case "manageTeachers":
        alert("Ouverture de la gestion des enseignants...");
        break;
      case "manageStudents":
        alert("Ouverture de la gestion des étudiants...");
        break;
      case "messaging":
        navigate('/messagerie');
        break;
      case "reports":
        alert("Ouverture des rapports...");
        break;
      case "budget":
        alert("Ouverture de la gestion budgétaire...");
        break;
      case "evaluations":
        alert("Ouverture des évaluations...");
        break;
      default:
        alert(`Action ${action} non implémentée`);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.prenom || !profileData.nom || !profileData.email) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const response = await updateUser({
        nom: profileData.nom,
        prenom: profileData.prenom,
        cin: user.cin,
      });

      if (response.success) {
        alert("Profil mis à jour avec succès!");
        setEditingProfile(false);
        setProfileData({
          ...profileData,
          prenom: response.user.prenom,
          nom: response.user.nom,
        });
      } else {
        alert(response.message || "Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'espace directeur...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-600">Erreur de chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">ISET Tozeur</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Menu Principal */}
          <div>
            <div className="text-xs font-semibold text-blue-300 uppercase mb-2">Menu Principal</div>
            <button
              onClick={() => handleAction('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === 'dashboard' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="text-sm font-medium">Tableau de bord</span>
            </button>

            <button
              onClick={() => handleAction('mySchedule')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'mySchedule' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Calendar size={20} />
              <span className="text-sm font-medium">Mon Emploi du Temps</span>
            </button>
          </div>

          {/* Emplois du Temps */}
          <div>
            <div className="text-xs font-semibold text-blue-300 uppercase mb-2">Emplois du Temps</div>
            <button
              onClick={() => handleAction('createSchedule')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === 'createSchedule' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Plus size={20} />
              <span className="text-sm font-medium">Créer emploi du temps</span>
            </button>

            <button
              onClick={() => handleAction('viewSchedules')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'viewSchedules' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Eye size={20} />
              <span className="text-sm font-medium">Voir emplois classes</span>
            </button>

            <button
              onClick={() => handleAction('teacherSchedules')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'teacherSchedules' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Users size={20} />
              <span className="text-sm font-medium">Emplois enseignants</span>
            </button>

            <button
              onClick={() => handleAction('roomSchedules')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'roomSchedules' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Building2 size={20} />
              <span className="text-sm font-medium">Emplois salles</span>
            </button>
          </div>

          {/* Gestion */}
          <div>
            <div className="text-xs font-semibold text-blue-300 uppercase mb-2">Gestion</div>
            <button
              onClick={() => handleAction('manageTeachers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === 'manageTeachers' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Users size={20} />
              <span className="text-sm font-medium">Gérer enseignants</span>
            </button>

            <button
              onClick={() => handleAction('manageStudents')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'manageStudents' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <Users size={20} />
              <span className="text-sm font-medium">Gérer étudiants</span>
            </button>
          </div>

          {/* Outils */}
          <div>
            <div className="text-xs font-semibold text-blue-300 uppercase mb-2">Outils</div>
            <button
              onClick={() => handleAction('messaging')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === 'messaging' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <MessageSquare size={20} />
              <span className="text-sm font-medium">Messagerie</span>
            </button>

            <button
              onClick={() => handleAction('reports')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'reports' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <BarChart3 size={20} />
              <span className="text-sm font-medium">Rapports</span>
            </button>

            <button
              onClick={() => handleAction('evaluations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 ${
                activeNav === 'evaluations' ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
              }`}
            >
              <FileText size={20} />
              <span className="text-sm font-medium">Évaluations</span>
            </button>
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="p-4 border-t border-blue-700">
          <div className="mb-3 pb-3 border-b border-blue-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="text-xs text-blue-300 truncate">Chef de Département</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
              <p className="text-sm text-gray-500">Espace Directeur de Département</p>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User size={18} />
              Profil
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-8">
          {/* Stats Grid with Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardData?.stats.map((stat, index) => {
              // Calculer un pourcentage pour la barre de progression (simule une tendance)
              const percentage = stat.label === "Taux de réussite" 
                ? parseInt(stat.value) 
                : Math.min(95, parseInt(stat.value) * 2 || 75);
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      +12%
                    </div>
                  </div>

                  {/* Valeur principale */}
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progression</span>
                      <span className="font-semibold">{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getStatColorClasses(stat.color)} transition-all duration-1000 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mini graphique sparkline */}
                  <div className="flex items-end justify-between h-8 gap-1">
                    {[65, 70, 68, 75, 80, 78, 85, 90, 88, percentage].map((height, i) => (
                      <div 
                        key={i}
                        className={`flex-1 bg-gradient-to-t ${getStatColorClasses(stat.color)} rounded-t opacity-30 hover:opacity-60 transition-all`}
                        style={{ height: `${(height / 100) * 32}px` }}
                      ></div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getStatColorClasses(stat.color)}`}></div>
                      Actif
                    </span>
                    <span>Mis à jour</span>
                  </div>
                </div>
              );
            })}
          </div>


        </main>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                  {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{user?.prenom} {user?.nom}</h3>
                  <p className="text-blue-100">Directeur de Département</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {editingProfile ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleProfileUpdate();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.prenom}
                      onChange={(e) =>
                        setProfileData({ ...profileData, prenom: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.nom}
                      onChange={(e) =>
                        setProfileData({ ...profileData, nom: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      title="L'email ne peut pas être modifié"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="text-sm text-gray-600">Prénom:</span>
                    <p className="text-lg font-semibold text-gray-800">{user?.prenom}</p>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <span className="text-sm text-gray-600">Nom:</span>
                    <p className="text-lg font-semibold text-gray-800">{user?.nom}</p>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <span className="text-sm text-gray-600">Département:</span>
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.departement?.nom || "Non spécifié"}
                    </p>
                  </div>

                  <div className="pb-3">
                    <span className="text-sm text-gray-600">Rôle:</span>
                    <p className="mt-1">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Directeur de Département
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => setEditingProfile(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Edit size={18} />
                    Modifier le profil
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorDashboard;