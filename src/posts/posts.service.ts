import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { TagsService } from 'src/tags/tags.service'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Post } from './post.entity'
import { CreatePostDto, UpdatePostDto } from './post.types'
import PostsSearchService from './postsSearch.service'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @Inject(PostsSearchService)
    private readonly postSearchService: PostsSearchService,
    private cloudinary: CloudinaryService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(TagsService)
    private readonly tagsService: TagsService,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['author', 'comments'],
    })
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id, {
      relations: ['author', 'comments'],
    })
  }

  async create(post: CreatePostDto): Promise<Post> {
    const {
      userId,
      parentId,
      title,
      published = true,
      body,
      tags,
      image,
    } = post
    const uploadedImage = await this.cloudinary.uploadImage(image)
    const author = await this.usersService.findOne(userId)
    const parsedTags = JSON.parse(tags)

    const newPost = this.postRepository.create({
      parent: parentId ? await this.postRepository.findOne(parentId) : null,
      title,
      slug: post.title.toLowerCase().replace(/\s/g, '-'),
      published,
      body,
      tags: JSON.parse(tags),
      image: uploadedImage.url,
      date: new Date(),
      author,
    })
    const result = await this.postRepository.save(newPost)
    await this.tagsService.create(parsedTags)
    this.postSearchService.indexPost(result)
    return result
  }

  update(id: number, post: UpdatePostDto): Promise<UpdateResult> {
    return this.postRepository.update(id, post)
  }

  async delete(id: number) {
    await this.postRepository.delete(id)
    await this.postSearchService.deleteDoc(id)
  }

  async deleteAll() {
    await this.postSearchService.deleteAllDocs()
    console.log('deleted all docs')
    await this.postRepository.delete({})
  }

  async like(id: number, userId: string): Promise<Post> {
    const post = await this.findOne(id)
    if (post.likes.includes(userId)) {
      throw new BadRequestException('You already liked this post')
    }
    post.likes.push(userId)
    const result = await this.postRepository.save(post)
    return result
  }

  async unlike(id: number, userId: string): Promise<Post> {
    const post = await this.findOne(id)
    if (!post.likes.includes(userId)) {
      throw new BadRequestException('You already unliked this post')
    }
    post.likes = post.likes.filter((like) => like !== userId)
    const result = await this.postRepository.save(post)
    return result
  }

  async bookmark(id: number, userId: string) {
    const post = await this.postRepository.findOne(id)
    post.bookmarks.push(userId)
    await this.usersService.addToReadingList(userId, id)
    await this.postRepository.save(post)
  }

  async findByIds(ids: number[]): Promise<Post[]> {
    return await this.postRepository.findByIds(ids, {
      relations: ['author', 'comments'],
    })
  }

  async findPostsWithTagName(tag: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { tags: [tag] },
      relations: ['author', 'comments'],
    })
  }
}
