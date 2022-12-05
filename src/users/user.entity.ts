import { OauthProviderEntity } from "src/oauth-providers/oauth-provider.entity";

export class UserEntity {
  id: number;
  email: string | null;
  username: string | null;
  createdAt: Date;
  updatedAt: Date;
}