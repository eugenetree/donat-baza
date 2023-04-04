import { Injectable } from "@nestjs/common";
import { DonationsService } from "src/donations/donations.service";
import { PAYMENT_SYSTEMS, PAYMENT_SYSTEMS_CALLBACK_URL_PATHS } from "./donation-payments.constants";
import { CreateRedirectUrlToPaymentPageParams, UpdateDonationAfterPaymentSuccessParams } from "./donation-payments.service.type";
import { FondyPaymentsService } from "./fondy-payments.service";

@Injectable()
export class DonationPaymentsService {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly fondyPaymentsService: FondyPaymentsService,
  ) { }


  async createRedirectUrlToPaymentPage({
    donationInput,
    redirectUrlAfterPayment,
  }: CreateRedirectUrlToPaymentPageParams): Promise<string> {
    const createdDonation = await this.donationsService.create(donationInput);
    console.log('DonationPaymentsService | donation record was created', createdDonation);

    let redirectUrl: string = '';
    if (createdDonation.paymentSystem === 'fondy') {
      redirectUrl = await this.fondyPaymentsService.getRedirectUrl({
        donation: createdDonation,
        redirectUrlAfterPayment,
        callbackUrlPathAfterPayment:
          `donation-payments/${PAYMENT_SYSTEMS_CALLBACK_URL_PATHS[PAYMENT_SYSTEMS.FONDY]}`,
      });
    }

    return redirectUrl;
  }

  async handleSuccessDonationPayment({
    id,
    paymentData
  }: UpdateDonationAfterPaymentSuccessParams) {
    this.donationsService.update(+id, { paymentData, paymentStatus: 'success' })
    console.log('notification started');
  }
}
