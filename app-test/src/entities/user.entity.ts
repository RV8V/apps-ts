import { Entity, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, classToPlain } from 'class-transformer'
import { IsEmail,  } from 'class-validator'
import { AbstractEntity } from './abstract-entity'
import * as bcrypt from 'bcryptjs'
import { ArticleEntity } from './article.entity'
import { CommentEntity } from './comment.entity'

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude()
  password: string

  @Column({ default: '' })
  bio: string

  @Column({ default: null, nullable: true })
  image: string | null

  @ManyToMany(
    type => ArticleEntity,
    article => article.favoritedBy
  )
  @JoinColumn()
  favorites: ArticleEntity[]

  @OneToMany( // one user to many articles
    type => ArticleEntity,
    article => article.author
  )
  articles: ArticleEntity[]

  @ManyToMany(
    type => UserEntity,
    user => user.followee
  )
  @JoinTable()
  followers: UserEntity[]

  @ManyToMany(
    type => UserEntity,
    user => user.followers
  )
  followee: UserEntity[]

  @ManyToOne(
    type => CommentEntity,
    comment => comment.author
  )
  comments: CommentEntity[]

  @BeforeInsert()
  async hash() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password)
  }

  toJson() {
    return classToPlain(this)
  }

  toProfile(user?: UserEntity) {
    let following = null
    if (user) following = this.followers.includes(user)
    const profile: any = this.toJson()
    delete profile.followers // remove array of followers and add boolean flag
    return { ...profile, following }
  }
}