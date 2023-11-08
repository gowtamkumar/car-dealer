import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DistrictController } from "./controllers/district.controller";
import { DistrictEntity } from "./entities/district.entity";
import { DistrictService } from "./services/district.service";

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity])],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService]
})
export class DistrictModule {}