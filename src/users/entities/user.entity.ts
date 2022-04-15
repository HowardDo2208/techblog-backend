import { Post } from 'src/posts/post.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PostComment } from '../../post-comments/entities/post-comment.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public mobile: string

  @Column()
  public email: string

  @Column()
  public passwordHash: string

  @Column()
  public registeredAt: Date

  @Column()
  public lastLoginAt: Date

  @Column()
  public intro: string

  @Column()
  public profile: string

  @OneToMany(() => Post, (post) => post.author)
  public posts: Post[]

  @OneToMany(() => PostComment, (comment) => comment.commenter)
  public comments: PostComment[]
}
