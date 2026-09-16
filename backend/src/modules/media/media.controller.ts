import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { GeneratePresignedUploadUrlDto } from './dto/presigned-url.dto';
import { ConfirmMediaUploadDto } from './dto/confirm-upload.dto';

@ApiTags('Media (Cloudflare R2)')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('presigned-upload-url')
  @ApiOperation({ summary: 'Request signed Cloudflare R2 direct upload URL' })
  @ApiResponse({ status: 201, description: 'Signed PUT URL and storage key generated' })
  async getPresignedUploadUrl(@Body() dto: GeneratePresignedUploadUrlDto) {
    return this.mediaService.generatePresignedUploadUrl(dto);
  }

  @Post('confirm-upload')
  @ApiOperation({ summary: 'Confirm completed direct R2 upload to database' })
  @ApiResponse({ status: 201, description: 'Image recorded in listing_images' })
  async confirmUpload(@Body() dto: ConfirmMediaUploadDto) {
    return this.mediaService.confirmListingMediaUpload(dto);
  }

  @Get('presigned-read-url')
  @ApiOperation({ summary: 'Request signed GET URL for encrypted private document' })
  async getPresignedReadUrl(@Query('key') key: string) {
    const url = await this.mediaService.generatePresignedReadUrl(key);
    return { readUrl: url, expiresInSeconds: 900 };
  }
}
