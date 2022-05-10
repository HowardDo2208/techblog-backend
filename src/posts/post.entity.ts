import { PostComment } from 'src/post-comments/entities/post-comment.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  ManyToMany,
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

  @Column({
    nullable: true,
  })
  public metaTitle: string

  @Column({
    nullable: true,
  })
  public slug: string

  @Column({
    nullable: true,
  })
  public summary: string

  @Column()
  public published: boolean

  @Column('timestamp', {
    nullable: true,
  })
  public publishedAt: Date

  @Column()
  public body: string

  @Column('text', { array: true, default: [] })
  public tags: string[]

  @Column({ nullable: true })
  public image: string

  @OneToMany(() => PostComment, (comment) => comment.post)
  public comments: PostComment[]
}
