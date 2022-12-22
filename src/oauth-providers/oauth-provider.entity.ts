import { BaseEntity } from "src/common/base.entity";

export class OauthProviderEntity extends BaseEntity {
  accessToken: string;
  refreshToken: string;
  profileId: string;
  type: "TWITCH" | "YOUTUBE";
  userId: number;
}