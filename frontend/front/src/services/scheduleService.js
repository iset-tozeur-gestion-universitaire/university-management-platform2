import axios from 'axios';

const EMPLOI_API_URL = process.env.REACT_APP_EMPLOI_API_URL || 'http://localhost:3010';

// Configuration axios pour le service emploi du temps
const emploiAPI = axios.create({
  baseURL: EMPLOI_API_URL,
  timeout: 10000,
});

// Intercepteur pour ajouter le token d'authentification
emploiAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les réponses d'erreur
emploiAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const scheduleService = {
  // Récupérer toutes les classes
  async getClasses() {
    try {
      const response = await emploiAPI.get('/admin/classes');
      return response.data;
    } catch (error) {
      console.warn('🔄 Service backend indisponible, utilisation des données mock:', error.message);
      return {
        success: true,
        data: [
          { id: 1, nom: "L1 Informatique", niveau: "L1", specialite: "Informatique" },
          { id: 2, nom: "L2 Informatique", niveau: "L2", specialite: "Informatique" },
          { id: 3, nom: "L3 Informatique", niveau: "L3", specialite: "Informatique" },
          { id: 4, nom: "Master GL", niveau: "Master", specialite: "Génie Logiciel" }
        ]
      };
    }
  },

  // Récupérer tous les enseignants
  async getTeachers() {
    try {
      const response = await emploiAPI.get('/admin/teachers');
      return response.data;
    } catch (error) {
      console.warn('🔄 Service backend indisponible, utilisation des données mock:', error.message);
      return {
        success: true,
        data: [
          { id: 1, nom: "Martin", prenom: "Jean", email: "j.martin@univ.tn", specialites: ["Mathématiques"] },
          { id: 2, nom: "Dubois", prenom: "Marie", email: "m.dubois@univ.tn", specialites: ["Algorithmique", "Structures de données"] },
          { id: 3, nom: "Garcia", prenom: "Carlos", email: "c.garcia@univ.tn", specialites: ["Base de données"] },
          { id: 4, nom: "Chen", prenom: "Li", email: "l.chen@univ.tn", specialites: ["Réseaux"] },
          { id: 5, nom: "Ahmed", prenom: "Fatima", email: "f.ahmed@univ.tn", specialites: ["Programmation Web"] }
        ]
      };
    }
  },

  // Récupérer toutes les matières
  async getSubjects() {
    try {
      const response = await emploiAPI.get('/admin/subjects');
      return response.data;
    } catch (error) {
      console.warn('🔄 Service backend indisponible, utilisation des données mock:', error.message);
      return {
        success: true,
        data: [
          { id: 1, nom: "Mathématiques", code: "MATH101", couleur: "#FF6B6B" },
          { id: 2, nom: "Algorithmique", code: "ALGO101", couleur: "#4ECDC4" },
          { id: 3, nom: "Base de données", code: "BDD101", couleur: "#45B7D1" },
          { id: 4, nom: "Réseaux", code: "NET101", couleur: "#96CEB4" },
          { id: 5, nom: "Programmation Web", code: "WEB101", couleur: "#FFEAA7" },
          { id: 6, nom: "Systèmes", code: "SYS101", couleur: "#DDA0DD" },
          { id: 7, nom: "POO", code: "POO201", couleur: "#98D8C8" },
          { id: 8, nom: "IA", code: "IA301", couleur: "#F7DC6F" }
        ]
      };
    }
  },

  // Récupérer toutes les salles
  async getRooms() {
    try {
      const response = await emploiAPI.get('/admin/rooms');
      return response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des salles:', error);
      throw error;
    }
  },

  // Sauvegarder un emploi du temps
  async saveSchedule(scheduleData) {
    try {
      const response = await emploiAPI.post('/emploi-du-temps', {
        classId: scheduleData.classId,
        courses: scheduleData.courses,
        semester: scheduleData.semester || '2024-2025',
        validated: false
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  },

  // Récupérer l'emploi du temps d'une classe
  async getScheduleByClass(classId) {
    try {
      const response = await emploiAPI.get(`/emploi-du-temps/class/${classId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du chargement de l\'emploi du temps:', error);
      throw error;
    }
  },

  // Valider un emploi du temps
  async validateSchedule(scheduleId) {
    try {
      const response = await emploiAPI.patch(`/emploi-du-temps/${scheduleId}/validate`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      throw error;
    }
  },

  // Vérifier les conflits d'emploi du temps
  async checkConflicts(courses) {
    try {
      const response = await emploiAPI.post('/emploi-du-temps/check-conflicts', {
        courses
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification des conflits:', error);
      throw error;
    }
  },

  // Récupérer tous les emplois du temps
  async getAllSchedules() {
    try {
      const response = await emploiAPI.get('/emploi-du-temps');
      return response.data;
    } catch (error) {
      console.warn('🔄 Service backend indisponible, utilisation des données mock:', error.message);
      return {
        success: true,
        data: [
          {
            id: 1,
            title: "Emploi L1 Info - Semestre 1",
            classe: "L1 Informatique",
            semester: "S1",
            year: "2024-2025",
            status: "validated",
            createdAt: "2024-01-15",
            createdBy: "Dr. Ahmed Directeur",
            scheduleData: {
              "lundi-08:00": { subject: "Mathématiques", teacher: "Prof. Martin", room: "A101" },
              "lundi-10:00": { subject: "Algorithmique", teacher: "Dr. Dubois", room: "B205" },
              "mardi-08:00": { subject: "Base de données", teacher: "Prof. Garcia", room: "C301" },
              "mardi-14:00": { subject: "Réseaux", teacher: "Dr. Chen", room: "D102" },
              "mercredi-10:00": { subject: "Programmation Web", teacher: "Prof. Ahmed", room: "B203" },
              "jeudi-08:00": { subject: "Systèmes", teacher: "Dr. Kumar", room: "A205" },
              "vendredi-14:00": { subject: "Projet", teacher: "Prof. Martin", room: "Lab1" }
            }
          },
          {
            id: 2,
            title: "Emploi L2 Info - Semestre 1",
            classe: "L2 Informatique",
            semester: "S1", 
            year: "2024-2025",
            status: "draft",
            createdAt: "2024-01-20",
            createdBy: "Dr. Ahmed Directeur",
            scheduleData: {
              "lundi-08:00": { subject: "Structures de données", teacher: "Dr. Dubois", room: "A102" },
              "lundi-14:00": { subject: "POO", teacher: "Prof. Smith", room: "B201" },
              "mardi-10:00": { subject: "Compilation", teacher: "Dr. Wang", room: "C302" },
              "mercredi-08:00": { subject: "IA", teacher: "Prof. Johnson", room: "D201" },
              "jeudi-14:00": { subject: "Interface Homme-Machine", teacher: "Dr. Lee", room: "B204" }
            }
          }
        ]
      };
    }
  },

  // Supprimer un emploi du temps
  async deleteSchedule(scheduleId) {
    try {
      const response = await emploiAPI.delete(`/emploi-du-temps/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  },

  // Dupliquer un emploi du temps
  async duplicateSchedule(scheduleId, newClassId) {
    try {
      const response = await emploiAPI.post(`/emploi-du-temps/${scheduleId}/duplicate`, {
        newClassId
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la duplication:', error);
      throw error;
    }
  }
};

export default scheduleService;