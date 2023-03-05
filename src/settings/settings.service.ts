import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './settings.schemas';

@Injectable()
export class SettingsService {
  constructor(private configService: ConfigService) { }

  getEnv = (): EnvVariables['ENV'] => {
    return this.configService.get('ENV')!
  };

  getBackAppUrl = (): EnvVariables['BACK_APP_URL'] => {
    return this.configService.get('BACK_APP_URL')!
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
}