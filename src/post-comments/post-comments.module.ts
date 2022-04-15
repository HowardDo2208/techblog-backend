import { Module } from '@nestjs/common'
import { PostCommentsService } from './post-comments.service'
import { PostCommentsController } from './post-comments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostComment } from './entities/post-comment.entity'
import { SearchModule } from 'src/search/search.module'

@Module({
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
  imports: [TypeOrmModule.forFeature([PostComment]), SearchModule],
  exports: [TypeOrmModule, PostCommentsService],
})
export class PostCommentsModule {}
