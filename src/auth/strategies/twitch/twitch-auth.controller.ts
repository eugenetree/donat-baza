import { Controller, Get, Query, Redirect, Res, ServiceUnavailableException, Session, UseFilters, UseInterceptors } from "@nestjs/common";
import { TwitchAuthService } from "./twitch-auth.service";
import { Response } from "express";
import { SessionService } from "src/auth/session/session.service";
import { SettingsService } from "src/settings/settings.types";
import { InitTwitchAuthDto } from "./twitch-auth.dto";
import { TwitchAuthExceptionsFilter } from "./twitch-auth.filter";

@UseFilters(TwitchAuthExceptionsFilter)
@Controller('auth/twitch')
export class TwitchAuthController {
  constructor(
    private readonly twitchAuthService: TwitchAuthService,
    private readonly sessionService: SessionService,
    private readonly settingsService: SettingsService,
  ) { }

  @Get('init')
  async init(
    @Query() query: InitTwitchAuthDto,
    @Res() res: Response,
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
  async callback(
    @Res() res: Response,
    @Query('code') code,
    @Query('error') twitchError,
    @Query('state') state,
    @Session() session,
  ) {
    const { successUrl, failUrl } = this.twitchAuthService.getRedirectUrlsFromCallback(state);
    try {
      if (twitchError) throw new ServiceUnavailableException(twitchError);
      const userId = this.sessionService.getUserId(session);
      if (userId) await this.twitchAuthService.linkProviderToAccount({ code, userId: Number(userId) });
      else {
        const user = await this.twitchAuthService.authenticate(code);
        console.log(user);
        this.sessionService.setUserId(session, user.id);
      }
      res.redirect(successUrl);
    } catch (err) {
      if (failUrl) res.redirect(failUrl);
      console.log('redirection from controller');
      throw err;
      // TODO: make better service errors handling 
      //  (OauthProviderWasAlreadyUsedError, IncorrectCallbackUrlError)
    }
  }
}

// 
  