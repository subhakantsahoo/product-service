import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as Express from 'express';

import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Make sure this folder exists
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
  ): Promise<Product> {
    try {
      const productData = {
        ...body,
        image: file?.filename || '',
      };
      return await this.productService.create(productData);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Partial<Product>): Promise<Product> {
    return this.productService.update(+id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(+id);
  }
}
