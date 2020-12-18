import { Module, HttpModule } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [HttpModule],
  providers: [CatService],
  controllers: [CatController],
})

export class CatModule {}
