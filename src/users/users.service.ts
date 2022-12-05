import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UserEntity } from './user.entity';
import { CreateUserWithOuathDto, FindOneUserDto } from './user.dto';
import { OauthProviderWasAlreadyUsedError } from './users.errors';
import { OauthProvidersService } from 'src/oauth-providers/oauth-providers.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly OauthProvidersService: OauthProvidersService,
  ) { }


  async findOne(query: FindOneUserDto): Promise<UserEntity | null> {
    const { oauthProviders, ...baseQuery } = query;
    return this.prisma.user.findFirst({
      where: {
        ...baseQuery,
        ouathProviders: { every: oauthProviders }
      }
    });
  }


  async createWithOauth({
    accessToken,
    refreshToken,
    oauthProviderProfileId,
    type
  }: CreateUserWithOuathDto): Promise<UserEntity> {
    const wasOauthProviderAlreadyUsed = Boolean(await this.OauthProvidersService.find({
      profileId: oauthProviderProfileId,
    }))

    if (wasOauthProviderAlreadyUsed) {
      throw new OauthProviderWasAlreadyUsedError();
    }

    return this.prisma.user.create({
      data: {
        ouathProviders: {
          create: {
            accessToken,
            refreshToken,
            profileId: oauthProviderProfileId,
            type,
          }
        }
      }
    })
  }
}
