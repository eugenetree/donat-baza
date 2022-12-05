import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SettingsModule } from 'src/settings/settings.module';
import { TwitchAuthController } from './twitch-auth.controller';
import { TwitchAuthService } from './twitch-auth.service';
import { UsersModule } from '../../../users/users.module';
import { SessionModule } from 'src/auth/session/session.module';
import { OauthProvidersModule } from 'src/oauth-providers/oauth-providers.module';

@Module({
  imports: [SettingsModule, UsersModule, SessionModule, OauthProvidersModule],
  controllers: [TwitchAuthController],
  providers: [TwitchAuthService, PrismaService],
})
export class TwitchAuthModule {
}
