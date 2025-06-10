"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
const product_service_1 = require("./services/product.service");
const order_service_1 = require("./services/order.service");
const product_controller_1 = require("./controllers/product.controller");
const order_controller_1 = require("./controllers/order.controller");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'newpassword',
                database: 'testdb',
                entities: [product_entity_1.Product, order_entity_1.Order],
                synchronize: true,
                migrations: ['dist/migrations/*.js'],
                migrationsRun: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, order_entity_1.Order]),
        ],
        controllers: [product_controller_1.ProductController, order_controller_1.OrderController],
        providers: [product_service_1.ProductService, order_service_1.OrderService, rabbitmq_service_1.RabbitMQService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map