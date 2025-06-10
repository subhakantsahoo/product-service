import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async safeFindAll(): Promise<Product[]> {
    try {
      return await this.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async create(product: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(product);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({ id });
    if (!existingProduct) {
      throw new InternalServerErrorException('Product not found');
    }
    const updatedProduct = Object.assign(existingProduct, product);
    return this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
