import { Inject, Injectable } from '@nestjs/common'
import supertokens from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import { ConfigService } from '@nestjs/config'
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class SupertokensService {
  constructor(
    private configService: ConfigService,
    @Inject(UsersService) private usersService: UsersService,
  ) {
    const appInfo = {
      appName: configService.get('APP_NAME'),
      websiteDomain: configService.get('WEBSITE_DOMAIN'),
      websiteBasePath: '/auth',
      apiDomain: configService.get('API_DOMAIN'),
      apiBasePath: '/auth',
    }

    supertokens.init({
      appInfo,
      supertokens: {
        connectionURI: configService.get('SUPERTOKENS_CONNECTION_URI'),
        apiKey: configService.get('SUPERTOKENS_API_KEY'),
      },
      recipeList: [
        ThirdPartyEmailPassword.init({
          providers: [
            ThirdPartyEmailPassword.Google({
              clientId: configService.get('GOOGLE_CLIENT_ID'),
              clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            }),
          ],
        }),
        Session.init(),
      ],
    })
  }
}
