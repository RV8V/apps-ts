import { CreateBuildingInput } from './create-building.input';
import { PartialType } from '@nestjs/graphql';

export class UpdateBuildingInput extends PartialType(CreateBuildingInput) {
  id: number;
}
