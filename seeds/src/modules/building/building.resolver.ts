import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BuildingService } from './building.service';
import { CreateBuildingInput } from './dto/create-building.input';
import { UpdateBuildingInput } from './dto/update-building.input';

@Resolver('Building')
export class BuildingResolver {
  constructor(private readonly buildingService: BuildingService) {}

  @Mutation('createBuilding')
  create(@Args('createBuildingInput') createBuildingInput: CreateBuildingInput) {
    return this.buildingService.create(createBuildingInput);
  }

  @Query('building')
  findAll() {
    return this.buildingService.findAll();
  }

  @Query('building')
  findOne(@Args('id') id: number) {
    return this.buildingService.findOne(id);
  }

  @Mutation('updateBuilding')
  update(@Args('updateBuildingInput') updateBuildingInput: UpdateBuildingInput) {
    return this.buildingService.update(updateBuildingInput.id, updateBuildingInput);
  }

  @Mutation('removeBuilding')
  remove(@Args('id') id: number) {
    return this.buildingService.remove(id);
  }
}
