import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from 'src/types/product'
import { CreateProductDto, UpdateProductDto } from 'src/product/product.dto'
import { User } from 'src/types/user'

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('owner')
  }

  async findByOwner(userId: string): Promise<Product[]> {
    return await this.productModel.find({ owner: userId }).populate('owner')
  }

  async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('owner')
  }

  async create(productDto: CreateProductDto, user: User): Promise<Product> {
    const product = await this.productModel.create({ ...productDto, owner: user })
    await product.save()
    return product.populate('owner')
  }

  async update(id: string, productDto: UpdateProductDto, user: User): Promise<Product> {
    const product = await this.productModel.findById(id)
    const { id: userId } = user
    if (userId !== product.owner.toString()) {
      throw new HttpException('You do not owe this product', HttpStatus.UNAUTHORIZED)
    }
    await product.update(productDto)
    return product.populate('owner')
  }

  async delete(id: string, user: User): Promise<Product> {
    const product = await this.productModel.findById(id)
    const { id: userId } = user
    if (userId !== product.owner.toString()) {
      throw new HttpException('You do not owe this product', HttpStatus.UNAUTHORIZED)
    }
    await product.remove()
    return product.populate('owner')
  }
}
