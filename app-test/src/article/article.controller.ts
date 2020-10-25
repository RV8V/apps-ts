import { Controller, Get, Param, Post, UseGuards, Body, ValidationPipe, Put, Delete, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from 'src/entities/user.entity'
import { User } from 'src/auth/user.decorator'
import { ArticleEntity } from 'src/entities/article.entity'
import { CreateArticleDto, UpdateArticleDto, FindFeedQuery, FindAllQuery } from 'src/models/article.model'
import { OptinalAuthGuard } from 'src/auth/optional-auth.gaurd'
import { CommentService } from './comments.service'
import { CommentEntity } from 'src/entities/comment.entity'
import { CreateCommentDto } from 'src/models/comment.model'

@Controller('articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private commentService: CommentService
  ) {}

  @Get()
  @UseGuards(new OptinalAuthGuard())
  async findAll(
    @User() user: UserEntity,
    @Query() query: FindAllQuery
  ): Promise<{ articles: ArticleEntity[], articlesCount: number }> {
    const articles = await this.articleService.findAll(user, query)
    return { articles, articlesCount: articles.length }
  }

  @Get('/feed')
  async findFeed(
    @User() user: UserEntity,
    @Query() query: FindFeedQuery
  ): Promise<{ articles: ArticleEntity[], articlesCount: number }> {
    const articles = await this.articleService.findFeed(user, query)
    return { articles, articlesCount: articles.length }
  }

  @Get('/:slug')
  @UseGuards(new OptinalAuthGuard())
  async findBySlug(@Param('slug') slug: string, @User() user: UserEntity): Promise<{ article: ArticleEntity }> {
    const article = await this.articleService.findBySlug(slug)
    return { article: article.toArticle(user) }
  }

  @Post()
  @UseGuards(AuthGuard())
  async creareArticle(
    @User() user: UserEntity,
    @Body(ValidationPipe) data: { article: CreateArticleDto }
  ): Promise<{ article: ArticleEntity }> {
    const article =  await this.articleService.createArticle(user, data.article)
    return { article }
  }

  @Put('/:slug')
  async updateArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
    @Body(ValidationPipe) data: { article: UpdateArticleDto },
  ): Promise<{ article: ArticleEntity }> {
    const article = await this.articleService.updateArticle(slug, user, data.article)
    return { article }
  }

  @Get('/:slug/comments')
  async findComments(@Param('slug') slug: string): Promise<{ comments: CommentEntity[] }> {
    const comments = await this.commentService.findByArticleSlug(slug)
    return { comments }
  }

  @Post('/:slug/comments')
  async createComment(@User() user: UserEntity, @Body(ValidationPipe) data: { comment: CreateCommentDto }): Promise<{ comment: CommentEntity }> {
    const comment = await this.commentService.createComment(user, data.comment)
    return { comment }
  }

  @Delete('/:slug/comments/:id')
  async deleteComment(@User() user: UserEntity, @Param('id') id: number): Promise<{ comment: CommentEntity }> {
    const comment = await this.commentService.deleteComment(user, id)
    return { comment }
  }

  @Delete('/:slug')
  async deleteArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ): Promise<{ article: ArticleEntity }> {
    const article = await this.articleService.deleteArticle(slug, user)
    return { article }
  }

  @Get('/:slug/favorite')
  @UseGuards(new OptinalAuthGuard())
  async favoriteArticle(
    @User() user: UserEntity,
    @Param('slug') slug: string
  ): Promise<{ article: ArticleEntity }> {
    const article = await this.articleService.favoriteArticle(user, slug)
    return { article }
  }

  @Delete('/:slug/favorite')
  @UseGuards(new OptinalAuthGuard())
  async unfavoriteArticle(
    @User() user: UserEntity,
    @Param('slug') slug: string
  ): Promise<{ article: ArticleEntity }> {
    const article = await this.articleService.unfavoriteArticle(user, slug)
    return { article }
  }
}
