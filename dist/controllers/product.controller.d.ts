import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(product: CreateProductDto): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<Product>;
    remove(id: string): Promise<void>;
}
