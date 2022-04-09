import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import Post from './post.entity'
import { CreatePostDto, UpdatePostDto } from './post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id)
  }

  create(post: CreatePostDto): Promise<Post> {
    return this.postRepository.save(post)
  }

  update(id: number, post: UpdatePostDto): Promise<UpdateResult> {
    return this.postRepository.update(id, post)
  }

  delete(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id)
  }
}
