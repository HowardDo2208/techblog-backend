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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(UsersSearchService)
    private readonly userSearchService: UsersSearchService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create({
      ...user,
      registeredAt: new Date(),
    })
    const result = await this.userRepository.save(newUser)
    await this.userSearchService.indexUser(result)
    return result
  }

  update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    const result = this.userRepository.update(id, user)
    //update elasticsearch document
    return result
  }

  delete(id: number): Promise<DeleteResult> {
    const result = this.userRepository.delete(id)
    //delete elasticsearch index document
    return result
  }

  async search(text: string): Promise<UserSearchBody[]> {
    const result = await this.userSearchService.searchUser(text)
    return result
  }
}
