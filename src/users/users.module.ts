import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import UsersSearchService from './usersSearch.service'
import { SearchModule } from 'src/search/search.module'
import { PostsModule } from 'src/posts/posts.module'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), SearchModule, CloudinaryModule],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, UsersSearchService],
})
export class UsersModule {}
