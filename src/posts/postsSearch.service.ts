import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Post } from './post.entity'
import { PostSearchBody } from './post.types'

@Injectable()
export default class PostsSearchService {
  index = 'posts'

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    const { author, tags, parent, body, ...rest } = post
    return this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      document: {
        ...rest,
        author,
        tags,
        body,
        parent: parent ? parent.title : '',
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
            fields: [
              'title',
              'metaTitle',
              'slug',
              'summary',
              'content',
              'author',
              'parent',
              'tags',
            ],
          },
        },
      },
    })
    return hits.hits.map((item) => item._source)
  }

  async deleteAllDocs() {
    return this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
      },
    })
  }
}
