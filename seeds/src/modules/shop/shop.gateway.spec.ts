import { Test, TestingModule } from '@nestjs/testing';
import { ShopGateway } from './shop.gateway';
import { ShopService } from './shop.service';

describe('ShopGateway', () => {
  let gateway: ShopGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopGateway, ShopService],
    }).compile();

    gateway = module.get<ShopGateway>(ShopGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
