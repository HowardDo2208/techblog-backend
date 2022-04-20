import { Post } from 'src/posts/post.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PostComment } from '../../post-comments/entities/post-comment.entity'

@Entity({ name: 'user_account' })
export class User {
  @PrimaryColumn()
  public id: string

  @Column({
    nullable: true,
  })
  public firstName: string

  @Column({
    nullable: true,
  })
  public lastName: string

  @Column({
    nullable: true,
  })
  public mobile: string

  @Column()
  public email: string

  @Column({
    nullable: true,
  })
  public registeredAt: Date

  @Column({
    nullable: true,
  })
  public lastLoginAt: Date

  @Column({
    nullable: true,
  })
  public intro: string

  @Column({
    nullable: true,
  })
  public profile: string

  @OneToMany(() => Post, (post) => post.author)
  public posts: Post[]

  @OneToMany(() => PostComment, (comment) => comment.commenter)
  public comments: PostComment[]
}
