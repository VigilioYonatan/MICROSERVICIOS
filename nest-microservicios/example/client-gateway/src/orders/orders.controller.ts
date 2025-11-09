import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ORDER_SERVICE } from "src/config";
import { ClientProxy } from "@nestjs/microservices";

@Controller("/orders")
export class OrdersController {
    constructor(
        @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
    ) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersClient.send("findAllOrders", {});
    }

    @Get("/")
    findAll() {
        return this.ordersClient.send({ cmd: "findAllOrders" }, {});
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ordersClient.send("findAllOrders", {});
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersClient.send("findAllOrders", {});
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ordersClient.send("findAllOrders", {});
    }
}
