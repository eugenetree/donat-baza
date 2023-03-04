import { Injectable } from '@nestjs/common';

import * as Fondy from 'cloudipsp-node-js-sdk';
import * as crypto from 'node:crypto';

import { SettingsService } from 'src/settings/settings.types';
import { UrlUtils } from 'src/utils/url.types';
import { DonationEntity } from '../donations/donations.entity';
import { DonationsService } from '../donations/donations.service';
import { DonationPaymentInitDto } from './dto/donation-payment-init.dto';
import { FondyCallbackParams } from './types/fondy-callback.types';
import { GetRedirectUrlParams } from './types/get-redirect-url.type';

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
      url: `${this.settingsService.backAppUrl}/${callbackUrlPath}`,
      query: { id }
    }));
    
    const requestData = {
      order_id: id,
      order_desc: message,
      currency,
      amount,
      response_url: redirectUrl,
      server_callback_url: this.urlUtils.buildUrl({
        url: `${this.settingsService.backAppUrl}/${callbackUrlPath}`,
        query: { id: this.donationsService.encryptDonationId(id) },
      }),
    }

    const res = await this.fondyClient.Checkout(requestData);
    return res.checkout_url;
  }


  processPaymentCallback = async () => {

  }
}