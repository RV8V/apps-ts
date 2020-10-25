import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { TagEntity } from './entities/tag.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/tags')
  async findTags(): Promise<{ tags: TagEntity[] }> {
    const tags = await this.appService.findTags()
    return { tags }
  }
}
