import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModelController } from "./controllers/model.controller";
import { ModelEntity } from "./entities/model.entity";
import { ModelService } from "./services/model.service";

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity])],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [],
})
export class ModelModule {}