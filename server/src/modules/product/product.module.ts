import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from './controllers/product.controller'
import { ProductEntity } from './entities/product.entity'
import { ProductService } from './services/product.service'
import { ProductFeatureModule } from '@modules/product-feature/product-feature.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ProductFeatureModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
