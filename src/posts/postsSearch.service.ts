import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import Post from './post.entity'
import { PostSearchBody } from './post.types'

@Injectable()
export default class PostsSearchService {
  index = 'posts'

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    return this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      document: {
        id: post.id,
        title: post.title,
        content: post.content,
      },
    })
  }

  async searchPosts(text: string) {
    const { hits } = await this.elasticsearchService.search<PostSearchBody>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content'],
          },
        },
      },
    })
    return hits.hits.map((item) => item._source)
  }
}
