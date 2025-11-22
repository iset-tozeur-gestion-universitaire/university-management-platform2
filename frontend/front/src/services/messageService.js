import axios from 'axios';

const API_URL = 'http://localhost:3002/messages';

// Obtenir les headers avec l'authentification
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return {};
  
  return {
    'x-user-email': user.email,
    'x-user-role': user.role,
    'Content-Type': 'application/json'
  };
};

export const messageService = {
  // Récupérer tous les messages (reçus et envoyés)
  getAllMessages: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  },

  // Récupérer les messages reçus
  getReceivedMessages: async () => {
    try {
      const response = await axios.get(`${API_URL}/received`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages reçus:', error);
      throw error;
    }
  },

  // Récupérer les messages envoyés
  getSentMessages: async () => {
    try {
      const response = await axios.get(`${API_URL}/sent`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages envoyés:', error);
      throw error;
    }
  },

  // Envoyer un nouveau message
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(API_URL, messageData, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l envoi du message:', error);
      throw error;
    }
  },

  // Marquer un message comme lu
  markAsRead: async (messageId) => {
    try {
      const response = await axios.patch(`${API_URL}/${messageId}/read`, {}, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
      throw error;
    }
  },

  // Obtenir le nombre de messages non lus
  getUnreadCount: async () => {
    try {
      const response = await axios.get(`${API_URL}/unread-count`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de messages non lus:', error);
      throw error;
    }
  },

  // Récupérer un message spécifique
  getMessage: async (messageId) => {
    try {
      const response = await axios.get(`${API_URL}/${messageId}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du message:', error);
      throw error;
    }
  }
};
