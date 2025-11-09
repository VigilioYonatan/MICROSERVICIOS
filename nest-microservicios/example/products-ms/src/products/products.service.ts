import {
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
    OnModuleInit,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaClient } from "generated/prisma";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(ProductsService.name);

    async onModuleInit() {
        await this.$connect();
        this.logger.log("Connected to the database");
    }

    async create(createProductDto: CreateProductDto) {
        const result = await this.product.create({
            data: createProductDto,
        });
        return result;
    }

    findAll() {
        return this.product.findMany();
    }

    async findOne(id: number) {
        const product = await this.product.findFirst({
            where: { id },
        });

        if (!product) {
            // throw new RpcException("Product not found");
            throw new RpcException({
                message: `Product ${id} not found`,
                status: HttpStatus.NOT_FOUND,
            });
        }
        return product;
    }

    async update(updateProductDto: UpdateProductDto) {
        try {
            const { id, ...data } = updateProductDto;

            return await this.product.update({
                where: { id },
                data: { ...data },
            });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    remove(id: number) {
        return this.product.delete({
            where: { id },
        });
    }
}
