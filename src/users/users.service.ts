import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserEntity } from './user.entity';
import { OauthProviderWasAlreadyUsedError } from './users.errors';
import { OauthProvidersService } from 'src/oauth-providers/oauth-providers.service';
import { CreateUserViaOuathParams, FindOneByOauthProviderParams, FindOneUserParams } from './users.service.type';
import { UsersRepository } from './users.repository';
import * as crypto from "crypto";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
    private readonly oauthProvidersService: OauthProvidersService,
  ) { }


  async findFirst(params: FindOneUserParams): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: params });
  }

  async findOneByOauthProvider(params: FindOneByOauthProviderParams): Promise<UserEntity | null> {
    return this.usersRepository.findOneByOauthProvider({ where: params })
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
    return crypto.randomUUID();
  }
}
