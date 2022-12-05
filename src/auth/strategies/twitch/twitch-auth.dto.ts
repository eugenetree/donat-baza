import { IsString } from "class-validator";

export class InitTwitchAuthDto {
  @IsString()
  successUrl: string;

  @IsString()
  failUrl: string;
}