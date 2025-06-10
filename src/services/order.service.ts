import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    const savedOrder = await this.orderRepository.save(newOrder);
    await this.rabbitMQService.publishOrderCreated(savedOrder);
    return savedOrder;
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, order);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
