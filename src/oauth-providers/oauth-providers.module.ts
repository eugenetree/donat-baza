import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProvidersService } from './oauth-providers.service';

@Module({
  imports: [],
  exports: [OauthProvidersService],
  providers: [OauthProvidersService, PrismaService]
})
export class OauthProvidersModule {}
