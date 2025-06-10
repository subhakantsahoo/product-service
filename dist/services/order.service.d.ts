import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    create(order: Partial<Order>): Promise<Order>;
    update(id: number, order: Partial<Order>): Promise<Order>;
    remove(id: number): Promise<void>;
}
