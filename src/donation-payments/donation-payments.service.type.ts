import { PrepareCreateInput } from "src/database/base.repository.type";
import { DonationEntity } from "src/donations/donations.entity";

export class CreateRedirectUrlParams {
  donationInput: PrepareCreateInput<DonationEntity, ['paymentStatus']>;
  redirectUrlAfterPayment: string;
  callbackUrlPathAfterPayment: string;
}