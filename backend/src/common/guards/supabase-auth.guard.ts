import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../modules/supabase/supabase.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Validate token with Supabase Client
      const user = await this.supabaseService.getUserFromToken(token);
      if (!user) {
        throw new UnauthorizedException('Invalid or expired authentication session');
      }

      // Fetch user profile to attach role
      const profile = await this.supabaseService.getProfile(user.id);
      request.user = {
        id: user.id,
        email: user.email,
        role: profile?.role || 'buyer',
        isVerified: profile?.is_verified ?? false,
      };

      return true;
    } catch (err: any) {
      this.logger.warn(`Auth guard validation failed: ${err.message}`);
      throw new UnauthorizedException(err.message || 'Unauthorized authentication token');
    }
  }
}
