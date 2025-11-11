import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { Classe } from '../classe/entities/classe.entity';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';

@Injectable()
export class EtudiantService {
  constructor(
    @InjectRepository(Etudiant)
    private etudiantRepo: Repository<Etudiant>,
    @InjectRepository(Classe)
    private classeRepo: Repository<Classe>,
  ) {}

  async create(dto: CreateEtudiantDto) {
    const classe = await this.classeRepo.findOne({
      where: { id: dto.classeId },
    });
    if (!classe) throw new NotFoundException('Classe non trouvée');

    const etu = this.etudiantRepo.create({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      cin: dto.cin,
      classe,
    });
    return this.etudiantRepo.save(etu);
  }

  async findAll() {
    return this.etudiantRepo.find({ relations: ['classe'] });
  }

  async findOne(id: number) {
    const etudiant = await this.etudiantRepo.findOne({
      where: { id },
      relations: ['classe'],
    });
    if (!etudiant) throw new NotFoundException('Étudiant non trouvé');
    return etudiant;
  }

  async update(id: number, dto: CreateEtudiantDto) {
    const etudiant = await this.findOne(id);
    
    if (dto.classeId) {
      const classe = await this.classeRepo.findOne({
        where: { id: dto.classeId },
      });
      if (!classe) throw new NotFoundException('Classe non trouvée');
      etudiant.classe = classe;
    }

    etudiant.nom = dto.nom;
    etudiant.prenom = dto.prenom;
    etudiant.email = dto.email;
    etudiant.cin = dto.cin;

    return this.etudiantRepo.save(etudiant);
  }

  async remove(id: number) {
    const etudiant = await this.findOne(id);
    await this.etudiantRepo.remove(etudiant);
    return { message: 'Étudiant supprimé avec succès' };
  }
}
