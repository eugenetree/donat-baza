import { Injectable } from "@nestjs/common";
import { DonationsService } from "src/donations/donations.service";
import { ProcessPaymentInitData } from "./donation-payments.service.type";
import { FondyPaymentsService } from "./fondy-payments.service";

@Injectable()
export class DonationPaymentsService {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly fondyPaymentsService: FondyPaymentsService,
  ) { }


  createRedirectUrl = async (data: ProcessPaymentInitData): Promise<string> => {
    const entity = await this.donationsService.create(data);

    let redirectUrl: string = '';
    if (data.paymentSystem === 'fondy') {
      redirectUrl = await this.fondyPaymentsService.getRedirectUrl({
        donation: entity,
        redirectUrl: data.redirectUrl,
        callbackUrlPath: data.callbackUrlPath,
      });
    }

    return redirectUrl;
  }


  encryptRecipientId = (id: number) => {
    return 
  }


  decryptRecipientId = (value: string) => {

  }
}
