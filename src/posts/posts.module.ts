import { Module } from '@nestjs/common'
import Post from './post.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [TypeOrmModule, PostsService],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
