import { Type } from "class-transformer";
import { IsIn, IsInt, IsString } from "class-validator";

export class FondyCallbackBodyDto {
  @IsString()
  order_id: string;

  @IsIn(['success', 'failure'])
  response_status: 'success' | 'failure';

  [key: string]: unknown;
}

export class FondyCallbackQueryDto {
  @IsString()
  id: string;
}