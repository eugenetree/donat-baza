import { OmitType } from "@nestjs/mapped-types";
import { OauthProviderEntity } from "./oauth-provider.entity";

export class CreateOauthProviderDto extends OmitType(OauthProviderEntity, ['id', 'createdAt', 'updatedAt'] as const) {}
export class UpdateOauthProviderDto extends OmitType(OauthProviderEntity, ['id', 'createdAt', 'updatedAt'] as const) {}
export class FindOauthProdiverDto extends OauthProviderEntity {}
