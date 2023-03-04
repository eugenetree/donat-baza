import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SettingsService } from './settings.types';

@Injectable()
export class BaseSettingsService implements SettingsService {
  constructor(private configService: ConfigService) { }

  public readonly env: SettingsService['env'] = this.configService.get('ENV') as 'production' | 'development';
  public readonly backAppUrl: string = this.configService.get('BACK_APP_URL')!;
  public readonly frontAppUrl: SettingsService['frontAppUrl'] = this.configService.get('FRONT_APP_URL')!;
  public readonly dbName: SettingsService['dbName'] = this.configService.get('DB_NAME')!;
  public readonly dbPassword: SettingsService['dbPassword'] = this.configService.get('DB_PASSWORD')!;
  public readonly twitchClientId: SettingsService['twitchClientId'] = this.configService.get('TWITCH_CLIENT_ID')!;
  public readonly twitchClientSecret: SettingsService['twitchClientSecret'] = this.configService.get('TWITCH_CLIENT_SECRET')!;
  public readonly fondyMerchantId: SettingsService['fondyMerchantId'] = this.configService.get('FONDY_MERCHANT_ID')!;
}