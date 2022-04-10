import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import Post from './post.entity'
import { CreatePostDto, UpdatePostDto } from './post.types'
import PostsSearchService from './postsSearch.service'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @Inject(PostsSearchService)
    private readonly postSearchService: PostsSearchService,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id)
  }

  async create(post: CreatePostDto): Promise<Post> {
    const result = await this.postRepository.save(post)
    this.postSearchService.indexPost(result)
    return result
  }

  update(id: number, post: UpdatePostDto): Promise<UpdateResult> {
    return this.postRepository.update(id, post)
  }

  delete(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id)
  }
}
