import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserAdminDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt.guard';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ResendConfirmationDto } from './dto/resend-confirmation.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

  @Post('confirm-email')
  confirmEmail(@Body() dto: ConfirmEmailDto) {
    return this.auth.confirmEmail(dto.email, dto.token);
  }

  @Post('resend-confirmation')
  resendConfirmation(@Body() dto: ResendConfirmationDto) {
    return this.auth.resendConfirmation(dto.email);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.email, dto.token, dto.newPassword);
  }

  // Exemple de route protégée
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me() {
    return { ok: true };
  }
}
