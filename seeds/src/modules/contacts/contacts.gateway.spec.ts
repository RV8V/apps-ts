import { Test, TestingModule } from '@nestjs/testing';
import { ContactsGateway } from './contacts.gateway';
import { ContactsService } from './contacts.service';

describe('ContactsGateway', () => {
  let gateway: ContactsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsGateway, ContactsService],
    }).compile();

    gateway = module.get<ContactsGateway>(ContactsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
