import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { CategoryEntity } from './category.entity';
import { PostEntity } from './post.entity';
import { SharedProps } from './shared-props.helper';

@Entity({ name: 'categories_posts' })
export class CategoryPostEntity extends SharedProps {
  constructor(someColumn: string, post: PostEntity, category: CategoryEntity) {
    super()
    this.someColumn = someColumn
    this.post = post
    this.category = category
  }

  @PrimaryGeneratedColumn()
  private readonly id: number

  @Column({ name: 'some_column', default: null })
  someColumn: string

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.categoryPosts)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.categoryPosts)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity
}
