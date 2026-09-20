import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FoundingSellersService, ApplyFoundingSellerDto } from './founding-sellers.service';

@ApiTags('Founding Sellers - First 50 Global Program')
@Controller('founding-sellers')
export class FoundingSellersController {
  constructor(private readonly foundingSellersService: FoundingSellersService) {}

  @Get('campaign')
  @ApiOperation({ summary: 'Get First 50 Founding Sellers campaign status and slots' })
  async getCampaign() {
    return this.foundingSellersService.getCampaign();
  }

  @Post('apply')
  @ApiOperation({ summary: 'Submit application for Founding Seller status' })
  async apply(@Body() dto: ApplyFoundingSellerDto) {
    return this.foundingSellersService.apply(dto);
  }
}
