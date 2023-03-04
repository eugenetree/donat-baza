import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { OauthProvidersModule } from './oauth-providers/oauth-providers.module';
import { DonationsModule } from './donations/donations.module';
import { SocketModule } from './socket/socket.module';
import { LoggerModule } from './logger/logger.module';
import { UtilsModule } from './utils/utils.module';
import { DonationAlertWidgetModule } from './donation-alert-widget/donation-alert-widget.module';
import { DonationPaymentsModule } from './donation-payments/donation-payments.module';

@Module({
  imports: [
    AuthModule,
    SettingsModule,
    UsersModule,
    OauthProvidersModule,
    DonationsModule,
    SocketModule,
    LoggerModule,
    UtilsModule,
    DonationAlertWidgetModule,
    DonationPaymentsModule
  ],
})
export class AppModule { }
