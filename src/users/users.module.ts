import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProvidersModule } from 'src/oauth-providers/oauth-providers.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [OauthProvidersModule],
  exports: [UsersService],
  providers: [UsersService, PrismaService, UsersRepository],
})
export class UsersModule { }
