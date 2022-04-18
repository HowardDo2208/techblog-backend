import { PostComment } from 'src/post-comments/entities/post-comment.entity'
import { User } from 'src/users/entities/user.entity'
import { JoinTable } from 'typeorm'
import { Category } from '../category/entities/category.entity'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Tag } from 'src/tag/entities/tag.entity'

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

  @Column({
    nullable: true,
  })
  public publishedAt: Date

  @Column()
  public content: string

  @OneToMany(() => PostComment, (comment) => comment.post)
  public comments: PostComment[]

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  public categories: Category[]

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  public tags: Tag[]
}
