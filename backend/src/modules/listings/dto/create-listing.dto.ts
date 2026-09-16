import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ListingSpecDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsString()
  group?: string;
}

export class ListingImageDto {
  @IsString()
  @IsNotEmpty()
  r2Key: string;

  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  isCover?: boolean;

  @IsOptional()
  sortOrder?: number;
}

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  @IsString()
  subcategoryId?: string;

  @IsOptional()
  @IsString()
  brandId?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  currency: string; // e.g. 'EUR', 'USD', 'GBP', 'CHF', 'AED'

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsNumber()
  contactUnlockFee?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListingSpecDto)
  specifications?: ListingSpecDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListingImageDto)
  images?: ListingImageDto[];
}
