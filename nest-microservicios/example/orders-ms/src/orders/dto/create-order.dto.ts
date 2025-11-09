import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
} from "class-validator";
import { OrderStatus } from "generated/prisma";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    total_amount: number;

    @IsNumber()
    @IsPositive()
    total_items: number;

    @IsEnum(OrderStatus, { message: `Valores permitidos: ${OrderStatus}` })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid: boolean = false;
}
