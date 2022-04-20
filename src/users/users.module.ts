import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import UsersSearchService from './usersSearch.service'
import { SearchModule } from 'src/search/search.module'
import { PostsModule } from 'src/posts/posts.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), SearchModule, PostsModule],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, UsersSearchService],
})
export class UsersModule {}
