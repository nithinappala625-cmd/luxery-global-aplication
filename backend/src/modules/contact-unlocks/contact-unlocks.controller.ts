import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactUnlocksService } from './contact-unlocks.service';
import { SupportedProvider } from '../payments/dto/create-payment.dto';

@ApiTags('Contact Unlocks')
@Controller('contact-unlocks')
export class ContactUnlocksController {
  constructor(private readonly contactUnlocksService: ContactUnlocksService) {}

  @Post('request')
  @ApiOperation({ summary: 'Request seller contact unlock and initiate payment order' })
  async requestUnlock(
    @Body('listingId') listingId: string,
    @Body('provider') provider: SupportedProvider = SupportedProvider.RAZORPAY,
  ) {
    const defaultBuyerId = '00000000-0000-0000-0000-000000000099';
    return this.contactUnlocksService.requestContactUnlock(defaultBuyerId, listingId, provider);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Confirm payment and receive permitted custodian contact details' })
  async confirmUnlock(
    @Body('listingId') listingId: string,
    @Body('paymentId') paymentId: string,
  ) {
    const defaultBuyerId = '00000000-0000-0000-0000-000000000099';
    return this.contactUnlocksService.confirmUnlockPayment(defaultBuyerId, listingId, paymentId);
  }
}
