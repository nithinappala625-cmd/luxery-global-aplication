import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { RazorpayProvider } from './providers/razorpay.provider';
import { PayPalProvider } from './providers/paypal.provider';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, RazorpayProvider, PayPalProvider],
  exports: [PaymentsService],
})
export class PaymentsModule {}
