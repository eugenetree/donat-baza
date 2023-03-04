import { PartialType } from "@nestjs/mapped-types";

export class CreateOauthProviderParams {
	accessToken: string;
	refreshToken: string;
	profileId: string;
	type: "twitch" | "youtube";
	userId: number;
}

export class FindOauthProdiverParams
	extends PartialType(CreateOauthProviderParams) { }