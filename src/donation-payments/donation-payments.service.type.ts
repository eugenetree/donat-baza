import { PrepareCreateInput } from "src/database/base.repository.type";
import { DonationEntity } from "src/donations/donations.entity";
import { UpdateDonationParams } from "src/donations/donations.service.type";

export class CreateRedirectUrlToPaymentPageParams {
  donationInput: PrepareCreateInput<DonationEntity, ['paymentStatus']>;
  redirectUrlAfterPayment: string;
}

export class UpdateDonationAfterPaymentSuccessParams {
  id: string;
  paymentData: UpdateDonationParams['paymentData'];
}