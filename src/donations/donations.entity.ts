import { Prisma } from "@prisma/client";
import { JsonValue } from "src/common/types";
import { BaseEntity } from "src/database/base.entity";

export class DonationEntity extends BaseEntity {
  currency: string;
  amount: number;
  senderName: string;
  message: string;
  paymentSystem: 'fondy' | 'manual';
  paymentStatus: 'idle' | 'progress' | 'success' | 'fail';
  paymentData: JsonValue | null;
}