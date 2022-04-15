import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Post } from './post.entity'
import { CreatePostDto, UpdatePostDto } from './post.types'
import PostsSearchService from './postsSearch.service'
import { Category } from '../category/entities/category.entity'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @Inject(PostsSearchService)
    private readonly postSearchService: PostsSearchService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id)
  }

  async create(post: CreatePostDto): Promise<Post> {
    const {
      parentId,
      title,
      metaTitle,
      slug,
      summary,
      published,
      content,
      categoryIds,
      tagIds,
    } = post

    const categories = await this.categoryRepository.findByIds(categoryIds)
    const tags = await this.categoryRepository.findByIds(tagIds)

    const newPost = this.postRepository.create({
      parent: parentId ? await this.postRepository.findOne(parentId) : null,
      title,
      metaTitle,
      slug,
      summary,
      published,
      content,
      categories,
      tags,
    })
    const result = await this.postRepository.save(newPost)
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
