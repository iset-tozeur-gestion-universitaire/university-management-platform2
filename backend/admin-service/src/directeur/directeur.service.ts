import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enseignant } from '../enseignant/enseignant.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Classe } from '../classe/entities/classe.entity';

@Injectable()
export class DirecteurService {
  constructor(
    @InjectRepository(Enseignant)
    private enseignantRepo: Repository<Enseignant>,
    @InjectRepository(Etudiant)
    private etudiantRepo: Repository<Etudiant>,
    @InjectRepository(Classe)
    private classeRepo: Repository<Classe>,
  ) {}

  async getDirectorStats(user: any) {
    try {
      console.log('📊 [DirecteurService] Calcul des stats pour:', user);
      
      // Récupérer le département du directeur
      const departementId = user.departement?.id || user.departementId;
      console.log('🏢 [DirecteurService] Département ID:', departementId);

      if (!departementId) {
        console.log('⚠️ [DirecteurService] Pas de département - Stats globales');
        // Si pas de département, retourner les stats globales
        const [totalEnseignants, totalEtudiants, totalClasses] =
          await Promise.all([
            this.enseignantRepo.count(),
            this.etudiantRepo.count(),
            this.classeRepo.count(),
          ]);

        const result = {
          enseignants: totalEnseignants,
          etudiants: totalEtudiants,
          classes: totalClasses,
          tauxReussite: 0, // Pas de calcul sans département spécifique
        };
        console.log('✅ [DirecteurService] Stats globales:', result);
        return result;
      }

      // Compter les enseignants du département
      console.log('🔍 [DirecteurService] Comptage des enseignants...');
      const totalEnseignants = await this.enseignantRepo
        .createQueryBuilder('enseignant')
        .leftJoin('enseignant.departement', 'departement')
        .where('departement.id = :departementId', { departementId })
        .getCount();
      console.log('👨‍🏫 [DirecteurService] Enseignants trouvés:', totalEnseignants);

      // Récupérer les classes du département via les relations niveau et specialite
      console.log('🔍 [DirecteurService] Récupération des classes...');
      const classesOfDepartment = await this.classeRepo
        .createQueryBuilder('classe')
        .leftJoin('classe.niveau', 'niveau')
        .leftJoin('classe.specialite', 'specialite')
        .leftJoin('specialite.departement', 'departement')
        .where('departement.id = :departementId', { departementId })
        .select(['classe.id'])
        .getMany();
      console.log('📚 [DirecteurService] Classes trouvées:', classesOfDepartment.length);

      const classeIds = classesOfDepartment.map((c) => c.id);

      let totalEtudiants = 0;
      if (classeIds.length > 0) {
        console.log('🔍 [DirecteurService] Comptage des étudiants...');
        totalEtudiants = await this.etudiantRepo
          .createQueryBuilder('etudiant')
          .leftJoin('etudiant.classe', 'classe')
          .where('classe.id IN (:...classeIds)', { classeIds })
          .getCount();
        console.log('👥 [DirecteurService] Étudiants trouvés:', totalEtudiants);
      }

      // Calculer le taux de réussite moyen (exemple simplifié)
      // TODO: Adapter selon votre logique métier (notes, examens, etc.)
      const tauxReussite = await this.calculateSuccessRate(classeIds);

      const result = {
        enseignants: totalEnseignants,
        etudiants: totalEtudiants,
        classes: classesOfDepartment.length,
        tauxReussite,
      };
      console.log('✅ [DirecteurService] Stats finales:', result);
      return result;
    } catch (error) {
      console.error('❌ [DirecteurService] Erreur lors du calcul des stats:', error);
      throw error;
    }
  }

  private async calculateSuccessRate(classeIds: number[]): Promise<number> {
    // Logique simplifiée : retourner un taux estimé
    // TODO: Implémenter le calcul réel basé sur les notes/examens
    if (classeIds.length === 0) return 0;

    // Pour l'instant, retourner un taux fictif entre 75% et 90%
    return Math.floor(75 + Math.random() * 15);
  }
}
