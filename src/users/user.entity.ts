import { BaseEntity } from "src/database/base.entity";

export class UserEntity extends BaseEntity {
  email: string | null;
  username: string | null;
  token: string;
}