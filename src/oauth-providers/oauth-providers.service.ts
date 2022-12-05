import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { OauthProviderEntity } from './oauth-provider.entity';
import { CreateOauthProviderDto, FindOauthProdiverDto } from './oauth-providers.dto';

@Injectable()
export class OauthProvidersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  create = (data: CreateOauthProviderDto) => {
    return this.prisma.oauthProvider.create({ data });
  }

  find = (query: Partial<FindOauthProdiverDto>): Promise<OauthProviderEntity | null> => {
    return this.prisma.oauthProvider.findFirst({
      where: query,
    })
  }
}
