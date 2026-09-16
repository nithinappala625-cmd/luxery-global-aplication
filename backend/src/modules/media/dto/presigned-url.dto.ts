import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max } from 'class-validator';

export enum MediaScope {
  LISTING_IMAGE = 'listing-image',
  SELLER_DOCUMENT = 'seller-document',
  VERIFICATION = 'verification',
  AUCTION = 'auction',
}

export class GeneratePresignedUploadUrlDto {
  @IsEnum(MediaScope)
  @IsNotEmpty()
  scope: MediaScope;

  @IsString()
  @IsNotEmpty()
  entityId: string; // listingId, sellerId, or auctionId

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  contentType: string; // e.g. 'image/jpeg', 'image/png', 'application/pdf'

  @IsNumber()
  @Max(30 * 1024 * 1024) // 30MB limit
  fileSizeBytes: number;

  @IsOptional()
  @IsString()
  subfolder?: 'original' | 'optimized' | 'thumbnail';
}
