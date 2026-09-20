import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/env.config';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { MediaModule } from './modules/media/media.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ListingsModule } from './modules/listings/listings.module';
import { AuctionsModule } from './modules/auctions/auctions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ContactUnlocksModule } from './modules/contact-unlocks/contact-unlocks.module';
import { AdminModule } from './modules/admin/admin.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { RentalsModule } from './modules/rentals/rentals.module';
import { AviationModule } from './modules/aviation/aviation.module';
import { DealsModule } from './modules/deals/deals.module';
import { BuyerRequestsModule } from './modules/buyer-requests/buyer-requests.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { FoundingSellersModule } from './modules/founding-sellers/founding-sellers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SupabaseModule,
    MediaModule,
    CategoriesModule,
    ListingsModule,
    AuctionsModule,
    PaymentsModule,
    ContactUnlocksModule,
    AdminModule,
    SellersModule,
    AttributesModule,
    RentalsModule,
    AviationModule,
    DealsModule,
    BuyerRequestsModule,
    MembershipsModule,
    FoundingSellersModule,
  ],
})
export class AppModule {}
