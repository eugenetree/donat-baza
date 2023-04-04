import { PrepareCreateInput } from "src/database/base.repository.type";
import { DonationEntity } from "src/donations/donations.entity";
import { UpdateDonationParams } from "src/donations/donations.service.type";
import { DonationEntityFieldsWithDefaultValue } from "src/donations/donations.entity"

export class CreateRedirectUrlToPaymentPageParams {
  donationInput: PrepareCreateInput<DonationEntity, typeof DonationEntityFieldsWithDefaultValue>;
  redirectUrlAfterPayment: string;
}

export class UpdateDonationAfterPaymentSuccessParams {
  id: string;
  paymentData: UpdateDonationParams['paymentData'];
}