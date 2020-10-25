export interface CreateProductDto {
  title: string
  image: string
  description: string
  price: number
}

export type UpdateProductDto = Partial<CreateProductDto>
