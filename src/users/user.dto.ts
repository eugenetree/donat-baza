import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { OauthProviderEntity } from "src/oauth-providers/oauth-provider.entity";
import { CreateOauthProviderDto, FindOauthProdiverDto } from "src/oauth-providers/oauth-providers.dto";
import { UserEntity } from "./user.entity";

export class CreateUserDto extends OmitType(UserEntity, ['id', 'createdAt', 'updatedAt'] as const) { }

export class CreateUserWithOuathDto extends OmitType(CreateOauthProviderDto, ['profileId', 'userId'] as const) {
  oauthProviderProfileId: OauthProviderEntity['profileId']
}

class PartialFindOauthProviderDto extends PartialType(FindOauthProdiverDto) {}
export class FindOneUserDto extends PartialType(UserEntity) {
  oauthProviders?: PartialFindOauthProviderDto;
}