import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DealsService, SubmitOfferDto, SendDealMessageDto } from './deals.service';

@ApiTags('Deals - Private Deal Room')
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Deal Room details, documents, and negotiation history' })
  async getDealRoom(@Param('id') id: string) {
    return this.dealsService.getDealRoom(id);
  }

  @Post(':id/offer')
  @ApiOperation({ summary: 'Submit formal offer or counter-offer' })
  async submitOffer(@Param('id') id: string, @Body() body: Omit<SubmitOfferDto, 'dealId'>) {
    return this.dealsService.submitOffer({
      dealId: id,
      ...body,
    });
  }

  @Post(':id/message')
  @ApiOperation({ summary: 'Transmit message or document in confidential Deal Room' })
  async sendMessage(@Param('id') id: string, @Body() body: Omit<SendDealMessageDto, 'dealId'>) {
    return this.dealsService.sendMessage({
      dealId: id,
      ...body,
    });
  }
}
