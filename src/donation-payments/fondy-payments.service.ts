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

  getRedirectUrl = async ({
    redirectUrl,
    callbackUrlPath,
    donation: {
      id,
      amount,
      currency,
      message,
    },
  }: GetRedirectUrlParams
  ): Promise<string> => {
    console.log('rul', this.urlUtils.buildUrl({
      url: `${this.settingsService.getBackAppUrl()}/${callbackUrlPath}`,
      query: { id }
    }));
    
    const requestData = {
      order_id: id,
      order_desc: message,
      currency,
      amount,
      response_url: redirectUrl,
      server_callback_url: this.urlUtils.buildUrl({
        url: `${this.settingsService.getBackAppUrl()}/${callbackUrlPath}`,
        query: { id: this.donationsService.encryptDonationId(id) },
      }),
    }

    const res = await this.fondyClient.Checkout(requestData);
    return res.checkout_url;
  }


  processPaymentCallback = async () => {

  }
}