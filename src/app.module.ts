import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SearchModule } from './search/search.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { PostCommentsModule } from './post-comments/post-comments.module'
import { AuthModule } from './auth/auth.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { TagsModule } from './tags/tags.module'

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
    AuthModule,
    CloudinaryModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
