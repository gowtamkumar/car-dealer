import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModelCodeEntity } from "./entities/model-code.entity";
import { ModelCodeController } from "./controllers/model-code.controller";
import { ModelCodeService } from "./services/model-code.service";


@Module({
  imports: [TypeOrmModule.forFeature([ModelCodeEntity])],
  controllers: [ModelCodeController],
  providers: [ModelCodeService],
  exports: [],
})
export class ModelCodeModule {}