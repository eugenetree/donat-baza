import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OauthProvidersService } from 'src/oauth-providers/oauth-providers.service';
import { SettingsService } from 'src/settings/settings.types';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { IncorrectCallbackUrlError } from './twitch-auth.errors';

@Injectable()
export class TwitchAuthService {
  twitchId = this.settingsService.twitchClientId;
  twitchSecret = this.settingsService.twitchClientSecret;

  constructor(
    private settingsService: SettingsService,
    private usersService: UsersService,
    private oauthProvidersService: OauthProvidersService,
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
    const { accessToken, refreshToken, profile } = await this.getDataByOauthCode(code);
    const user = await this.usersService.findFirst({ oauthProviders: { profileId: profile.id } });
    if (user) return user;

    return this.usersService.createWithOauth({
      accessToken,
      refreshToken,
      oauthProviderProfileId: profile.id,
      type: 'twitch'
    })
  }


  public linkProviderToAccount = async ({ code, userId }: { code: string; userId: number }) => {
    const { accessToken, refreshToken, profile } = await this.getDataByOauthCode(code)
    return this.oauthProvidersService.create({
      accessToken,
      refreshToken,
      profileId: profile.id,
      type: 'twitch',
      userId,
    })
  };


  private getDataByOauthCode = async (code: string): Promise<{ accessToken: string; refreshToken: string; profile: any; }> => {
    const tokensResponse = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: this.twitchId,
      client_secret: this.twitchSecret,
      code,
      // redirectUrl is needed only to match oauth2 requirements,
      // when request is going through axios - there is no redirect
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
    })

    const accessToken = tokensResponse.data.access_token;
    const refreshToken = tokensResponse.data.refresh_token;

    const usersResponse = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': this.twitchId,
      }
    });

    const profile = usersResponse.data.data[0];

    return {
      accessToken,
      refreshToken,
      profile,
    }
  }


  private getRedirectUrl = () => {
    return `${this.settingsService.backAppUrl}/auth/twitch/callback`;
  }
}