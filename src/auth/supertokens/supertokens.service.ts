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
    const google = ThirdPartyEmailPassword.Google({
      clientId:
        // '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
        configService.get('GOOGLE_CLIENT_ID'),
      clientSecret:
        // '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',
        configService.get('GOOGLE_CLIENT_SECRET'),
    })

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
            {
              ...google,
              get: function (
                redirectURI: string | undefined,
                authCodeFromRequest: string | undefined,
                userContext: any,
              ) {
                const getResult = google.get(
                  redirectURI,
                  authCodeFromRequest,
                  userContext,
                )
                return {
                  ...getResult,
                  getProfileInfo: async function (
                    authCodeResponse: any,
                    userContext: any,
                  ) {
                    try {
                      const result = await getResult.getProfileInfo(
                        authCodeResponse,
                        userContext,
                      )
                      console.log(result) //<- this one has my login details (id, email, verified)
                      return result
                    } catch (err) {
                      console.log(err)
                      throw err
                    }
                  },
                }
              },
            },
          ],
        }),
        Session.init(),
      ],
    })
  }
}
