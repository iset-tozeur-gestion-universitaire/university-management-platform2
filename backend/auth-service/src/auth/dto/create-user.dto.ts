import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserAdminDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  nom: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  prenom: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'CIN utilisé comme mot de passe initial' })
  @IsString()
  @MinLength(4)
  cin: string;

  @ApiProperty({ required: false, description: "Role de l'utilisateur (defaut: etudiant)" })
  @IsOptional()
  @IsString()
  role?: string;
}
