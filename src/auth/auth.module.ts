import { Module, NestModule } from '@nestjs/common';
import { SessionMiddleware } from './session/session.middleware';
import { TwitchAuthModule } from './strategies/twitch/twitch-auth.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [TwitchAuthModule, SessionModule]
})
export class AuthModule { }
 