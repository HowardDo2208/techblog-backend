import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { SearchBody } from './search.types'
import * as _ from 'lodash'

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search({ _q }: SearchBody) {
    const { hits } = await this.elasticsearchService.search<SearchBody>({
      body: {
        query: {
          multi_match: {
            query: _q,
          },
        },
      },
    })
    return _.groupBy(
      hits.hits.map((item) => ({
        ...item._source,
        index: item._index,
      })),
      'index',
    )
  }

  async searchPost({ _q }: SearchBody) {
    const { hits } = await this.elasticsearchService.search<SearchBody>({
      index: 'posts',
      body: {
        query: {
          multi_match: {
            query: _q,
          },
        },
      },
    })
    return hits.hits.map((item) => ({
      ...item._source,
      index: item._index,
    }))
  }

  async searchUser({ _q }: SearchBody) {
    const { hits } = await this.elasticsearchService.search<SearchBody>({
      index: 'users',
      body: {
        query: {
          multi_match: {
            query: _q,
          },
        },
      },
    })
    return hits.hits.map((item) => ({
      ...item._source,
      index: item._index,
    }))
  }
}
