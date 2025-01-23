import { Input, Mutation, Router, Query, UseMiddlewares, Ctx } from "nestjs-trpc";
import { ProductsService } from './products.service';
import { Product, productSchema } from './products.schema';
// import { Query } from "@nestjs/common";
import { z } from "zod"
import { LoggerMiddleware } from "src/trpc/middleware/logger.middleware";
import { IAppContext } from "src/trpc/context/context.interface";

@UseMiddlewares(LoggerMiddleware)
@Router({ alias: "products" })
export class ProductsRouter {

    constructor(private productsService: ProductsService) { }


    @Query({
        input: z.object({ id: z.string() }),
        output: productSchema
    })
    getProductById(
        @Input('id') id: string,
        @Ctx() context: IAppContext

    ) {

        console.log(context)
        return this.productsService.getProductById(id)
    }

    @Query({
        output: z.array(productSchema)
    })
    getAllProducts(
        @Input('id') id: string
    ) {
        return this.productsService.getAllProducts()
    }


    @Mutation({
        input: z.object({
            id: z.string(),
            data: productSchema.partial()
        }),
        output: productSchema
    })
    updateProduct(
        @Input('id') id: string,
        @Input('data') data: Partial<Product>,

    ) {
        return this.productsService.updateProduct(id, data)
    }


    @Mutation({
        input: z.object({
            id: z.string(),
        }),
        output: z.boolean()
    })
    deleteProduct(
        @Input('id') id: string,

    ) {
        return this.productsService.deleteProduct(id)
    }


    @Mutation({
        input: productSchema,
        output: productSchema
    })
    createProduct(
        @Input() productData: Product
    ) {
        return this.productsService.createProduct(productData)
    }

}