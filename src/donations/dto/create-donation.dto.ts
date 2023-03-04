import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsString } from "class-validator";

export class CreateDonationDto {
  @ApiProperty()
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

type Item = { x: number };
const item = { x: 1, y: 2 };

const f = (item: Item): void => {};
f(item);