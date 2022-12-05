import { MinLength } from "class-validator";

export class OauthProviderEntity {
  id: number;
  accessToken: string;
  refreshToken: string;
  profileId: string;
  type: "TWITCH" | "YOUTUBE";
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}