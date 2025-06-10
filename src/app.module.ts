import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'newpassword',
      database: 'testdb',
      entities: [Product, Order],
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([Product, Order]),
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService, RabbitMQService],
})
export class AppModule {}
