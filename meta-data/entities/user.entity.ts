import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PostEntity } from "./post.entity";
import { SharedProps } from "./shared-props.helper";

@Entity({ name: 'users' })
export class UserEntity extends SharedProps {
  constructor(
    firstName: string,
    lastName: string,
    isActive: boolean,
    birth: Date,
    password: string,
    email: string
  ) {
    super();
    this.firstName = firstName,
    this.lastName = lastName,
    this.isActive = isActive,
    this.birth = birth,
    this.password = password,
    this.email = email
  }

  @PrimaryGeneratedColumn()
  private readonly id: number

  @Column({ name: 'first_name', nullable: false })
  firstName: string

  @Column({ name: 'last_name', nullable: false })
  lastName: string

  @Column({ name: 'is_active', nullable: false })
  isActive: boolean

  @Column({ name: 'is_active', nullable: false })
  someColumn: boolean

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  birth: Date

  @Column({ name: 'password', nullable: false })
  password: string

  @Column({ name: 'email', nullable: false })
  email: string

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  posts: PostEntity[]
}
