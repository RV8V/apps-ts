import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { ArticleEntity } from 'src/entities/article.entity'
import { UserEntity } from 'src/entities/user.entity'
import { TagEntity } from 'src/entities/tag.entity'
import { CreateArticleDto, UpdateArticleDto, FindAllQuery, FindFeedQuery } from '../models/article.model'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepositoty: Repository<UserEntity>,
    @InjectRepository(TagEntity) private tagRepositoty: Repository<TagEntity>
  ) {}

  private async upsertTags(tagList: string[]) {
    const foundTags = await this.tagRepositoty.find({ where: tagList.map(t => ({ tag: t })) }) // all found tags
    const newTags = tagList.filter(t => !foundTags.map(t => t.tag).includes(t)) // all new tags
    await Promise.all(
      this.tagRepositoty.create(newTags.map(t => ({ tag: t }))).map(t => t.save())
    )
  }

  async findAll(user: UserEntity, query: FindAllQuery) {
    const findOptions: any = { where: {} }
    if (query.author) findOptions.where['author.username'] = query.author
    if (query.favorited) findOptions.where['favoritedBy.username'] = query.favorited
    if (query.tag) findOptions.where['tagList'] = Like(`%${query.tag}%`)
    if (query.limit) findOptions.limit = query.limit
    if (query.offset) findOptions.limit = query.offset
    return (await this.articleRepository.find(findOptions)).map(article => article.toArticle(user))
  }

  async findFeed(user: UserEntity, query: FindFeedQuery) {
    const { followee } = await this.userRepositoty.findOne({ where: { id: user.id }, relations: ['followee'] })
    const findOptions = { ...query, where: followee.map(follow => ({ author: follow.id })) }
    return (await this.articleRepository.find(findOptions)).map(article => article.toArticle(user))
  }

  async findBySlug(slug: string) {
    return await this.articleRepository.findOne({ where: { slug } })
  }

  private ensureOwnership(user: UserEntity, article: ArticleEntity): boolean {
    return article.author.id === user.id
  }

  async createArticle(user: UserEntity, data: CreateArticleDto) {
    const article = await this.articleRepository.create(data)
    article.author = user
    await this.upsertTags(data.tagList)
    const { slug } = await article.save()
    return (await this.articleRepository.findOne({ slug })).toArticle(user)
  }

  async updateArticle(slug: string, user: UserEntity, data: UpdateArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { slug } })
    if (!this.ensureOwnership(user, article)) throw new UnauthorizedException()
    await this.articleRepository.update({ slug }, data)
    return article.toArticle(user)
  }

  async deleteArticle(slug: string, user: UserEntity): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug)
    if (!this.ensureOwnership(user, article)) throw new UnauthorizedException()
    await this.articleRepository.remove(article)
    return article
  }

  async favoriteArticle(user: UserEntity, slug: string) {
    const article = await this.findBySlug(slug)
    article.favoritedBy.push(user)
    await article.save()
    return (await this.findBySlug(slug)).toArticle(user)
  }

  async unfavoriteArticle(user: UserEntity, slug: string) {
    const article = await this.findBySlug(slug)
    article.favoritedBy = article.favoritedBy.filter(fav => fav.id !== user.id)
    await article.save()
    return (await this.findBySlug(slug)).toArticle(user)
  }
}
