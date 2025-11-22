import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirecteurController } from './directeur.controller';
import { DirecteurService } from './directeur.service';
import { Enseignant } from '../enseignant/enseignant.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Classe } from '../classe/entities/classe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enseignant, Etudiant, Classe]),
  ],
  controllers: [DirecteurController],
  providers: [DirecteurService],
  exports: [DirecteurService],
})
export class DirecteurModule {}
