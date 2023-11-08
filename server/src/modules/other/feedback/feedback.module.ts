import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeedbackController } from "./controllers/feedback.controller";
import { FeedbackEntity } from "./entities/feedback.entity";
import { FeedbackService } from "./services/feedback.service";

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: []
})
export class FeedBackModule {}