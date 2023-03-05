import { DonationPaymentInitDto } from "./dto/donation-payment-init.dto";

export class ProcessPaymentInitData extends DonationPaymentInitDto {
  callbackUrlPath: string;
}