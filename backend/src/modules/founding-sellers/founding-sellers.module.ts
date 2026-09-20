import { Module } from '@nestjs/common';
import { FoundingSellersController } from './founding-sellers.controller';
import { FoundingSellersService } from './founding-sellers.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [FoundingSellersController],
  providers: [FoundingSellersService],
  exports: [FoundingSellersService],
})
export class FoundingSellersModule {}
