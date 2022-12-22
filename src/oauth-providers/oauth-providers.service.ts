import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOauthProviderDto } from './dto/create-oauth-provider.dto';
import { FindOauthProdiverDto } from './dto/find-oauth-provider.dto';
import { OauthProviderEntity } from './oauth-provider.entity';

@Injectable()
export class OauthProvidersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  create = (data: CreateOauthProviderDto) => {
    return this.prisma.oauthProvider.create({ data });
  }

  find = (query: FindOauthProdiverDto): Promise<OauthProviderEntity | null> => {
    return this.prisma.oauthProvider.findFirst({
      where: query,
    })
  }
}
