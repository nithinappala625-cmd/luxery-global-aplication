import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListingsService } from './listings.service';
import { FilterListingsDto } from './dto/filter-listings.dto';
import { CreateListingDto } from './dto/create-listing.dto';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  @ApiOperation({ summary: 'Discover global luxury listings with multi-attribute filtering' })
  async getListings(@Query() filterDto: FilterListingsDto) {
    return this.listingsService.findFiltered(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get immersive asset details by ID' })
  async getListingById(@Param('id') id: string) {
    return this.listingsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Consign new asset (creates listing in pending_review status)' })
  @ApiResponse({ status: 201, description: 'Listing created awaiting curatorial review' })
  async createListing(@Body() dto: CreateListingDto) {
    const defaultSellerId = '00000000-0000-0000-0000-000000000001';
    return this.listingsService.createListing(defaultSellerId, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update listing status (admin or seller action)' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'verified' | 'rejected' | 'sold' | 'draft',
  ) {
    return this.listingsService.updateStatus(id, status);
  }
}
