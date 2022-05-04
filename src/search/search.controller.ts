import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from './search.service'
import { SearchBody } from './search.types'

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() { _q }: SearchBody) {
    return await this.searchService.search({ _q })
  }

  @Get('/posts')
  async searchPosts(@Query() { _q }: SearchBody) {
    return await this.searchService.searchPost({ _q })
  }

  @Get('/users')
  async searchUsers(@Query() { _q }: SearchBody) {
    return await this.searchService.searchUser({ _q })
  }
}
