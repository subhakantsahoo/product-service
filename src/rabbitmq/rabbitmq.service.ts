import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange('order_exchange', 'fanout', { durable: true });
  }

  async publishOrderCreated(order: any) {
    const msgBuffer = Buffer.from(JSON.stringify(order));
    this.channel.publish('order_exchange', '', msgBuffer);
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
