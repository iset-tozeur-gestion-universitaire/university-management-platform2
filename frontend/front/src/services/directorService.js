import axios from 'axios';

const API_URL = 'http://localhost:3002/directeur';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'x-user-email': user?.email || '',
    'x-user-role': user?.role || '',
  };

  // Ajouter le département si disponible
  if (user?.departement?.id) {
    headers['x-user-departement'] = user.departement.id.toString();
  }

  return headers;
};

export const directorService = {
  // Récupérer les statistiques du directeur
  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
      throw error;
    }
  }
};
