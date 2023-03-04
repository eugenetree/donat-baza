import { BaseEntity } from "src/database/base.entity";

class DonationALertWidgetEntity extends BaseEntity {
    text: string;
    minAmount: number | null;
    maxAmount: number | null;
    specificAmount: number | null;
}