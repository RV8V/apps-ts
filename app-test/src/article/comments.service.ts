import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommentEntity } from 'src/entities/comment.entity'
import { UserEntity } from 'src/entities/user.entity'
import { CreateCommentDto } from 'src/models/comment.model'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>
  ) {}

  async findByArticleSlug(slug: string): Promise<CommentEntity[]> {
    return await this.commentRepository.find({ where: { 'article.slug': slug }, relations: ['article'] })
  }

  async findById(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({ where: { id } })
  }

  async createComment(user: UserEntity, data: CreateCommentDto) {
    const comment = this.commentRepository.create(data)
    comment.author = user
    await comment.save()
    return await this.commentRepository.findOne({ where: { body: data.body } })
  }

  async deleteComment(user: UserEntity, id: number) {
    const comment = await this.commentRepository.findOne({ where: { id, 'author.id': user.id } })
    await comment.remove()
    return comment
  }
}
