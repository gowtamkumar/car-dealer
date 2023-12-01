import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from './controllers/product.controller'
import { ProductEntity } from './entities/product.entity'
import { ProductService } from './services/product.service'
import { FileModule } from '@modules/other/file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), FileModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
