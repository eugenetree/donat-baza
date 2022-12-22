import { OmitType } from "@nestjs/mapped-types";
import { BaseEntity } from "src/common/base.entity";
import { OauthProviderEntity } from "../oauth-provider.entity";

export class CreateOauthProviderDto {
  accessToken: string;
  refreshToken: string;
  profileId: string;
  type: "TWITCH" | "YOUTUBE";
  userId: number;
}