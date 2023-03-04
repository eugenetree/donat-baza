import { DonationEntity } from "src/donations/donations.entity"

export class GetRedirectUrlParams {
  donation: DonationEntity;
  redirectUrl: string;
  callbackUrlPath: string;
}