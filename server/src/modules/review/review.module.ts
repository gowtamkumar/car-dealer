import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewController } from "./controllers/review.controller";
import { ReviewEntity } from "./entities/review.entity";
import { ReviewService } from "./services/review.service";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [],
})
export class ReviewModule {}