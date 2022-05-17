import { Post } from 'src/posts/post.entity'
import {
  Column,
  Entity,
  ManyToMany,
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
  public name: string

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
  public bio: string

  @Column({
    nullable: true,
  })
  public location: string

  @Column({
    nullable: true,
  })
  public links: string

  @Column({
    nullable: true,
  })
  public work: string

  @Column('timestamp', {
    nullable: true,
  })
  public doB: Date

  @Column({
    nullable: true,
  })
  public avatar: string

  @Column('text', { default: [], array: true })
  public followedTags: string[]

  @Column({
    nullable: true,
  })
  public profile: string

  @OneToMany(() => Post, (post) => post.author)
  public posts: Post[]

  @OneToMany(() => PostComment, (comment) => comment.author)
  public comments: PostComment[]

  @ManyToMany(() => Post, (post) => post.likes)
  public likedPosts: Post[]

  @Column('int', { default: [], array: true })
  public readingList: number[]

  @Column('int', { default: [], array: true })
  public likedPostsIds: number[]

  @Column('int', { default: [], array: true })
  public unicornPosts: number[]

  @Column('int', { default: [], array: true })
  public followers: string[]

  @Column('int', { default: [], array: true })
  public following: string[]

  @Column({ nullable: true })
  public skills: string
}
