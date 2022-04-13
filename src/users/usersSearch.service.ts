import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import User from './entities/user.entity'
import { UserSearchBody } from './entities/user.types'

@Injectable()
export default class UsersSearchService {
  index = 'users'

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexUser(user: User) {
    return this.elasticsearchService.index<UserSearchBody>({
      index: this.index,
      document: {
        id: user.id,
        name: user.name,
        email: user.email,
        password : user.password,
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
            fields: ['email', 'password'],
          },
        },
      },
    })
    return hits.hits.map((item) => item._source)
  }
}
