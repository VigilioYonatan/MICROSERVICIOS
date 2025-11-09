import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from "src/config";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVICE,
                // transport: Transport.TCP,
                transport: Transport.NATS,
                options: {
                    // host: envs.PRODUCTS_MICROSERVICE_HOST,
                    // port: envs.PRODUCTS_MICROSERVICE_PORT,
                    servers: envs.natsServers,
                },
            },
        ]),
    ],
    controllers: [ProductsController],
    providers: [],
})
export class ProductsModule {}
