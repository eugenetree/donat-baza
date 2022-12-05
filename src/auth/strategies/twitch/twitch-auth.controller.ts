import { Controller, Get, Query, Redirect, Res, ServiceUnavailableException, Session, UseFilters, UseInterceptors } from "@nestjs/common";
import { TwitchAuthService } from "./twitch-auth.service";
import { query, Response } from "express";
import { SessionHandler } from "src/auth/session/session.handler";
import { SettingsService } from "src/settings/settings.types";
import { UserId } from "src/auth/session/session.decorator";
import { InitTwitchAuthDto } from "./twitch-auth.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { TwitchAuthExceptionsFilter } from "./twitch-auth.filter";

@UseFilters(TwitchAuthExceptionsFilter)
@Controller('auth/twitch')
export class TwitchAuthController {
  constructor(
    private readonly twitchAuthService: TwitchAuthService,
    private readonly sessionHandler: SessionHandler,
    private readonly settingsService: SettingsService,
  ) { }

  @Get('init')
  async init(
    @Res() res: Response,
    @Query() query: InitTwitchAuthDto,
  ) {
    res.redirect(this.twitchAuthService.getUrlToBeginAuth({
      successUrl: query.successUrl,
      failUrl: query.failUrl,
    }));
  }

  // if user already logged in - link provider to account
  // if user not logged in - create new account via provider
  // TODO: provide better validation for single params
  @Get('callback')
  async redirect(
    @Res() res: Response,
    @Query('code') code,
    @Query('error') twitchError,
    @Query('state') state,
    @Session() session,
  ) {
    const { successUrl, failUrl } = this.twitchAuthService.getRedirectUrlsFromCallback(state);
    try {
      if (twitchError) throw new ServiceUnavailableException(twitchError);
      const userId = this.sessionHandler.getUserId(session);
      if (userId) await this.twitchAuthService.linkProviderToAccount({ code, userId: Number(userId) });
      else {
        const user = await this.twitchAuthService.authenticate(code);
        this.sessionHandler.setUserId(session, user.id);
      }
      res.redirect(successUrl);
    } catch (err) {
      if (failUrl) res.redirect(failUrl);
      throw err;
      // TODO: make better service errors handling 
      //  (OauthProviderWasAlreadyUsedError, IncorrectCallbackUrlError)
    }
  }
}
