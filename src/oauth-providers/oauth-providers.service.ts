import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProviderEntity } from './oauth-provider.entity';
import { CreateOauthProviderParams, FindOauthProdiverParams } from './oauth-providers.types';

@Injectable()
export class OauthProvidersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  create = (data: CreateOauthProviderParams) => {
    return this.prisma.oauthProvider.create({ data });
  }

  findFirst = (params: FindOauthProdiverParams): Promise<OauthProviderEntity | null> => {
    return this.prisma.oauthProvider.findFirst({
      where: params,
    })
  }
}
