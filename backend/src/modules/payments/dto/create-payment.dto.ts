import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export enum SupportedProvider {
  RAZORPAY = 'razorpay',
  PAYPAL = 'paypal',
}

export enum PaymentPurpose {
  CONTACT_UNLOCK = 'contact_unlock',
  FEATURED_LISTING = 'featured_listing',
  CURATION_FEE = 'curation_fee',
  AUCTION_DEPOSIT = 'auction_deposit',
}

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string; // e.g. 'EUR', 'USD', 'GBP', 'AED'

  @IsEnum(SupportedProvider)
  provider: SupportedProvider;

  @IsEnum(PaymentPurpose)
  purpose: PaymentPurpose;

  @IsOptional()
  @IsString()
  targetId?: string; // listingId or sellerId

  @IsOptional()
  metadata?: Record<string, any>;
}
