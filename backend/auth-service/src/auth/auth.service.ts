import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Utilisateur } from '../utilisateur/utilisateur.entity/utilisateur.entity';

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 12);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly usersRepo: Repository<Utilisateur>,
    private readonly jwt: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  private async hash(s: string) {
    return bcrypt.hash(s, BCRYPT_ROUNDS);
  }

  private async compare(s: string, h: string) {
    return bcrypt.compare(s, h);
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    const ok = await this.compare(password, user.mdp_hash);
    if (!ok) throw new UnauthorizedException('Mot de passe incorrect');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
    };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, user: payload };
  }

  async createUserByAdmin(data: {
    nom: string;
    prenom: string;
    email: string;
    cin: string;
    role: string;
  }) {
    const { nom, prenom, email, cin, role } = data;
    const existing = await this.usersRepo.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Utilisateur déjà existant');
    }

    const mdpHash = await this.hash(cin);
    const user = this.usersRepo.create({
      nom,
      prenom,
      email,
      cin,
      mdp_hash: mdpHash,
      role,
      doit_changer_mdp: false,
      emailConfirmed: true,
    });
    await this.usersRepo.save(user);

    console.log(`✅ Utilisateur ${email} créé via admin-service`);
    return { message: 'Utilisateur créé avec succès' };
  }
}
