import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CatService {
  constructor(private httpService: HttpService) {}

  findAll() {
    return this.httpService.get('http://localhost:3000/cats');
  }
}
