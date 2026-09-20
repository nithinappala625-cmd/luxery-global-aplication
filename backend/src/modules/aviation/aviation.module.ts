import { Module } from '@nestjs/common';
import { AviationController } from './aviation.controller';
import { AviationService } from './aviation.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [AviationController],
  providers: [AviationService],
  exports: [AviationService],
})
export class AviationModule {}
