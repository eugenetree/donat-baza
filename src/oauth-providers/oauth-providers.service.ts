import { Injectable } from '@nestjs/common';
import { OauthProviderEntity } from './oauth-provider.entity';
import { OauthProvidersRepository } from './oauth-providers.repository';
import { CreateOauthProviderParams, FindOauthProdiverParams } from './oauth-providers.types';

@Injectable()
export class OauthProvidersService {
  constructor(
    private oauthProvidersRepository: OauthProvidersRepository,
  ) { }

  create = (data: CreateOauthProviderParams) => {
    return this.oauthProvidersRepository.create({ data });
  }

  findFirst = (params: FindOauthProdiverParams): Promise<OauthProviderEntity | null> => {
    return this.oauthProvidersRepository.findOne({ where: params })
  }
}
