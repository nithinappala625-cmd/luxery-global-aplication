import { Module } from '@nestjs/common';
import { ContactUnlocksController } from './contact-unlocks.controller';
import { ContactUnlocksService } from './contact-unlocks.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [PaymentsModule],
  controllers: [ContactUnlocksController],
  providers: [ContactUnlocksService],
  exports: [ContactUnlocksService],
})
export class ContactUnlocksModule {}
