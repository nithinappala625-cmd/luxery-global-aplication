import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin Curatorial Operations')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get high-level marketplace and curatorial stats' })
  async getStats() {
    return this.adminService.getAdminStats();
  }

  @Get('listings/pending')
  @ApiOperation({ summary: 'Get queue of consignments awaiting authentication' })
  async getPendingListings() {
    return this.adminService.getPendingListings();
  }

  @Post('listings/:id/approve')
  @ApiOperation({ summary: 'Approve and mark listing as verified' })
  async approveListing(@Param('id') id: string) {
    return this.adminService.approveListing(id);
  }

  @Post('listings/:id/reject')
  @ApiOperation({ summary: 'Reject listing with curatorial feedback' })
  async rejectListing(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.adminService.rejectListing(id, reason);
  }
}
