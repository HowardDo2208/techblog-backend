import { Inject, Injectable } from '@nestjs/common'
import supertokens, { deleteUser } from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import { ConfigService } from '@nestjs/config'
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class SupertokensService {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const appInfo = {
      appName: this.configService.get('APP_NAME'),
      websiteDomain: this.configService.get('WEBSITE_DOMAIN'),
      websiteBasePath: '/auth',
      apiDomain: this.configService.get('API_DOMAIN'),
      apiBasePath: '/auth',
    }

    supertokens.init({
      appInfo,
      supertokens: {
        connectionURI: this.configService.get('SUPERTOKENS_CONNECTION_URI'),
        apiKey: this.configService.get('SUPERTOKENS_API_KEY'),
      },
      recipeList: [
        ThirdPartyEmailPassword.init({
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                thirdPartySignInUp: async function (input) {
                  const result =
                    await originalImplementation.thirdPartySignInUp(input)
                  if (result.status === 'OK' && result.createdNewUser) {
                    //create on database
                    const { id, email } = result.user
                    const postgresUser = await usersService.create({
                      id,
                      email,
                    })
                    console.log('postgresUser', postgresUser)
                    if (!postgresUser) {
                      await deleteUser(result.user.id)
                      throw new Error('Failed to create user in postgres')
                    }
                  }
                  return result
                },
                // ...
                // TODO: override more functions
              }
            },
          },
          providers: [
            ThirdPartyEmailPassword.Google({
              clientId: this.configService.get('GOOGLE_CLIENT_ID'),
              clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
            }),
          ],
        }),
        Session.init(),
      ],
    })
  }
}
