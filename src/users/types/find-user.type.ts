import { PartialType } from "@nestjs/mapped-types";
import { FindOauthProdiverParams } from "src/oauth-providers/oauth-providers.types";
import { UserEntity } from "../user.entity";

export class FindOneUserParams extends PartialType(UserEntity) {
  oauthProviders?: FindOauthProdiverParams;
}