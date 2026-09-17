import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { SellersService, RegisterSellerDto } from './sellers.service';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get()
  async getAllSellers() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  async getSellerById(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Post('register')
  async registerSeller(@Body() dto: RegisterSellerDto) {
    return this.sellersService.register(dto);
  }

  @Put(':id/verification')
  async updateVerification(
    @Param('id') id: string,
    @Body() body: { status: string; level: string },
  ) {
    return this.sellersService.updateVerification(id, body.status, body.level);
  }
}
