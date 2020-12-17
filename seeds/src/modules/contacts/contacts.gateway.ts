import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@WebSocketGateway()
export class ContactsGateway {
  constructor(private readonly contactsService: ContactsService) {}

  @SubscribeMessage('createContact')
  create(@MessageBody() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @SubscribeMessage('findAllContacts')
  findAll() {
    return this.contactsService.findAll();
  }

  @SubscribeMessage('findOneContact')
  findOne(@MessageBody() id: number) {
    return this.contactsService.findOne(id);
  }

  @SubscribeMessage('updateContact')
  update(@MessageBody() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(updateContactDto.id, updateContactDto);
  }

  @SubscribeMessage('removeContact')
  remove(@MessageBody() id: number) {
    return this.contactsService.remove(id);
  }
}
