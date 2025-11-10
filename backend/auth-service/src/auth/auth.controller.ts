import { Controller, Post, Body, Headers, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserAdminDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post('admin/create-user')
  async createUserByAdmin(
    @Body() dto: CreateUserAdminDto,
    @Headers('x-api-key') apiKey: string,
  ) {
    const expectedKey = process.env.AUTH_API_KEY || 'secret_key_test';
    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Clé API invalide');
    }
    return this.auth.createUserByAdmin({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      cin: dto.cin,
      role: dto.role || 'etudiant',
    });
  }
}
