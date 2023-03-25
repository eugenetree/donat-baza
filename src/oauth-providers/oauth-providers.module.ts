import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProvidersRepository } from './oauth-providers.repository';
import { OauthProvidersService } from './oauth-providers.service';

@Module({
  exports: [OauthProvidersService],
  providers: [
    OauthProvidersService,
    PrismaService,
    OauthProvidersRepository,
  ]
})
export class OauthProvidersModule { }
