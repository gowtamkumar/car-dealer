import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerController } from "./controllers/banner.controller";
import { BannerEntity } from "./entities/banner.entity";
import { BannerService } from "./services/banner.service";
import { FileModule } from "@modules/other/file/file.module";

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity]), FileModule],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [],
})
export class BannerModule {}