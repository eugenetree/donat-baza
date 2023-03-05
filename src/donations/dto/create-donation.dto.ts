import { Type } from "class-transformer";
import { IsIn, IsInt, IsString } from "class-validator";

export class CreateDonationDto {
  @IsString()
  currency: string;

  @IsInt()
  @Type(() => Number)
  amount: number;

  @IsString()
  senderName: string;

  @IsString()
  message: string;

  @IsIn(['fondy', 'manual'])
  paymentSystem: 'fondy' | 'manual';

  @IsInt()
  @Type(() => Number)
  recipientId: number;
}