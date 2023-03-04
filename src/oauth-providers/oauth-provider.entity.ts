import { BaseEntity } from "src/database/base.entity";

export class OauthProviderEntity extends BaseEntity {
  accessToken: string;
  refreshToken: string;
  profileId: string;
  type: "twitch" | "youtube";
  userId: number;
}