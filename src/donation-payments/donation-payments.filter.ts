import {
	ExceptionFilter,
	Catch,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { SettingsService } from 'src/settings/settings.types';

@Catch()
export class DonationPaymentsExceptionFilter implements ExceptionFilter {
	constructor(
		private readonly settingsService: SettingsService,
		private readonly loggerService: LoggerService,
	) { }

	catch: ExceptionFilter['catch'] = (exception, host) => {
		const res = host.switchToHttp().getResponse();
		res.redirect(
			this.settingsService.frontAppUrl +
			'?failure=true');
		this.loggerService.error(exception);
	}
}