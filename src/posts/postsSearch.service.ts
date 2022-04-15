import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Post } from './post.entity'
import { PostSearchBody } from './post.types'

@Injectable()
export default class PostsSearchService {
  index = 'posts'

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    const { author, categories, tags, parent, ...rest } = post
    return this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      document: {
        ...rest,
        author: author.firstName + ' ' + author.lastName,
        categories: categories.map((category) => category.title),
        tags: tags.map((tag) => tag.title),
        parent: parent.title,
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
              'categories',
              'tags',
            ],
          },
        },
      },
    })
    return hits.hits.map((item) => item._source)
  }
}
