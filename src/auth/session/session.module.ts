import { Module, NestModule } from '@nestjs/common';
import * as session from 'express-session';
import { SessionHandler } from './session.handler';

@Module({
  exports: [SessionHandler],
  providers: [SessionHandler],
})
export class SessionModule implements NestModule {
  configure: NestModule['configure'] = (consumer) => {
    consumer
      .apply(session({
        secret: 'a santa at nasa',
        resave: false,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
      }))
      .forRoutes('*')
  }
}