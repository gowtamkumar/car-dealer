import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SettingController } from "./controllers/setting.controller";
import { SettingEntity } from "./entities/setting.entity";
import { SettingService } from "./services/setting.service";

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity])],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [],
})
export class SettingModule {}