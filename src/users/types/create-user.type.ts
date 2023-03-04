import { OmitType } from "@nestjs/mapped-types";
import { OauthProviderEntity } from "src/oauth-providers/oauth-provider.entity";
import { CreateOauthProviderParams } from "src/oauth-providers/oauth-providers.types";

export class CreateUserParams {
    email?: string;
    username?: string;
    token: string;
  }
  
  export class CreateUserViaOuathParams extends OmitType(
    CreateOauthProviderParams,
    ['profileId', 'userId'] as const,
  ) {
    oauthProviderProfileId: OauthProviderEntity['profileId']
  }