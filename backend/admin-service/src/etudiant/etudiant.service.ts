import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { Classe } from '../classe/entities/classe.entity';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import axios from 'axios';

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

    // Vérifier les doublons avant insertion pour renvoyer une erreur claire (409)
    const existingByEmail = await this.etudiantRepo.findOne({
      where: { email: dto.email },
    });
    if (existingByEmail) {
      throw new ConflictException("L'email existe déjà");
    }
    const existingByCin = await this.etudiantRepo.findOne({
      where: { cin: dto.cin },
    });
    if (existingByCin) {
      throw new ConflictException('Le CIN existe déjà');
    }

    const etu = this.etudiantRepo.create({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      cin: dto.cin,
      classe,
    });
    let saved: Etudiant;
    try {
      saved = await this.etudiantRepo.save(etu);
    } catch (err) {
      // Gérer la contrainte unique venant de la base (race condition éventuelle)
      const pgErr = err as { code?: string };
      if (pgErr.code === '23505') {
        throw new ConflictException('Email ou CIN déjà utilisé');
      }
      throw err;
    }

    // 🔗 Synchroniser avec auth-service
    const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
    const AUTH_API_KEY = process.env.AUTH_API_KEY || null;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (AUTH_API_KEY) headers['x-api-key'] = AUTH_API_KEY;

      await axios.post(
        `${AUTH_URL}/api/auth/admin/create-user`,
        {
          nom: saved.nom,
          prenom: saved.prenom,
          email: saved.email,
          cin: saved.cin,
          role: 'etudiant',
        },
        { headers, timeout: 5000 },
      );

      console.log(`✅ Utilisateur créé dans auth-service : ${saved.email}`);
    } catch (err) {
      const e = err as Error & { response?: unknown };
      console.error(
        `❌ Échec création utilisateur auth-service pour ${saved.email}:`,
        e.message ?? 'Erreur inconnue',
      );
    }

    return saved;
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
