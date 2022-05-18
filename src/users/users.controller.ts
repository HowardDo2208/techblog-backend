import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import { DEFAULT_AVATAR } from 'src/constants/constants'

//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

import { CreateUserDto, UpdateUserDto } from './entities/user.types'
import { UsersService } from './users.service'
//import { UsersService } from './entities/user.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @UploadedFile() avatar,
    @Body() updateUserDto: any,
  ) {
    return this.usersService.update(id, updateUserDto, avatar)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id)
  }

  @Put('follow')
  @UseGuards(AuthGuard)
  async follow(
    @Body() { userId, followId }: { userId: string; followId: string },
  ) {
    return await this.usersService.follow(userId, followId)
  }

  @Put('unfollow')
  @UseGuards(AuthGuard)
  async unfollow(
    @Body() { userId, followId }: { userId: string; followId: string },
  ) {
    return await this.usersService.unfollow(userId, followId)
  }

  @Get(':id/bookmarks')
  @UseGuards(AuthGuard)
  async getBookmarks(@Param('id') id: string) {
    return await this.usersService.getReadingList(id)
  }
}
