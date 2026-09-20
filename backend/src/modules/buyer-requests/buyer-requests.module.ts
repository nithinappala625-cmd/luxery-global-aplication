import { Module } from '@nestjs/common';
import { BuyerRequestsController } from './buyer-requests.controller';
import { BuyerRequestsService } from './buyer-requests.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [BuyerRequestsController],
  providers: [BuyerRequestsService],
  exports: [BuyerRequestsService],
})
export class BuyerRequestsModule {}
