import { Entity, Column, BeforeInsert, ManyToOne, ManyToMany, RelationCount, JoinTable, OneToMany } from 'typeorm'
import * as slug from 'slug'
import { AbstractEntity } from './abstract-entity'
import { UserEntity } from './user.entity'
import { classToPlain } from 'class-transformer'
import { CommentEntity } from './comment.entity'

@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  body: string

  @RelationCount(
    (article: ArticleEntity) => article.favoritedBy
  )
  favoriresCount: number

  @ManyToMany( // many articles can be favorted by many user
    type => UserEntity,
    user => user.favorites,
    { eager: true }
  )
  @JoinTable()
  favoritedBy: UserEntity[]

  @ManyToOne( // many articles to one user
    type => UserEntity,
    user => user.articles,
    { eager: true }
  )
  author: UserEntity

  @OneToMany(
    type => CommentEntity,
    comment => comment.author
  )
  comments: CommentEntity[]

  @Column('simple-array')
  tagList: string[]

  @BeforeInsert()
  generateSlug() {
    this.slug = slug(this.slug, { lower: true }) + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  }

  toJson() {
    return classToPlain(this)
  }

  toArticle(user: UserEntity) {
    let favorited = null
    if (user) favorited = this.favoritedBy.map(fav => fav.id).includes(user.id)
    const article: any = this.toJson()
    delete article.favoritedBy
    return { ...article, favorited }
  }
}
