import { Injectable, Logger } from '@nestjs/common';
import { ListingsService } from '../listings/listings.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly listingsService: ListingsService) {}

  async getAdminStats() {
    const listings = await this.listingsService.findFiltered({});
    const totalGmv = listings.items.reduce((acc, item) => acc + (item.price || 0), 0);

    return {
      totalAssetsConsigned: listings.items.length,
      totalGmvEur: totalGmv,
      pendingReviewsCount: listings.items.filter((i) => i.status === 'pending_review').length,
      verifiedActiveCount: listings.items.filter((i) => i.status === 'verified').length,
      unlocksCount: 42,
    };
  }

  async getPendingListings() {
    const res = await this.listingsService.findFiltered({});
    return res.items.filter((item) => item.status === 'pending_review');
  }

  async approveListing(listingId: string) {
    this.logger.log(`Curatorial board approved listing: ${listingId}`);
    return this.listingsService.updateStatus(listingId, 'verified');
  }

  async rejectListing(listingId: string, reason?: string) {
    this.logger.log(`Curatorial board rejected listing: ${listingId}. Reason: ${reason}`);
    return this.listingsService.updateStatus(listingId, 'rejected');
  }
}
