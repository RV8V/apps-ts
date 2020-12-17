import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { ShopModule } from './modules/shop/shop.module';
import { AuthModule } from './modules/auth/auth.module';
import { BuildingModule } from './modules/building/building.module';
import { SupportModule } from './modules/support/support.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [UserModule, ProfileModule, SkillsModule, ProductModule, CartModule, ShopModule, AuthModule, BuildingModule, SupportModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
