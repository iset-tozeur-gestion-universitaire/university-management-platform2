// src/classe/classe.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Niveau } from '../../niveau/entities/niveau.entity';
import { Specialite } from '../../specialite/entities/specialite.entity';
import { Enseignant } from '../../enseignant/enseignant.entity';
@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @ManyToOne(() => Niveau, (niveau) => niveau.classes, {
    onDelete: 'CASCADE',
  })
  niveau: Niveau;

  @ManyToOne(() => Specialite, (specialite) => specialite.classes, {
    onDelete: 'CASCADE',
  })
  specialite: Specialite;

  // 🔹 Relation inverse pour le ManyToMany avec Enseignant
  @ManyToMany(() => Enseignant, (enseignant) => enseignant.classes)
  enseignants: Enseignant[];
}
