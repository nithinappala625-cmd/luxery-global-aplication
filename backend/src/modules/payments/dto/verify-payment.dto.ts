import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SupportedProvider } from './create-payment.dto';

export class VerifyPaymentDto {
  @IsEnum(SupportedProvider)
  provider: SupportedProvider;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsOptional()
  @IsString()
  signature?: string;

  @IsOptional()
  rawPayload?: any;
}
