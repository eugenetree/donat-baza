import { Injectable } from "@nestjs/common";
import { DonationsService } from "src/donations/donations.service";
import { CreateRedirectUrlParams } from "./donation-payments.service.type";
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
    callbackUrlPathAfterPayment
  }: CreateRedirectUrlParams): Promise<string> {
    const createdDonation = await this.donationsService.create(donationInput);

    let redirectUrl: string = '';
    if (createdDonation.paymentSystem === 'fondy') {
      redirectUrl = await this.fondyPaymentsService.getRedirectUrl({
        donation: createdDonation,
        redirectUrlAfterPayment,
        callbackUrlPathAfterPayment,
      });
    }

    return redirectUrl;
  }
}
