import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostsService } from 'src/posts/posts.service'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { CreatePostCommentDto } from './dto/create-post-comment.dto'
import { UpdatePostCommentDto } from './dto/update-post-comment.dto'
import { PostComment } from './entities/post-comment.entity'

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private commentRepository: Repository<PostComment>,
    private usersService: UsersService,
  ) {}
  async create(createPostCommentDto: CreatePostCommentDto) {
    const { author, body, parentId, parentPost } = createPostCommentDto
    const commentor = await this.usersService.findOne(author)
    const newComment = this.commentRepository.create({
      author: commentor,
      parentPost: { id: parentPost },
      body,
      parentComment: parentId ? { id: parentId } : null,
      published: true,
      publishedAt: new Date(),
    })

    const result = await this.commentRepository.save(newComment)
    return result
  }

  findAll() {
    return `This action returns all postComments`
  }

  findOne(id: number) {
    return `This action returns a #${id} postComment`
  }

  findPostComments(id: number) {
    return this.commentRepository.find({
      where: {
        parentPost: { id },
      },
      relations: ['parentComment', 'author'],
      order: {
        publishedAt: 'DESC',
      },
    })
  }

  update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    return `This action updates a #${id} postComment`
  }

  remove(id: number) {
    return this.commentRepository.delete(id)
  }
}
