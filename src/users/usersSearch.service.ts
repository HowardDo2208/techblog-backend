import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { User } from './entities/user.entity'
import { UserSearchBody } from './entities/user.types'
import _ from 'lodash'
import { PostsService } from 'src/posts/posts.service'

@Injectable()
export default class UsersSearchService {
  index = 'users'

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexNewUser(user: User) {
    const { id, email } = user
    return this.elasticsearchService.index<UserSearchBody>({
      index: this.index,
      document: {
        id,
        email,
      },
    })
  }

  async searchUser(text: string) {
    const { hits } = await this.elasticsearchService.search<UserSearchBody>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            // fields: ['id', 'firstName', 'lastName', 'email', 'mobile', 'intro'],
          },
        },
      },
    })
    return hits.hits.map((item) => item._source)
  }
}
