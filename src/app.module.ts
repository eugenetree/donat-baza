import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { OauthProvidersModule } from './oauth-providers/oauth-providers.module';

@Module({
  imports: [AuthModule, SettingsModule, UsersModule, OauthProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
