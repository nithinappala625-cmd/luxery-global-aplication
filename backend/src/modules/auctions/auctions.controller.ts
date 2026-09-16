import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuctionsService } from './auctions.service';

@ApiTags('Auctions & Houses')
@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get curated luxury auctions' })
  async getAuctions(@Query('status') status?: string) {
    return this.auctionsService.findAllAuctions(status);
  }

  @Get('houses')
  @ApiOperation({ summary: 'Get accredited auction houses' })
  async getAuctionHouses() {
    return this.auctionsService.findAllAuctionHouses();
  }
}
