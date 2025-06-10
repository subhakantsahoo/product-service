import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private connection;
    private channel;
    onModuleInit(): Promise<void>;
    publishOrderCreated(order: any): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
