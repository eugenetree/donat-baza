import { DonationEntity } from "src/donations/donations.entity";


export class GetRedirectUrlParams {
  donation: DonationEntity;
  redirectUrlAfterPayment: string;
  callbackUrlPathAfterPayment: string;
}