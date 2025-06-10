import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    safeFindAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    create(product: CreateProductDto): Promise<Product>;
    update(id: number, product: Partial<Product>): Promise<Product>;
    remove(id: number): Promise<void>;
}
