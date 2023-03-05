import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { SettingsService } from 'src/settings/settings.service';

@Catch()
export class TwitchAuthExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly loggerService: LoggerService,
  ) { }

  catch: ExceptionFilter['catch'] = (exception, host) => {
    const res = host.switchToHttp().getResponse();
    // TODO: check why needed 302 check
    if (res.statusCode !== 302) {
      res.redirect(
        this.settingsService.getFrontAppUrl() +
        '?failure=true');
    }
    this.loggerService.error(exception);
  }
}