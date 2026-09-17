import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { AttributesService, CreateAttributeDto } from './attributes.service';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Get()
  async getByCategory(@Query('categoryId') categoryId: string) {
    return this.attributesService.findByCategory(categoryId);
  }

  @Post()
  async createAttribute(@Body() dto: CreateAttributeDto) {
    return this.attributesService.create(dto);
  }

  @Delete(':id')
  async deleteAttribute(@Param('id') id: string) {
    return this.attributesService.delete(id);
  }
}
