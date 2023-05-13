import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class FondyCallbackQueryDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}