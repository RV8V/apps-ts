import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/message/message.controller';
import { QuotesService } from './services/quotes/quotes.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, MessagesController, MessagesController],
  providers: [AppService, QuotesService],
})
export class AppModule {}
