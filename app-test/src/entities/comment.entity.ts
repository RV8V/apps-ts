import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { AbstractEntity } from './abstract-entity'
import { UserEntity } from './user.entity'
import { classToPlain } from 'class-transformer'
import { ArticleEntity } from './article.entity'

@Entity('comments')
export class CommentEntity extends AbstractEntity {
  @Column()
  body: string

  @OneToMany( // one author to many comments
    type => UserEntity,
    user => user.comments,
    { eager: true }
  )
  author: UserEntity

  @ManyToOne( // comment alsj belongs to article
    type => ArticleEntity,
    article => article.comments
  )
  article: ArticleEntity

  toJson() {
    return classToPlain(this)
  }
}
