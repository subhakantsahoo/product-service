import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Post()
  create(@Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.create(order);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.update(+id, order);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(+id);
  }
}
