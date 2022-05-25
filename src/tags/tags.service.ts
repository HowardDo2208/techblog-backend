import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostsService } from 'src/posts/posts.service'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => PostsService))
    private readonly postService: PostsService,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find()
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOne(id)
  }

  async create(tags: string[]) {
    tags.forEach(async (name) => {
      const foundTag = await this.tagRepository.findOne({ name })
      if (!foundTag) {
        await this.tagRepository.save(this.tagRepository.create({ name }))
      }
    })
  }

  async findPostsByTag(tag: string) {
    return this.postService.findPostsWithTagName(tag)
  }

  async findAllTags() {
    return this.tagRepository.find({ order: { followers: 'DESC' } })
  }
}
