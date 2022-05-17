import { Post } from 'src/posts/post.entity'
import { User } from 'src/users/entities/user.entity'
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  Entity,
} from 'typeorm'

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => User, (user) => user.comments)
  public author: User

  @ManyToOne(() => Post, (post) => post.comments)
  public parentPost: Post

  @ManyToOne(() => PostComment, (comment) => comment.childrenComments, {
    onDelete: 'CASCADE',
  })
  public parentComment: PostComment

  @Column()
  public body: string

  @Column()
  public published: boolean

  @Column()
  public publishedAt: Date

  @OneToMany(() => PostComment, (comment) => comment.parentComment)
  public childrenComments: PostComment[]
}
