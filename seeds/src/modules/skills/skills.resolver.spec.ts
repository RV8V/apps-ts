import { Test, TestingModule } from '@nestjs/testing';
import { SkillsResolver } from './skills.resolver';
import { SkillsService } from './skills.service';

describe('SkillsResolver', () => {
  let resolver: SkillsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillsResolver, SkillsService],
    }).compile();

    resolver = module.get<SkillsResolver>(SkillsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
