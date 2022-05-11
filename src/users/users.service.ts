import { Inject, Injectable } from '@nestjs/common'
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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(UsersSearchService)
    private readonly userSearchService: UsersSearchService,
    private cloudinaryService: CloudinaryService,
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
}
