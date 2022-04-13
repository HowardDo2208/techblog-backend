import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import  User  from './entities/user.entity';
import UsersSearchService from './usersSearch.service';
import { CreateUserDto, UpdateUserDto } from './entities/user.types';


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
    const result = await this.userRepository.save(user)
    this.userSearchService.indexUser(result)
    return result
  }

  update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user)
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
}














// @Injectable()
// export class UsersService {
//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all users`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
