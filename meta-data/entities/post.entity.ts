import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryPostEntity } from "./category-post.entity";
import { SharedProps } from "./shared-props.helper";
import { UserEntity } from "./user.entity";

@Entity({ name: 'posts' })
export class PostEntity extends SharedProps {
  constructor(body: string) {
    super();
    this.body = body
  }

  @PrimaryGeneratedColumn()
  private readonly id: number

  @Column({ type: 'text', nullable: false })
  body: string

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @OneToMany(() => CategoryPostEntity, (categoryPosts: CategoryPostEntity) => categoryPosts.post)
  categoryPosts: Array<CategoryPostEntity>
}
