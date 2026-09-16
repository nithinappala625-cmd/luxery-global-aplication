import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfirmMediaUploadDto {
  @IsString()
  @IsNotEmpty()
  r2Key: string;

  @IsString()
  @IsNotEmpty()
  listingId: string;

  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsBoolean()
  isCover?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
