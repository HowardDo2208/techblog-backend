import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePostCommentDto } from './dto/create-post-comment.dto'
import { UpdatePostCommentDto } from './dto/update-post-comment.dto'
import { PostComment } from './entities/post-comment.entity'

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private commentRepository: Repository<PostComment>,
  ) {}
  create(createPostCommentDto: CreatePostCommentDto) {
    return 'This action adds a new postComment'
  }

  findAll() {
    return `This action returns all postComments`
  }

  findOne(id: number) {
    return `This action returns a #${id} postComment`
  }

  findPostComments(id: number) {
    return this.commentRepository.find({ post: { id } })
  }

  update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    return `This action updates a #${id} postComment`
  }

  remove(id: number) {
    return `This action removes a #${id} postComment`
  }
}
