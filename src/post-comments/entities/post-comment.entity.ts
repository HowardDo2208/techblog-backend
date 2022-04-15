import { Post } from 'src/posts/post.entity'
import { User } from 'src/users/entities/user.entity'
import { PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm'

export class PostComment {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => User, (user) => user.comments)
  public commenter: User

  @ManyToOne(() => Post, (post) => post.comments)
  public post: Post

  @ManyToOne(() => PostComment, (comment) => comment.childComments)
  public parent: Post

  @Column()
  public content: string

  @Column()
  public published: boolean

  @Column()
  public publishedAt: Date

  @OneToMany(() => PostComment, (comment) => comment.parent)
  public childComments: PostComment[]
}
