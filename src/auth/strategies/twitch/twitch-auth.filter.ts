import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { SettingsService } from 'src/settings/settings.types';

@Catch()
export class TwitchAuthExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly settingsService: SettingsService,
  ) { }

  catch: ExceptionFilter['catch'] = (exception, host) => {
    const ctx = host.switchToHttp();
    console.log(exception);
    ctx.getResponse().redirect(this.settingsService.getFrontAppUrl() + '?failure=true');
  }
}