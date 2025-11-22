import axios from 'axios';

const API_URL_ADMIN = 'http://localhost:3002';
const API_URL_AUTH = 'http://localhost:3001/api/auth';

// Obtenir les headers avec l'authentification
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const userService = {
  // Récupérer tous les enseignants (SANS les directeurs)
  getAllEnseignants: async () => {
    try {
      const response = await axios.get(`${API_URL_ADMIN}/enseignant`, {
        headers: getAuthHeaders()
      });
      // Filtrer pour garder uniquement les enseignants (exclure les directeurs)
      return response.data
        .filter(e => !e.role || e.role === 'enseignant')
        .map(e => ({
          email: e.email,
          nom: `${e.prenom} ${e.nom}`,
          role: 'enseignant'
        }));
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants:', error);
      return [];
    }
  },

  // Récupérer tous les étudiants
  getAllEtudiants: async () => {
    try {
      const response = await axios.get(`${API_URL_ADMIN}/etudiants`, {
        headers: getAuthHeaders()
      });
      return response.data.map(e => ({
        email: e.email,
        nom: `${e.prenom} ${e.nom}`,
        role: 'etudiant'
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      return [];
    }
  },

  // Récupérer tous les utilisateurs depuis auth-service (directeurs, admin)
  getAllAuthUsers: async () => {
    try {
      const headers = getAuthHeaders();

      // Fetch directeurs depuis admin-service (table enseignant avec role='directeur_departement')
      const directeursResponse = await axios.get(
        `${API_URL_ADMIN}/enseignant`,
        { headers }
      );

      // Fetch administratifs depuis auth-service (table utilisateur)
      const administratifsResponse = await axios.get(
        `${API_URL_AUTH}/users/administratif`,
        { headers }
      );

      const allEnseignants = directeursResponse.data || [];
      const administratifs = administratifsResponse.data || [];

      // Filtrer uniquement les directeurs de département
      const directeurs = allEnseignants.filter(e => e.role === 'directeur_departement');

      // Transform directeurs to match the format: { email, nom, role }
      const transformedDirecteurs = directeurs.map(user => ({
        email: user.email,
        nom: `${user.prenom} ${user.nom}`.trim(),
        role: 'directeur_departement'
      }));

      // Transform administratifs to match the format: { email, nom, role }
      const transformedAdministratifs = administratifs.map(user => ({
        email: user.email,
        nom: `${user.prenom} ${user.nom}`.trim(),
        role: 'administratif'
      }));

      return [...transformedDirecteurs, ...transformedAdministratifs];
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs auth:', error);
      return [];
    }
  },

  // Récupérer tous les utilisateurs (combiné)
  getAllUsers: async () => {
    try {
      const [enseignants, etudiants, authUsers] = await Promise.all([
        userService.getAllEnseignants(),
        userService.getAllEtudiants(),
        userService.getAllAuthUsers()
      ]);
      
      // Combiner et trier par nom
      const allUsers = [...enseignants, ...etudiants, ...authUsers];
      return allUsers.sort((a, b) => a.nom.localeCompare(b.nom));
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  }
};
