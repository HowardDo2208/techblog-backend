import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsModule } from 'src/posts/posts.module'
import { Tag } from './tag.entity'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), forwardRef(() => PostsModule)],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TypeOrmModule, TagsService],
})
export class TagsModule {}
