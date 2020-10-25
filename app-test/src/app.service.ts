import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TagEntity } from './entities/tag.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TagEntity) private tagRepository: Repository<TagEntity>
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async findTags(): Promise<TagEntity[]> {
    return await this.tagRepository.find()
  }
}
