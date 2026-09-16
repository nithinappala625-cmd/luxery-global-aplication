import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@ApiTags('Payments (Razorpay & PayPal)')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  @ApiOperation({ summary: 'Initiate payment order with selected gateway' })
  async createPaymentOrder(@Body() dto: CreatePaymentDto) {
    const defaultUserId = '00000000-0000-0000-0000-000000000001';
    return this.paymentsService.createPaymentOrder(defaultUserId, dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify payment authorization from gateway' })
  async verifyPayment(@Body() dto: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(dto);
  }
}
