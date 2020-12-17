import { CreateProductInput } from './create-product.input';
import { PartialType } from '@nestjs/graphql';

export class UpdateProductInput extends PartialType(CreateProductInput) {
  id: number;
}
