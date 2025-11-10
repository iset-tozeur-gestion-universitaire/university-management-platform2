import { adminApi } from "../config/api";

// ==================== DÉPARTEMENTS ====================
export const departementService = {
  getAll: async () => {
    try {
      const response = await adminApi.get("/departement");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erreur départements:", error);
      return { success: false, message: error.response?.data?.message || "Erreur de récupération" };
    }
  },

  getById: async (id) => {
    try {
      const response = await adminApi.get(`/departement/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Département non trouvé" };
    }
  },

  create: async (data) => {
    try {
      const response = await adminApi.post("/departement", data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de création" };
    }
  },

  update: async (id, data) => {
    try {
      const response = await adminApi.patch(`/departement/${id}`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de mise à jour" };
    }
  },

  delete: async (id) => {
    try {
      await adminApi.delete(`/departement/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de suppression" };
    }
  }
};

// ==================== CLASSES ====================
export const classeService = {
  getAll: async () => {
    try {
      const response = await adminApi.get("/classe");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de récupération" };
    }
  },

  getById: async (id) => {
    try {
      const response = await adminApi.get(`/classe/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Classe non trouvée" };
    }
  },

  create: async (data) => {
    try {
      const response = await adminApi.post("/classe", data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de création" };
    }
  },

  update: async (id, data) => {
    try {
      const response = await adminApi.patch(`/classe/${id}`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de mise à jour" };
    }
  },

  delete: async (id) => {
    try {
      await adminApi.delete(`/classe/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de suppression" };
    }
  }
};

// ==================== ENSEIGNANTS ====================
export const enseignantService = {
  getAll: async () => {
    try {
      const response = await adminApi.get("/enseignant");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de récupération" };
    }
  },

  getById: async (id) => {
    try {
      const response = await adminApi.get(`/enseignant/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Enseignant non trouvé" };
    }
  },

  create: async (data) => {
    try {
      const response = await adminApi.post("/enseignant", data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de création" };
    }
  },

  delete: async (id) => {
    try {
      await adminApi.delete(`/enseignant/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de suppression" };
    }
  }
};

// ==================== ÉTUDIANTS ====================
export const etudiantService = {
  getAll: async () => {
    try {
      const response = await adminApi.get("/etudiants");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de récupération" };
    }
  },

  create: async (data) => {
    try {
      const response = await adminApi.post("/etudiants", data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de création" };
    }
  }
};

// ==================== SPÉCIALITÉS ====================
export const specialiteService = {
  getAll: async () => {
    try {
      const response = await adminApi.get("/specialite");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de récupération" };
    }
  },

  getById: async (id) => {
    try {
      const response = await adminApi.get(`/specialite/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Spécialité non trouvée" };
    }
  },

  create: async (data) => {
    try {
      const response = await adminApi.post("/specialite", data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de création" };
    }
  },

  update: async (id, data) => {
    try {
      const response = await adminApi.patch(`/specialite/${id}`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de mise à jour" };
    }
  },

  delete: async (id) => {
    try {
      await adminApi.delete(`/specialite/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de suppression" };
    }
  }
};

// ==================== NIVEAUX ====================
export const niveauService = {
  getAll: async () => {
    try {
      const response = await adminApi.get("/niveau");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de récupération" };
    }
  },

  getById: async (id) => {
    try {
      const response = await adminApi.get(`/niveau/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Niveau non trouvé" };
    }
  },

  create: async (data) => {
    try {
      const response = await adminApi.post("/niveau", data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de création" };
    }
  },

  update: async (id, data) => {
    try {
      const response = await adminApi.patch(`/niveau/${id}`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de mise à jour" };
    }
  },

  delete: async (id) => {
    try {
      await adminApi.delete(`/niveau/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de suppression" };
    }
  }
};

// ==================== STATISTIQUES ====================
export const statsService = {
  // Stats pour le dashboard directeur
  getDirectorStats: async () => {
    try {
      // En attendant l'endpoint stats, on récupère les données de base
      const [depts, enseignants, etudiants, classes] = await Promise.all([
        departementService.getAll(),
        enseignantService.getAll(),
        etudiantService.getAll(),
        classeService.getAll()
      ]);

      return {
        success: true,
        data: {
          totalDepartements: depts.data?.length || 0,
          totalEnseignants: enseignants.data?.length || 0,
          totalEtudiants: etudiants.data?.length || 0,
          totalClasses: classes.data?.length || 0
        }
      };
    } catch (error) {
      return { success: false, message: "Erreur lors du chargement des statistiques" };
    }
  }
};
