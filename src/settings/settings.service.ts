import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SettingsService } from './settings.types';

@Injectable()
export class BaseSettingsService implements SettingsService {
  constructor(private configService: ConfigService) { }

  getEnv: SettingsService['getEnv'] = () => this.configService.get('ENV') as 'PROD' | 'DEV';

  getBackAppUrl: SettingsService['getBackAppUrl'] = () => this.configService.get('BACK_APP_URL')!;
  getFrontAppUrl: SettingsService['getFrontAppUrl'] = () => this.configService.get('FRONT_APP_URL')!;

  getDbVars: SettingsService['getDbVars'] = () => ({
    name: this.configService.get('DB_NAME')!,
    password: this.configService.get('DB_PASSWORD')!,
  });

  getTwitchVars: SettingsService['getTwitchVars'] = () => ({
    clientId: this.configService.get('TWITCH_CLIENT_ID')!,
    clientSecret: this.configService.get('TWITCH_CLIENT_SECRET')!,
  })
}