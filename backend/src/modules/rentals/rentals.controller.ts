import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RentalsService, RentalBookingDto } from './rentals.service';

@ApiTags('Rentals - NP Luxe Drive')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'List all available luxury rental vehicles' })
  async getFleet() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rental vehicle details by ID' })
  async getVehicle(@Param('id') id: string) {
    return this.rentalsService.findOne(id);
  }

  @Post('book')
  @ApiOperation({ summary: 'Reserve an exotic fleet vehicle with escrow deposit' })
  async bookVehicle(@Body() dto: RentalBookingDto) {
    return this.rentalsService.book(dto);
  }
}
