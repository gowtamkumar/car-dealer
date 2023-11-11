import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductFeatureController } from "./controllers/product-feature.controller";
import { ProductFeatureEntity } from "./entities/product-feature.entity";
import { ProductFeatureService } from "./services/product-feature.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductFeatureEntity])],
  controllers: [ProductFeatureController],
  providers: [ProductFeatureService],
  exports: [ProductFeatureService],
  
})
export class ProductFeatureModule {}