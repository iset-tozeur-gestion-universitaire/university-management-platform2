// Re-export des services admin pour compatibilité
import { 
  enseignantService, 
  salleService,
  etudiantService,
  classeService,
  departementService,
  specialiteService,
  niveauService,
  matiereService
} from './adminServices';

const adminService = {
  // Enseignants
  getEnseignants: async () => {
    const result = await enseignantService.getAll();
    return result.success ? result.data : [];
  },
  
  getEnseignant: async (id) => {
    const result = await enseignantService.getById(id);
    return result.success ? result.data : null;
  },
  
  createEnseignant: async (data) => {
    return await enseignantService.create(data);
  },
  
  updateEnseignant: async (id, data) => {
    return await enseignantService.update(id, data);
  },
  
  deleteEnseignant: async (id) => {
    return await enseignantService.delete(id);
  },
  
  // Salles
  getSalles: async () => {
    return await salleService.getAll();
  },
  
  getSalle: async (id) => {
    return await salleService.getById(id);
  },
  
  createSalle: async (data) => {
    return await salleService.create(data);
  },
  
  updateSalle: async (id, data) => {
    return await salleService.update(id, data);
  },
  
  deleteSalle: async (id) => {
    return await salleService.delete(id);
  },
  
  // Étudiants
  getEtudiants: async () => {
    const result = await etudiantService.getAll();
    return result.success ? result.data : [];
  },
  
  getEtudiant: async (id) => {
    const result = await etudiantService.getById(id);
    return result.success ? result.data : null;
  },
  
  // Classes
  getClasses: async () => {
    return await classeService.getAll();
  },
  
  getClasse: async (id) => {
    return await classeService.getById(id);
  },
  
  // Départements
  getDepartements: async () => {
    return await departementService.getAll();
  },
  
  getDepartement: async (id) => {
    return await departementService.getById(id);
  },
  
  // Spécialités
  getSpecialites: async () => {
    return await specialiteService.getAll();
  },
  
  getSpecialite: async (id) => {
    return await specialiteService.getById(id);
  },
  
  // Niveaux
  getNiveaux: async () => {
    return await niveauService.getAll();
  },
  
  getNiveau: async (id) => {
    return await niveauService.getById(id);
  },
  
  // Matières
  getMatieres: async () => {
    return await matiereService.getAll();
  },
  
  getMatiere: async (id) => {
    return await matiereService.getById(id);
  }
};

export default adminService;
