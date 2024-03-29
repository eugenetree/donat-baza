import { Controller, Get, Query, Redirect, Res, ServiceUnavailableException, Session, UseFilters, UseInterceptors } from "@nestjs/common";
import { TwitchAuthService } from "./twitch-auth.service";
import { Response } from "express";
import { SessionService } from "src/auth/session/session.service";
import { InitTwitchAuthDto } from "./twitch-auth.dto";
import { TwitchAuthExceptionsFilter } from "./twitch-auth.filter";

@UseFilters(TwitchAuthExceptionsFilter)
@Controller('auth/twitch')
export class TwitchAuthController {
  constructor(
    private readonly twitchAuthService: TwitchAuthService,
    private readonly sessionService: SessionService,
  ) { }

  @Get('init')
  async init(
    @Query() query: InitTwitchAuthDto,
    @Res() res: Response,
  ) {
    const redirectUrl = this.twitchAuthService.getUrlToBeginAuth({
      successUrl: query.successUrl,
      failUrl: query.failUrl,
    })

    console.log('TwitchAuthController | init user auth, redirecting to: ', redirectUrl);
    res.redirect(redirectUrl);
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
        this.sessionService.setUserId(session, user.id);
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

// 
