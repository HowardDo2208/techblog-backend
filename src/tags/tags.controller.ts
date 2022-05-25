import { Controller, Get, Param } from '@nestjs/common'
import { TagsService } from './tags.service'

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('/:tag')
  async postsOfTag(@Param('tag') tag: string) {
    return this.tagsService.findPostsByTag(tag)
  }

  @Get()
  async allTags() {
    return this.tagsService.findAll()
  }
}
