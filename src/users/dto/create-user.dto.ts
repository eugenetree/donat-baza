import { OmitType } from "@nestjs/mapped-types";
import { CreateOauthProviderDto } from "src/oauth-providers/dto/create-oauth-provider.dto";
import { OauthProviderEntity } from "src/oauth-providers/oauth-provider.entity";

export class CreateUserDto {
  email?: string;
  username?: string;
  token: string;
}

export class CreateUserViaOuathDto extends OmitType(
  CreateOauthProviderDto,
  ['profileId', 'userId'] as const,
) {
  oauthProviderProfileId: OauthProviderEntity['profileId']
}