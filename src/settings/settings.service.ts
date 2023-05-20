import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EnvVariables } from './settings.schemas';

@Injectable()
export class SettingsService {
  constructor(private configService: ConfigService) { }

  private ngrokUrl: string;

  async init(): Promise<void> {
    if (this.getEnv() === 'development') {
      this.ngrokUrl = await this.fetchNgrokUrl();
    };
  }


  async fetchNgrokUrl(): Promise<string> {
    const { data } = await axios.get('http://ngrok:4551/api/tunnels');

    const ngrokUrl = data.tunnels[0].public_url;
    if (!ngrokUrl.includes('ngrok')) {
      throw new Error('Ngrok url is invalid');
    }

    return ngrokUrl;
  };


  getNgrokUrl() {
    return this.ngrokUrl;
  };


  getEnv = (): EnvVariables['ENV'] => {
    return this.configService.get('ENV')!
  };


  getBackAppUrl = (): EnvVariables['BACK_APP_URL'] => {
    if (this.getEnv() === 'development') return this.ngrokUrl;
    else return this.configService.get('BACK_APP_URL')!
  };


  getFrontAppUrl = (): EnvVariables['FRONT_APP_URL'] => {
    return this.configService.get('FRONT_APP_URL')!
  };


  getDbName = (): EnvVariables['DB_NAME'] => {
    return this.configService.get('DB_NAME')!
  };

  
  getDbPassword = (): EnvVariables['DB_PASSWORD'] => {
    return this.configService.get('DB_PASSWORD')!
  };

  
  getTwitchClientId = (): EnvVariables['TWITCH_CLIENT_ID'] => {
    return this.configService.get('TWITCH_CLIENT_ID')!
  };


  getTwitchClientSecret = (): EnvVariables['TWITCH_CLIENT_SECRET'] => {
    return this.configService.get('TWITCH_CLIENT_SECRET')!
  };

  
  getFondyMerchantId = (): EnvVariables['FONDY_MERCHANT_ID'] => {
    return this.configService.get('FONDY_MERCHANT_ID')!
  };

  getDonationCipherPassphrase = (): EnvVariables['DONATION_CIPHER_PASSPHRASE'] => {
    return this.configService.get('DONATION_CIPHER_PASSPHRASE')!
  }

  getDonationCipherIv = (): EnvVariables['DONATION_CIPHER_IV'] => {
    return this.configService.get('DONATION_CIPHER_IV')!
  }
}