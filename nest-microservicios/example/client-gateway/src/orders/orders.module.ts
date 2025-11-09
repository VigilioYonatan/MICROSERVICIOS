import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envs, ORDER_SERVICE } from "src/config";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: ORDER_SERVICE,
                transport: Transport.NATS,
                options: {
                    // host: envs.ORDERS_MICROSERVICE_HOST,
                    // port: envs.ORDERS_MICROSERVICE_PORT,
                    server: envs.natsServers,
                },
            },
        ]),
    ],
    controllers: [OrdersController],
})
export class OrdersModule {}
