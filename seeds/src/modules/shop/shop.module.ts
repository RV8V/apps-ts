import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopGateway } from './shop.gateway';

@Module({
  providers: [ShopGateway, ShopService]
})
export class ShopModule {}
