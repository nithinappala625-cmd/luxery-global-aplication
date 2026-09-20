import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BuyerRequestsService, CreateBuyerRequestDto } from './buyer-requests.service';

@ApiTags('Buyer Requests - Private Sourcing')
@Controller('buyer-requests')
export class BuyerRequestsController {
  constructor(private readonly buyerRequestsService: BuyerRequestsService) {}

  @Get()
  @ApiOperation({ summary: 'List all active sourcing requests from verified collectors' })
  async getRequests() {
    return this.buyerRequestsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Submit confidential asset sourcing request' })
  async createRequest(@Body() dto: CreateBuyerRequestDto) {
    return this.buyerRequestsService.create(dto);
  }
}
