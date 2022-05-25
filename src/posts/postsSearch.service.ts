import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Post } from './post.entity'
import { PostSearchBody } from './post.types'
import { PostsService } from './posts.service'

@Injectable()
export default class PostsSearchService {
  index = 'posts'

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async indexPost(post: Post) {
    const { author, tags, parent, body, ...rest } = post
    return this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      document: {
        ...rest,
        author: `${author.email} ${author.name}`,
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
              'title^5',
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
    const postIds = hits.hits.map((item) => item._source.id)
    console.log('postIds', postIds)
    return await this.postRepository.find({
      where: { id: In(postIds) },
      relations: ['author', 'comments'],
    })
  }

  async deleteDoc(id: number) {
    return this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id,
          },
        },
      },
    })
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
