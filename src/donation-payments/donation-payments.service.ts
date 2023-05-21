import { Injectable } from "@nestjs/common";
import { DonationsService } from "src/donations/donations.service";
import { PAYMENT_SYSTEMS, PAYMENT_SYSTEMS_CALLBACK_URL_PATHS } from "./donation-payments.constants";
import { CreateRedirectUrlToPaymentPageParams, UpdateDonationAfterPaymentSuccessParams } from "./donation-payments.service.type";
import { FondyPaymentsService } from "./fondy-payments.service";
import { UrlUtils } from "src/utils/url.utils";
import { UsersService } from "src/users/users.service";
import { SocketService } from 'src/socket/socket.service';
import { DonationsCipherService } from "src/donations/donations-cipher.service";

@Injectable()
export class DonationPaymentsService {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly donationCipherService: DonationsCipherService,
    private readonly fondyPaymentsService: FondyPaymentsService,
    private readonly usersService: UsersService,
    private readonly socketService: SocketService,
    private readonly urlUtils: UrlUtils,
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
        redirectUrlAfterPayment: this.getRedirectUrlWithEncodedDonationId({
          redirectUrl: redirectUrlAfterPayment,
          donationId: createdDonation.id
        }),
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
    console.log(`DonationPaymentsService | handling success donation payment`, {id, paymentData});
    const donation = await this.donationsService.update(id, { paymentData, paymentStatus: 'success' });
    const recipient = await this.usersService.findFirst({ id: donation.recipientId });
    // @ts-ignore
    this.socketService.emitDonationEvent({ token: recipient?.token, donation })
  }

  private getRedirectUrlWithEncodedDonationId({ redirectUrl, donationId }: { redirectUrl: string, donationId: number }) {
    return this.urlUtils.buildUrl({
      url: redirectUrl,
      query: { id: this.donationCipherService.encryptDonationId(donationId) }
    })
  }
}
