import { IsString } from "class-validator";

export class FondyCallbackQueryDto {
  @IsString()
  id: string;
}