import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProvidersModule } from 'src/oauth-providers/oauth-providers.module';
import { UsersService } from './users.service';

@Module({
  imports: [OauthProvidersModule],
  exports: [UsersService],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
