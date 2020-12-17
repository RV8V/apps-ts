import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@WebSocketGateway()
export class ShopGateway {
  constructor(private readonly shopService: ShopService) {}

  @SubscribeMessage('createShop')
  create(@MessageBody() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @SubscribeMessage('findAllShop')
  findAll() {
    return this.shopService.findAll();
  }

  @SubscribeMessage('findOneShop')
  findOne(@MessageBody() id: number) {
    return this.shopService.findOne(id);
  }

  @SubscribeMessage('updateShop')
  update(@MessageBody() updateShopDto: UpdateShopDto) {
    return this.shopService.update(updateShopDto.id, updateShopDto);
  }

  @SubscribeMessage('removeShop')
  remove(@MessageBody() id: number) {
    return this.shopService.remove(id);
  }
}
