import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandController } from "./controllers/brand.controller";
import { BrandEntity } from "./entities/brand.entity";
import { BrandService } from "./services/brand.service";
import { FileModule } from "@modules/other/file/file.module";

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity]), FileModule],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [],
})
export class BrandModule {}