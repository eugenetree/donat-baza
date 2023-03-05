export abstract class SettingsService {
  abstract env: 'production' | 'development';

  abstract backAppUrl: string;
  abstract frontAppUrl: string;

  abstract dbName: string;
  abstract dbPassword: string;

  abstract twitchClientId: string;
  abstract twitchClientSecret: string;

  abstract fondyMerchantId: string;
}