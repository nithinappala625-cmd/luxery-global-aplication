import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AviationService, AviationInquiryDto } from './aviation.service';

@ApiTags('Aviation - Aircraft Sales & Charters')
@Controller('aviation')
export class AviationController {
  constructor(private readonly aviationService: AviationService) {}

  @Get()
  @ApiOperation({ summary: 'List aircraft listings (optional filter by type: SALE or CHARTER)' })
  async getAircraft(@Query('type') type?: string) {
    return this.aviationService.findAll(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get aircraft specifications and PPI compliance details' })
  async getAircraftById(@Param('id') id: string) {
    return this.aviationService.findOne(id);
  }

  @Post('inquire')
  @ApiOperation({ summary: 'Transmit charter flight or acquisition inquiry' })
  async submitInquiry(@Body() dto: AviationInquiryDto) {
    return this.aviationService.submitInquiry(dto);
  }
}
