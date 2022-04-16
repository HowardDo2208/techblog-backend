import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SearchModule } from './search/search.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { PostCommentsModule } from './post-comments/post-comments.module'
import { CategoryModule } from './category/category.module'
import { TagModule } from './tag/tag.module'
import { AuthModule } from './auth/auth.module'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI:
        'https://45b8e221bd3a11ecb9d523baaed2f04f-ap-southeast-1.aws.supertokens.io:3572',
      apiKey: '0yNQ9HMNW5Rv8M9ZdyRuWZu6ZXpMH=',
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'techblog',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3080',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    SearchModule,
    DatabaseModule,
    PostsModule,
    UsersModule,
    PostCommentsModule,
    CategoryModule,
    TagModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
