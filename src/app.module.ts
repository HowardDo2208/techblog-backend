import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SearchModule } from './search/search.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module';
import { PostCommentsModule } from './post-comments/post-comments.module';

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    SearchModule,
    DatabaseModule,
    PostsModule,
    UsersModule,
    PostCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
