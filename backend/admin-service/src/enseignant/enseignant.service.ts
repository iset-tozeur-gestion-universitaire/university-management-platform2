// src/enseignant/enseignant.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Enseignant } from './enseignant.entity';
import { Departement } from '../departement/entities/departement.entity';
import { Specialite } from '../specialite/entities/specialite.entity';
import { Classe } from '../classe/entities/classe.entity';
import { CreateEnseignantDto } from './dto/create-enseignant.dto';

@Injectable()
export class EnseignantService {
  constructor(
    @InjectRepository(Enseignant)
    private enseignantRepo: Repository<Enseignant>,
    @InjectRepository(Departement)
    private depRepo: Repository<Departement>,
    @InjectRepository(Specialite)
    private specRepo: Repository<Specialite>,
    @InjectRepository(Classe)
    private classeRepo: Repository<Classe>,
  ) {}

  async create(dto: CreateEnseignantDto) {
    const departement = await this.depRepo.findOneBy({ id: dto.departementId });
    if (!departement) throw new NotFoundException('Département introuvable');

    const specialites = await this.specRepo.find({
      where: { id: In(dto.specialiteIds) },
    });

    const classes = await this.classeRepo.find({
      where: { id: In(dto.classeIds) },
    });

    const enseignant = this.enseignantRepo.create({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      grade: dto.grade,
      departement,
      specialites,
      classes,
    });

    return this.enseignantRepo.save(enseignant);
  }

  findAll() {
    return this.enseignantRepo.find({
      relations: ['departement', 'specialites', 'classes'],
    });
  }

  async findOne(id: number) {
    const enseignant = await this.enseignantRepo.findOne({
      where: { id },
      relations: ['departement', 'specialites', 'classes'],
    });
    if (!enseignant) throw new NotFoundException('Enseignant non trouvé');
    return enseignant;
  }

  async update(id: number, dto: CreateEnseignantDto) {
    const enseignant = await this.findOne(id);

    if (dto.departementId) {
      const departement = await this.depRepo.findOneBy({ id: dto.departementId });
      if (!departement) throw new NotFoundException('Département introuvable');
      enseignant.departement = departement;
    }

    if (dto.specialiteIds && dto.specialiteIds.length > 0) {
      const specialites = await this.specRepo.find({
        where: { id: In(dto.specialiteIds) },
      });
      enseignant.specialites = specialites;
    }

    if (dto.classeIds && dto.classeIds.length > 0) {
      const classes = await this.classeRepo.find({
        where: { id: In(dto.classeIds) },
      });
      enseignant.classes = classes;
    }

    enseignant.nom = dto.nom;
    enseignant.prenom = dto.prenom;
    enseignant.email = dto.email;
    enseignant.grade = dto.grade;

    return this.enseignantRepo.save(enseignant);
  }

  async remove(id: number) {
    const enseignant = await this.findOne(id);
    await this.enseignantRepo.remove(enseignant);
    return { message: 'Enseignant supprimé avec succès' };
  }
}
