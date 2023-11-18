import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerController } from "./controllers/banner.controller";
import { BannerEntity } from "./entities/banner.entity";
import { BannerService } from "./services/banner.service";

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [],
})
export class BannerModule {}