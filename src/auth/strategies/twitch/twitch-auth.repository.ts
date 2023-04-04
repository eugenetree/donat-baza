import { Injectable } from "@nestjs/common";
import axios from "axios";
import { SettingsService } from "src/settings/settings.service";

@Injectable()
export class TwitchAuthRepository {
  constructor(private settingsService: SettingsService) { }

  twitchId = this.settingsService.getTwitchClientId();
  twitchSecret = this.settingsService.getTwitchClientSecret();

  async getDataByOauthCode(code: string): Promise<{ accessToken: string; refreshToken: string; profile: any; }> {
    const tokensResponse = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: this.twitchId,
      client_secret: this.twitchSecret,
      code,
      // redirectUrl is needed only to match oauth2 requirements,
      // when request is going through axios - there is no redirect
      redirect_uri: 'http://localhost:3000',
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
}