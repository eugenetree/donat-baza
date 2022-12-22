import { PartialType } from "@nestjs/mapped-types";
import { FindOauthProdiverDto } from "src/oauth-providers/dto/find-oauth-provider.dto";
import { UserEntity } from "../user.entity";

class PartialFindOauthProviderDto extends PartialType(FindOauthProdiverDto) { }
export class FindOneUserDto extends PartialType(UserEntity) {
  oauthProviders?: PartialFindOauthProviderDto;
}

