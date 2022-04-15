import { Post } from 'src/posts/post.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column()
  public metaTitle: string

  @Column()
  public slug: string

  @Column()
  public summary: string

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable()
  public posts: Post[]
}
