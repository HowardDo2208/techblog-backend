import { Module } from '@nestjs/common'
import { Post } from './post.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SearchModule } from 'src/search/search.module'
import PostsSearchService from './postsSearch.service'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import UsersSearchService from 'src/users/usersSearch.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    SearchModule,
    CloudinaryModule,
    UsersModule,
  ],
  exports: [TypeOrmModule, PostsService],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsSearchService,
    UsersService,
    UsersSearchService,
  ],
})
export class PostsModule {}
