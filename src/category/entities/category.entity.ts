import { Post } from 'src/posts/post.entity'
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

export class Category {
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

  @ManyToMany(() => Post, (post) => post.categories)
  @JoinTable()
  public posts: Post[]
}
