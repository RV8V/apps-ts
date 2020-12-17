import { Test, TestingModule } from '@nestjs/testing';
import { BuildingResolver } from './building.resolver';
import { BuildingService } from './building.service';

describe('BuildingResolver', () => {
  let resolver: BuildingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingResolver, BuildingService],
    }).compile();

    resolver = module.get<BuildingResolver>(BuildingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
