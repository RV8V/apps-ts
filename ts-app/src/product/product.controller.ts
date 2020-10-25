import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from 'src/product/product.dto'
import { AuthGuard } from '@nestjs/passport'
import { SellerGuard } from 'src/guards/seller.guard'
import { User } from 'src/utilities/user.decorator'
import { User as UserDocument } from '../types/user'
import { Product } from 'src/types/product'

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return await this.productService.findAll()
  }

  @Get('/mine')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listMine(@User() user: UserDocument): Promise<Product[]> {
    return await this.productService.findByOwner(user.id)
  }

  @Get('/seller/:id')
  async listBySeller(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.findByOwner(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async create(@Body() product: CreateProductDto, @User() user: UserDocument): Promise<Product> {
    return await this.productService.create(product, user)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
    @User() user: UserDocument,
  ): Promise<Product> {
    const { id: userId } = user
    return await this.productService.update(id, product, userId)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async delete(@Param('id') id: string, @User() user: UserDocument): Promise<Product> {
    const { id: userId } = user
    return await this.productService.delete(id, userId)
  }
}
