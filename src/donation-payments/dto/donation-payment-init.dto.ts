import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsString } from "class-validator";

export class DonationPaymentInitDto {
  @ApiProperty()
  @IsIn(['uah'])
  currency: 'uah';

  @IsInt()
  @Type(() => Number)
  amount: number;
 
  @IsString()
  senderName: string;

  @IsString()
  message: string;

  @IsIn(['fondy'])
  paymentSystem: 'fondy';

  @IsString()
  redirectUrl: string;

  @IsInt()
  @Type(() => Number)
  recipientId: number;
}

