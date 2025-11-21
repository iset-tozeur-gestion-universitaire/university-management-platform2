export interface Enseignant {
  id: number;
  nom: string;
  prenom: string;
  email?: string;
}

export interface Matiere {
  id: number;
  nom: string;
  coefficient?: number;
}

export interface Salle {
  id: number;
  nom: string;
  capacite?: number;
}

export interface Classe {
  id: number;
  nom: string;
  niveau?: string;
}
