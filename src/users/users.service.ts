import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserEntity } from './user.entity';
import { OauthProviderWasAlreadyUsedError } from './users.errors';
import { OauthProvidersService } from 'src/oauth-providers/oauth-providers.service';
import * as crypto from "crypto";
import { CreateUserViaOuathParams, FindOneUserParams } from './users.service.type';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly oauthProvidersService: OauthProvidersService,
  ) { }


  async findFirst(params: FindOneUserParams): Promise<UserEntity | null> {
    const { oauthProviders, ...baseQuery } = params;
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
  }: CreateUserViaOuathParams): Promise<UserEntity> { 
    const wasOauthProviderAlreadyUsed = 
    Boolean(await this.oauthProvidersService.findFirst({
      profileId: oauthProviderProfileId,
    }))

    if (wasOauthProviderAlreadyUsed) {
      throw new OauthProviderWasAlreadyUsedError();
    }

    return this.prisma.user.create({
      data: {
        token: this.generateUniqueToken(),
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


  private generateUniqueToken() {
    return crypto.randomBytes(64).toString('hex');
  }
}
