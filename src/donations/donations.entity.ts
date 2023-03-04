import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { JsonValue } from "src/common/types";
import { BaseEntity } from "src/database/base.entity";

export class DonationEntity extends BaseEntity {
  @ApiProperty()
  currency: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  senderName: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  paymentSystem: 'fondy' | 'manual';
  @ApiProperty()
  paymentStatus: 'idle' | 'progress' | 'success' | 'fail';
  @ApiProperty()
  paymentData: JsonValue | Prisma.NullTypes.DbNull;
}