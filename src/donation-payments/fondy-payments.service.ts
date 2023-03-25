import { Injectable } from '@nestjs/common';

import * as Fondy from 'cloudipsp-node-js-sdk';
import { SettingsService } from 'src/settings/settings.service';
import { UrlUtils } from 'src/utils/url.utils';

import { DonationsService } from '../donations/donations.service';
import { GetRedirectUrlParams } from './fondy-payments.service.type';

@Injectable()
export class FondyPaymentsService {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly donationsService: DonationsService,
    private readonly urlUtils: UrlUtils,
  ) { }

  private readonly fondyClient = new Fondy({
    merchantId: 1396424,
    secretKey: 'test'
  })

  async getRedirectUrl({
    redirectUrlAfterPayment,
    callbackUrlPathAfterPayment,
    donation: {
      id,
      amount,
      currency,
      message,
    },
  }: GetRedirectUrlParams
  ): Promise<string> {
    console.log('responseUrl', redirectUrlAfterPayment),
    console.log('callbackURL', this.urlUtils.buildUrl({
      url: `${this.settingsService.getBackAppUrl()}/${callbackUrlPathAfterPayment}`,
      query: { id: this.donationsService.encryptDonationId(id) },
    }));

    const requestData = {
      order_id: id + +new Date(),
      order_desc: message,
      currency,
      amount,
      response_url: redirectUrlAfterPayment,
      // response_url: redirectUrlAfterPayment,
      server_callback_url: this.urlUtils.buildUrl({
        url: `${this.settingsService.getBackAppUrl()}/${callbackUrlPathAfterPayment}`,
        query: { id: this.donationsService.encryptDonationId(id) },
      }),
    }

    const res = await this.fondyClient.Checkout(requestData);
    return res.checkout_url;
  }


  processPaymentCallback = async () => {

  }
}