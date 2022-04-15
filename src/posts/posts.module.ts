import { Module } from '@nestjs/common'
import { Post } from './post.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SearchModule } from 'src/search/search.module'
import PostsSearchService from './postsSearch.service'
import { CategoryModule } from 'src/category/category.module'

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SearchModule, CategoryModule],
  exports: [TypeOrmModule, PostsService],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
