import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SearchModule } from 'src/search/search.module'
import { Tag } from './entities/tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), SearchModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TypeOrmModule, TagService],
})
export class TagModule {}
