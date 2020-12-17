import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsGateway } from './contacts.gateway';

@Module({
  providers: [ContactsGateway, ContactsService]
})
export class ContactsModule {}
