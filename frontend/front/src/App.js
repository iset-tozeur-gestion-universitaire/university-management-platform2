import React, { useState } from 'react';
import { LayoutDashboard, Users, BookOpen, Building2, Calendar, UserCheck, FileText, Bell, Settings, Menu, X, TrendingUp, AlertCircle, Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Données simulées
  const stats = [
    { label: 'Étudiants', value: '1,248', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Enseignants', value: '89', change: '+5%', icon: UserCheck, color: 'bg-green-500' },
    { label: 'Départements', value: '12', change: '0%', icon: Building2, color: 'bg-purple-500' },
    { label: 'Cours actifs', value: '156', change: '+8%', icon: BookOpen, color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { type: 'user', message: 'Nouveau étudiant inscrit: Ahmed Ben Ali', time: 'Il y a 5 min' },
    { type: 'calendar', message: 'Emploi du temps DSI3 modifié', time: 'Il y a 15 min' },
    { type: 'alert', message: '3 conflits d\'emploi du temps détectés', time: 'Il y a 1h' },
    { type: 'document', message: 'Rapport mensuel généré', time: 'Il y a 2h' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'students', label: 'Étudiants', icon: Users },
    { id: 'teachers', label: 'Enseignants', icon: UserCheck },
    { id: 'departments', label: 'Départements', icon: Building2 },
    { id: 'subjects', label: 'Matières', icon: BookOpen },
    { id: 'rooms', label: 'Salles', icon: Building2 },
    { id: 'schedules', label: 'Emplois du temps', icon: Calendar },
    { id: 'reports', label: 'Rapports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const departmentStats = [
    { name: 'Informatique', students: 342, teachers: 23, occupancy: '85%' },
    { name: 'Génie Civil', students: 289, teachers: 19, occupancy: '78%' },
    { name: 'Électrique', students: 267, teachers: 18, occupancy: '72%' },
    { name: 'Mécanique', students: 350, teachers: 29, occupancy: '92%' }
  ];

  // Données pour les différentes pages
  const studentsData = [
    { id: 1, name: 'Ahmed Ben Ali', email: 'ahmed@iset.tn', department: 'Informatique', level: 'DSI 3', status: 'Actif' },
    { id: 2, name: 'Fatma Trabelsi', email: 'fatma@iset.tn', department: 'Informatique', level: 'DSI 2', status: 'Actif' },
    { id: 3, name: 'Mohamed Mansour', email: 'mohamed@iset.tn', department: 'Génie Civil', level: 'GC 3', status: 'Actif' },
    { id: 4, name: 'Sarra Bouaziz', email: 'sarra@iset.tn', department: 'Électrique', level: 'EL 1', status: 'Actif' }
  ];

  const teachersData = [
    { id: 1, name: 'Dr. Karim Ferjani', email: 'karim@iset.tn', department: 'Informatique', specialty: 'Base de données', courses: 5 },
    { id: 2, name: 'Dr. Leila Hadded', email: 'leila@iset.tn', department: 'Informatique', specialty: 'Réseaux', courses: 4 },
    { id: 3, name: 'Ing. Slim Gharbi', email: 'slim@iset.tn', department: 'Génie Civil', specialty: 'Structure', courses: 3 }
  ];

  const departmentsData = [
    { id: 1, name: 'Informatique', head: 'Dr. Karim Ferjani', students: 342, teachers: 23, specialties: 3 },
    { id: 2, name: 'Génie Civil', head: 'Ing. Ahmed Toumi', students: 289, teachers: 19, specialties: 2 },
    { id: 3, name: 'Électrique', head: 'Dr. Mounir Slimi', students: 267, teachers: 18, specialties: 2 },
    { id: 4, name: 'Mécanique', head: 'Ing. Sami Dridi', students: 350, teachers: 29, specialties: 4 }
  ];

  const subjectsData = [
    { id: 1, name: 'Base de données avancées', code: 'BD301', teacher: 'Dr. Karim Ferjani', level: 'DSI 3', hours: 42 },
    { id: 2, name: 'Développement Web', code: 'WEB201', teacher: 'Dr. Leila Hadded', level: 'DSI 2', hours: 35 },
    { id: 3, name: 'Réseaux', code: 'RES301', teacher: 'Dr. Leila Hadded', level: 'DSI 3', hours: 40 }
  ];

  const roomsData = [
    { id: 1, code: 'A101', type: 'Salle de cours', capacity: 40, equipment: 'Projecteur, Tableau' },
    { id: 2, code: 'LAB-INFO-1', type: 'Laboratoire', capacity: 25, equipment: '25 PC, Projecteur' },
    { id: 3, code: 'B205', type: 'Salle de cours', capacity: 35, equipment: 'Projecteur, Tableau' },
    { id: 4, code: 'AMPHI-1', type: 'Amphithéâtre', capacity: 150, equipment: 'Système audio, Projecteur' }
  ];

  // Rendu du Dashboard
  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Statistiques par département</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Voir tout</button>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                  <span className="text-sm text-gray-500">Occupation: {dept.occupancy}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-gray-600">{dept.students} étudiants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck size={16} className="text-green-600" />
                    <span className="text-gray-600">{dept.teachers} enseignants</span>
                  </div>
                </div>
                <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full" style={{ width: dept.occupancy }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Activités récentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === 'user' && <Users size={16} className="text-blue-600" />}
                  {activity.type === 'calendar' && <Calendar size={16} className="text-green-600" />}
                  {activity.type === 'alert' && <AlertCircle size={16} className="text-orange-600" />}
                  {activity.type === 'document' && <FileText size={16} className="text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-1">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => setActiveMenu('students')} className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left">
            <Users size={24} className="mb-2" />
            <p className="font-medium">Ajouter étudiant</p>
          </button>
          <button onClick={() => setActiveMenu('schedules')} className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left">
            <Calendar size={24} className="mb-2" />
            <p className="font-medium">Créer emploi</p>
          </button>
          <button onClick={() => setActiveMenu('reports')} className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left">
            <FileText size={24} className="mb-2" />
            <p className="font-medium">Générer rapport</p>
          </button>
          <button onClick={() => setActiveMenu('rooms')} className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left">
            <Building2 size={24} className="mb-2" />
            <p className="font-medium">Gérer salles</p>
          </button>
        </div>
      </div>
    </>
  );

  // Rendu de la page Étudiants
  const renderStudents = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestion des Étudiants</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Ajouter étudiant
        </button>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Rechercher un étudiant..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Niveau</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {studentsData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.level}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{student.status}</span></td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Rendu de la page Enseignants
  const renderTeachers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestion des Enseignants</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Ajouter enseignant
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Rechercher un enseignant..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spécialité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teachersData.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{teacher.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{teacher.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{teacher.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{teacher.specialty}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{teacher.courses}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Rendu de la page Départements
  const renderDepartments = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestion des Départements</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Ajouter département
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departmentsData.map((dept) => (
          <div key={dept.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{dept.name}</h4>
                <p className="text-sm text-gray-600">Chef: {dept.head}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{dept.students}</p>
                <p className="text-xs text-gray-500">Étudiants</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{dept.teachers}</p>
                <p className="text-xs text-gray-500">Enseignants</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{dept.specialties}</p>
                <p className="text-xs text-gray-500">Spécialités</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Rendu de la page Matières
  const renderSubjects = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestion des Matières</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Ajouter matière
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Rechercher une matière..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enseignant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Niveau</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heures</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjectsData.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{subject.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{subject.code}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{subject.teacher}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{subject.level}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{subject.hours}h</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Rendu de la page Salles
  const renderRooms = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestion des Salles</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Ajouter salle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomsData.map((room) => (
          <div key={room.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">{room.code}</h4>
                <p className="text-sm text-gray-600">{room.type}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Capacité:</span>
                <span className="text-sm font-semibold text-gray-800">{room.capacity} places</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Équipement:</p>
                <p className="text-xs text-gray-500">{room.equipment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Rendu de la page Emplois du temps
  const renderSchedules = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestion des Emplois du temps</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Créer emploi du temps
        </button>
      </div>
      <div className="text-center py-20 text-gray-500">
        <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
        <p className="text-lg">Calendrier des emplois du temps</p>
        <p className="text-sm">Cette fonctionnalité sera disponible prochainement</p>
      </div>
    </div>
  );

  // Rendu de la page Rapports
  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Rapports et Statistiques</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FileText size={20} />
          Générer rapport
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
          <FileText size={32} className="text-blue-600 mb-3" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">Rapport d'assiduité</h4>
          <p className="text-sm text-gray-600 mb-4">Statistiques des absences et présences</p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Télécharger PDF</button>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
          <FileText size={32} className="text-green-600 mb-3" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">Rapport académique</h4>
          <p className="text-sm text-gray-600 mb-4">Résultats et performances des étudiants</p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Télécharger PDF</button>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
          <FileText size={32} className="text-purple-600 mb-3" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">Occupation des salles</h4>
          <p className="text-sm text-gray-600 mb-4">Taux d'utilisation des infrastructures</p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Télécharger CSV</button>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
          <FileText size={32} className="text-orange-600 mb-3" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">Rapport institutionnel</h4>
          <p className="text-sm text-gray-600 mb-4">Vue d'ensemble de l'établissement</p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Télécharger PDF</button>
        </div>
      </div>
    </div>
  );

  // Rendu de la page Notifications
  const renderNotifications = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Centre de Notifications</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Nouvelle notification
        </button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                {activity.type === 'user' && <Users size={20} className="text-blue-600" />}
                {activity.type === 'calendar' && <Calendar size={20} className="text-green-600" />}
                {activity.type === 'alert' && <AlertCircle size={20} className="text-orange-600" />}
                {activity.type === 'document' && <FileText size={20} className="text-purple-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium mb-1">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Marquer lu</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Rendu de la page Paramètres
  const renderSettings = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du système</h3>
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Informations de l'établissement</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'établissement</label>
              <input type="text" defaultValue="ISET Tozeur" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
              <input type="email" defaultValue="contact@iset-tozeur.tn" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Paramètres de notification</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Notifications par email</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Notifications push</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );

  // Fonction pour rendre le contenu selon le menu actif
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'students': return renderStudents();
      case 'teachers': return renderTeachers();
      case 'departments': return renderDepartments();
      case 'subjects': return renderSubjects();
      case 'rooms': return renderRooms();
      case 'schedules': return renderSchedules();
      case 'reports': return renderReports();
      case 'notifications': return renderNotifications();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          {sidebarOpen && <h1 className="text-xl font-bold">ISET Tozeur</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-blue-700 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.id
                  ? 'bg-blue-700 shadow-lg'
                  : 'hover:bg-blue-800'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              HH
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-blue-300">Haithem Hafsi</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {menuItems.find(item => item.id === activeMenu)?.label || 'Tableau de bord'}
              </h2>
              <p className="text-sm text-gray-500">Bienvenue sur votre plateforme de gestion</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Exporter rapport
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;