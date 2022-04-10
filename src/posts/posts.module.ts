import { Module } from '@nestjs/common'
import Post from './post.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SearchModule } from 'src/search/search.module'
import PostsSearchService from './postsSearch.service'

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SearchModule],
  exports: [TypeOrmModule, PostsService],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
