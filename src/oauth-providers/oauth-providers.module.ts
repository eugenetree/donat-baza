import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProvidersService } from './oauth-providers.service';

@Module({
  exports: [OauthProvidersService],
  providers: [OauthProvidersService, PrismaService]
})
export class OauthProvidersModule {}
