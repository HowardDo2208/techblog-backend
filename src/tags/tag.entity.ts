import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column('text', { default: [], array: true })
  public followers: string[]
}
