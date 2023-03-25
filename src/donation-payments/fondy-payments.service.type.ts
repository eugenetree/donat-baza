import { DonationEntity } from "src/donations/donations.entity";
import { FondyCallbackBodyDto } from "./dto/fondy-callback.dto";

export class FondyCallbackParams extends FondyCallbackBodyDto {};

export class GetRedirectUrlParams {
  donation: DonationEntity;
  redirectUrlAfterPayment: string;
  callbackUrlPathAfterPayment: string;
}