import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsResolver } from './skills.resolver';

@Module({
  providers: [SkillsResolver, SkillsService]
})
export class SkillsModule {}
