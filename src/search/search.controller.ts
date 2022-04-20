import { Body, Controller, Post } from '@nestjs/common'
import { SearchService } from './search.service'
import { SearchBody } from './search.types'

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  async search(@Body() body: SearchBody) {
    return await this.searchService.search(body)
  }
}
