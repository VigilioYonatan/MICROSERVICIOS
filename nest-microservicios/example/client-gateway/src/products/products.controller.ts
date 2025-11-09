import {
    BadGatewayException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
import { NATS_SERVICE, PRODUCT_SERVICE } from "src/config";
import { CreateProductDto, UpdateProductDto } from "./dto";

@Controller("/products")
export class ProductsController {
    constructor(
        // @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Get()
    index() {
        return this.client.send({ cmd: "product_find_all" }, {});
    }

    @Post()
    store(@Body() createProductDto: CreateProductDto) {
        return this.client.send({ cmd: "product_create" }, createProductDto);
    }

    @Get(":id")
    async show(@Param("id", ParseIntPipe) id: number) {
        // const product = await firstValueFrom(
        //     this.productsClient.send({ cmd: "product_find_one" }, { id })
        // );
        // return product;
        return this.client.send({ cmd: "product_find_one" }, { id }).pipe(
            catchError((err) => {
                throw new RpcException(err);
            })
        );
    }

    @Patch("/:id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.client
            .send({ cmd: "product_update" }, { id, ...updateProductDto })
            .pipe(
                catchError((err) => {
                    throw new RpcException(err);
                })
            );
    }

    @Delete(":id")
    destroy(@Param("id", ParseIntPipe) id: number) {
        return this.client.send({ cmd: "destroy" }, { id });
    }
}
