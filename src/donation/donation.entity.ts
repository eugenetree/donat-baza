import { BaseEntity } from "src/common/base.entity";

export class DonationEntity extends BaseEntity {
  amount: number;
  sender: string;
}