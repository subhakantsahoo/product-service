import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    create(order: Partial<Order>): Promise<Order>;
    update(id: string, order: Partial<Order>): Promise<Order>;
    remove(id: string): Promise<void>;
}
