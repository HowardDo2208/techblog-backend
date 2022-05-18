import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import UsersSearchService from './usersSearch.service'
import {
  CreateUserDto,
  UpdateUserDto,
  UserSearchBody,
} from './entities/user.types'
import { DEFAULT_AVATAR } from 'src/constants/constants'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { PostsService } from 'src/posts/posts.service'
import { Post } from 'src/posts/post.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(UsersSearchService)
    private readonly userSearchService: UsersSearchService,
    private cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => PostsService))
    private postService: PostsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const res = await this.userRepository.findOne(id, {
      relations: ['posts', 'posts.author', 'posts.comments', 'comments'],
    })

    return res
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create({
      ...user,
      avatar: DEFAULT_AVATAR,
      registeredAt: new Date(),
    })
    const result = await this.userRepository.save(newUser)
    await this.userSearchService.indexNewUser(result)
    return result
  }

  async update(
    id: string,
    patch: Partial<Omit<User, 'email' | 'id'>>,
    avatar?: any,
  ): Promise<User> {
    if (avatar) {
      const uploadRes = await this.cloudinaryService.uploadImage(avatar)
      patch.avatar = uploadRes.url
    }
    const result = await this.userRepository.update(id, { ...patch })
    const updatedUser = await this.userRepository.findOne(id)
    //update elasticsearch document
    return updatedUser
  }

  delete(id: string): Promise<DeleteResult> {
    const result = this.userRepository.delete(id)
    //delete elasticsearch index document
    return result
  }

  async search(text: string): Promise<UserSearchBody[]> {
    const result = await this.userSearchService.searchUser(text)
    return result
  }

  async addToReadingList(userId: string, postId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId)
    user.readingList.push(postId)
    const result = await this.userRepository.save(user)
    return result
  }

  async follow(userId: string, userToFollowId: string) {
    const user = await this.userRepository.findOne(userId)
    console.log('user', user)
    user.following.push(userToFollowId)
    await this.userRepository.save(user)

    const userToFollow = await this.userRepository.findOne(userToFollowId)
    userToFollow.followers.push(userId)
    await this.userRepository.save(userToFollow)
  }

  async unfollow(userId: string, userToUnfollowId: string) {
    const user = await this.userRepository.findOne(userId)
    user.following = user.following.filter(
      (id: string) => id !== userToUnfollowId,
    )
    await this.userRepository.save(user)

    const userToUnfollow = await this.userRepository.findOne(userToUnfollowId)
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id: string) => id !== userId,
    )
    await this.userRepository.save(userToUnfollow)
  }

  async getReadingList(userId: string): Promise<Post[]> {
    const user = await this.userRepository.findOne(userId)
    const { readingList } = user
    const posts = await this.postService.findByIds(readingList)
    return posts
  }
}
