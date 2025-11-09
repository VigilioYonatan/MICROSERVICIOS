import { Controller, ParseIntPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // @Post()
    @MessagePattern({ cmd: "product_create" })
    create(@Payload() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    // @Get()
    @MessagePattern({ cmd: "product_find_all" })
    findAll() {
        return this.productsService.findAll();
    }

    // @Get(":id")
    @MessagePattern({ cmd: "product_find_one" })
    findOne(@Payload("id") id: string) {
        return this.productsService.findOne(+id);
    }

    // @Patch(":id")
    @MessagePattern({ cmd: "product_update" })
    update(
        // @Payload("id", ParseIntPipe) id: number,
        @Payload() updateProductDto: UpdateProductDto
    ) {
        console.log({ updateProductDto });

        // return this.productsService.update(+id, updateProductDto);
        return this.productsService.update(updateProductDto);
    }

    // @Delete(":id")
    @MessagePattern({ cmd: "product_delete" })
    remove(@Payload("id", ParseIntPipe) id: number) {
        return this.productsService.remove(+id);
    }
}
