import { Controller, Get, Headers } from '@nestjs/common';
import { DirecteurService } from './directeur.service';

@Controller('directeur')
export class DirecteurController {
  constructor(private readonly directeurService: DirecteurService) {}

  @Get('stats')
  async getDirectorStats(
    @Headers('x-user-email') email: string,
    @Headers('x-user-role') role: string,
    @Headers('x-user-departement') departementId?: string,
  ) {
    console.log('📥 [DirecteurController] Requête reçue');
    console.log('📧 Email:', email);
    console.log('👤 Role:', role);
    console.log('🏢 Département ID:', departementId);
    
    const user = {
      email,
      role,
      departementId: departementId ? parseInt(departementId) : null,
    };
    console.log('👤 [DirecteurController] User object:', user);
    
    const result = await this.directeurService.getDirectorStats(user);
    console.log('✅ [DirecteurController] Résultat:', result);
    return result;
  }
}
