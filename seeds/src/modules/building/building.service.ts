import { Injectable } from '@nestjs/common';
import { CreateBuildingInput } from './dto/create-building.input';
import { UpdateBuildingInput } from './dto/update-building.input';

@Injectable()
export class BuildingService {
  create(createBuildingInput: CreateBuildingInput) {
    return 'This action adds a new building';
  }

  findAll() {
    return `This action returns all building`;
  }

  findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingInput: UpdateBuildingInput) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
