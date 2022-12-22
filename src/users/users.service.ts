import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserEntity } from './user.entity';
import { OauthProviderWasAlreadyUsedError } from './users.errors';
import { OauthProvidersService } from 'src/oauth-providers/oauth-providers.service';
import { FindOneUserDto } from './dto/find-user.dto';
import { CreateUserViaOuathDto } from './dto/create-user.dto';
import * as crypto from "crypto";


@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly OauthProvidersService: OauthProvidersService,
  ) { }


  async findOne(query: FindOneUserDto): Promise<UserEntity | null> {
    const { oauthProviders, ...baseQuery } = query;
    console.log(query);
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
  }: CreateUserViaOuathDto): Promise<UserEntity> { 
    const wasOauthProviderAlreadyUsed = Boolean(await this.OauthProvidersService.find({
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
