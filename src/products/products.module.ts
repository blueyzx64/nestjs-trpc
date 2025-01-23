import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRouter } from './product.router';

@Module({
  providers: [ProductsService, ProductsRouter]
})
export class ProductsModule {}
