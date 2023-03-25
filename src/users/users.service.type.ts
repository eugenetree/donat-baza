import { OmitType, PartialType } from "@nestjs/mapped-types";
import { OauthProviderEntity } from "src/oauth-providers/oauth-provider.entity";
import { CreateOauthProviderParams, FindOauthProdiverParams } from "src/oauth-providers/oauth-providers.types";
import { UserEntity } from "./user.entity";

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

export class FindOneUserParams extends PartialType(UserEntity) { }

export class FindOneByOauthProviderParams extends PartialType(OauthProviderEntity) { }