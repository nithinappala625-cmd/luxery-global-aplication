import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MembershipsService, SubscribeMembershipDto } from './memberships.service';

@ApiTags('Memberships - NP Access, Privé, Black')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Retrieve available membership plans and privileges' })
  async getPlans() {
    return this.membershipsService.getPlans();
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to a membership plan' })
  async subscribe(@Body() dto: SubscribeMembershipDto) {
    return this.membershipsService.subscribe(dto);
  }
}
