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
      isGlobal: true,
    }),
    AuthModule.forRoot(),
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
