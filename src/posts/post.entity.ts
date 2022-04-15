import { PostComment } from 'src/post-comments/entities/post-comment.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => User, (user) => user.posts)
  public author: User

  @OneToOne(() => Post, (post) => post.child)
  public parent: Post

  @OneToOne(() => Post, (post) => post.parent)
  public child: Post

  @Column()
  public title: string

  @Column()
  public metaTitle: string

  @Column()
  public slug: string

  @Column()
  public summary: string

  @Column()
  public published: boolean

  @Column()
  public publishedAt: Date

  @Column()
  public content: string

  @OneToMany(() => PostComment, (comment) => comment.post)
  public comments: PostComment[]
}
