import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmploiDuTemps } from './entities/emploi-du-temps.entity';
import { CreateEmploiDto } from './dto/create-emploi.dto';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class EmploiDuTempsService {
  constructor(
    @InjectRepository(EmploiDuTemps)
    private readonly emploiRepo: Repository<EmploiDuTemps>,
    private readonly adminService: AdminService,
  ) {}

  async create(dto: CreateEmploiDto): Promise<EmploiDuTemps> {
    const { classeId, enseignantId, salleId, matiereId, date, heureDebut, heureFin, semestre } = dto;

    if (![1, 2].includes(semestre)) {
      throw new BadRequestException('Le semestre doit être 1 ou 2.');
    }

    await this.adminService.getEnseignant(enseignantId);
    await this.adminService.getSalle(salleId);
    await this.adminService.getClasse(classeId);
    if (matiereId) await this.adminService.getMatiere(matiereId);

    // Vérifier les conflits pour la salle
    const salleConflict = await this.emploiRepo.createQueryBuilder('emploi')
      .where('emploi.date = :date', { date })
      .andWhere('emploi.semestre = :semestre', { semestre })
      .andWhere('emploi.salleId = :salleId', { salleId })
      .andWhere('emploi.heureDebut < :heureFin AND emploi.heureFin > :heureDebut', {
        heureDebut, heureFin,
      })
      .getOne();

    // Vérifier les conflits pour l'enseignant
    const enseignantConflict = await this.emploiRepo.createQueryBuilder('emploi')
      .where('emploi.date = :date', { date })
      .andWhere('emploi.semestre = :semestre', { semestre })
      .andWhere('emploi.enseignantId = :enseignantId', { enseignantId })
      .andWhere('emploi.heureDebut < :heureFin AND emploi.heureFin > :heureDebut', {
        heureDebut, heureFin,
      })
      .getOne();

    // Vérifier les conflits pour la classe
    const classeConflict = await this.emploiRepo.createQueryBuilder('emploi')
      .where('emploi.date = :date', { date })
      .andWhere('emploi.semestre = :semestre', { semestre })
      .andWhere('emploi.classeId = :classeId', { classeId })
      .andWhere('emploi.heureDebut < :heureFin AND emploi.heureFin > :heureDebut', {
        heureDebut, heureFin,
      })
      .getOne();

    if (salleConflict || enseignantConflict || classeConflict) {
      let conflictParts: string[] = [];
      let timeInfo = '';

      if (salleConflict) {
        const salle = await this.adminService.getSalle(salleId);
        conflictParts.push(`la salle '${salle.nom}'`);
        timeInfo = `de ${salleConflict.heureDebut.slice(0, 5)} à ${salleConflict.heureFin.slice(0, 5)}`;
      }

      if (enseignantConflict) {
        const enseignant = await this.adminService.getEnseignant(enseignantId);
        conflictParts.push(`l'enseignant '${enseignant.nom} ${enseignant.prenom}'`);
        if (!timeInfo) {
          timeInfo = `de ${enseignantConflict.heureDebut.slice(0, 5)} à ${enseignantConflict.heureFin.slice(0, 5)}`;
        }
      }

      if (classeConflict) {
        const classe = await this.adminService.getClasse(classeId);
        conflictParts.push(`la classe '${classe.nom}'`);
        if (!timeInfo) {
          timeInfo = `de ${classeConflict.heureDebut.slice(0, 5)} à ${classeConflict.heureFin.slice(0, 5)}`;
        }
      }

      const conflictType = conflictParts.join(' et ');
      throw new BadRequestException(`Conflit détecté : ${conflictType} est/sont déjà occupé(s) ${timeInfo}.`);
    }

    const emploi = this.emploiRepo.create(dto);
    return this.emploiRepo.save(emploi);
  }

  async getScheduleForClass(classeId: number, semestre: number) {
    await this.adminService.getClasse(classeId);

    const emplois = await this.emploiRepo.find({
      where: { classeId, semestre },
      order: { date: 'ASC', heureDebut: 'ASC' }
    });

    return this.groupByDay(emplois);
  }

  async getScheduleForEnseignant(enseignantId: number, semestre: number) {
    await this.adminService.getEnseignant(enseignantId);

    const emplois = await this.emploiRepo.find({
      where: { enseignantId, semestre },
      order: { date: 'ASC', heureDebut: 'ASC' }
    });

    return this.groupByDay(emplois);
  }

  async getScheduleForSalle(salleId: number, semestre: number) {
    await this.adminService.getSalle(salleId);

    const emplois = await this.emploiRepo.find({
      where: { salleId, semestre },
      order: { date: 'ASC', heureDebut: 'ASC' }
    });

    return this.groupByDay(emplois);
  }

  private async groupByDay(emplois: EmploiDuTemps[]) {
    const grouped = {};
    for (const emploi of emplois) {
      const jour = new Date(emploi.date).toLocaleDateString('fr-FR', { weekday: 'long' });
      const capitalizedJour = jour.charAt(0).toUpperCase() + jour.slice(1);
      if (!grouped[capitalizedJour]) grouped[capitalizedJour] = [];

      const matiere = await this.adminService.getMatiere(emploi.matiereId);
      const enseignant = await this.adminService.getEnseignant(emploi.enseignantId);
      const salle = await this.adminService.getSalle(emploi.salleId);
      const classe = await this.adminService.getClasse(emploi.classeId);

      grouped[capitalizedJour].push({
        id: emploi.id,
        matiereId: emploi.matiereId,
        enseignantId: emploi.enseignantId,
        salleId: emploi.salleId,
        classeId: emploi.classeId,
        heureDebut: emploi.heureDebut.slice(0, 5),
        heureFin: emploi.heureFin.slice(0, 5),
        matiere: matiere.nom,
        enseignant: `${enseignant.nom} ${enseignant.prenom}`,
        salle: salle.nom,
        classe: classe.nom
      });
    }
    return grouped;
  }
}