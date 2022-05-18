import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FormDataRequest } from 'nestjs-form-data'
import { AuthGuard } from 'src/auth/auth.guard'
import { SearchBody } from 'src/search/search.types'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { CreatePostDto, UpdatePostDto } from './post.types'
import { PostsService } from './posts.service'
import PostsSearchService from './postsSearch.service'

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsSearchService: PostsSearchService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Session() session: SessionContainer,
    @UploadedFile() image,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = session.getUserId()
    return this.postsService.create({ ...createPostDto, image, userId })
  }

  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @Get('/search')
  search(@Query() { _q }: SearchBody) {
    return this.postsSearchService.searchPosts(_q)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete('deleteAll')
  removeAll() {
    this.postsService.deleteAll()
    this.postsSearchService.deleteAllDocs()
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.delete(id)
  }

  @Put(':id/like')
  @UseGuards(AuthGuard)
  async like(@Param('id') id: number, @Session() session: SessionContainer) {
    const userId = session.getUserId()
    await this.postsService.like(id, userId)
  }

  @Put(':id/unlike')
  @UseGuards(AuthGuard)
  async unlike(@Param('id') id: number, @Session() session: SessionContainer) {
    const userId = session.getUserId()
    await this.postsService.unlike(id, userId)
  }
}
