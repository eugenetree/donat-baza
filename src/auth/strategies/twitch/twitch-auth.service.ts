import { Injectable, Param } from '@nestjs/common';
import { OauthProvidersService } from 'src/oauth-providers/oauth-providers.service';
import { SettingsService } from 'src/settings/settings.service';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { IncorrectCallbackUrlError } from './twitch-auth.errors';
import { TwitchAuthRepository } from './twitch-auth.repository';

@Injectable()
export class TwitchAuthService {
  twitchId = this.settingsService.getTwitchClientId();
  twitchSecret = this.settingsService.getTwitchClientSecret();

  constructor(
    private settingsService: SettingsService,
    private usersService: UsersService,
    private oauthProvidersService: OauthProvidersService,
    private twitchAuthRepository: TwitchAuthRepository,
  ) { }


  public getUrlToBeginAuth = (
    { successUrl, failUrl }: { successUrl: string; failUrl: string; }
  ): string => {
    return 'https://id.twitch.tv/oauth2/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: this.twitchId,
        redirect_uri: this.getRedirectUrl(),
        scope: 'user:read:email',
        state: `successUrl=${successUrl}&failUrl=${failUrl}`,
      })
  }


  public getRedirectUrlsFromCallback = (state: string): { successUrl: string; failUrl: string } => {
    const urlParams = new URLSearchParams(state);
    const successUrl = urlParams.get('successUrl');
    const failUrl = urlParams.get('failUrl');

    if (!successUrl || !failUrl) {
      throw new IncorrectCallbackUrlError();
    }

    return {
      successUrl,
      failUrl,
    }
  }


  public authenticate = async (code: string): Promise<UserEntity> => {
    console.log('TwitchAuthService | requesting user tokens and data by code: ', code);
    const { accessToken, refreshToken, profile } = await this.twitchAuthRepository.getDataByOauthCode(code);
    
    const user = await this.usersService.findOneByOauthProvider({ profileId: profile.id });
    console.log('TwitchAuthService | user was found', user);
    if (user) return user;

    const createdUser = await this.usersService.createWithOauth({
      accessToken,
      refreshToken,
      oauthProviderProfileId: profile.id,
      type: 'twitch'
    })
    console.log('TwitchAuthService | new user was created', createdUser);
    return createdUser;
  }


  public linkProviderToAccount = async ({ code, userId }: { code: string; userId: number }) => {
    const { accessToken, refreshToken, profile } = await this.twitchAuthRepository.getDataByOauthCode(code)
    return this.oauthProvidersService.create({
      accessToken,
      refreshToken,
      profileId: profile.id,
      type: 'twitch',
      userId,
    })
  };

  private getRedirectUrl = () => {
    const host = this.settingsService.getEnv() === 'development' ? 'http://localhost:3000' : this.settingsService.getBackAppUrl()
    return `${host}/auth/twitch/callback`;
  }
}