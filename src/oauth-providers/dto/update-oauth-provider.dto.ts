import { PartialType } from "@nestjs/mapped-types";
import { CreateOauthProviderDto } from "./create-oauth-provider.dto";

export class UpdateOauthProviderDto extends PartialType(CreateOauthProviderDto) { }