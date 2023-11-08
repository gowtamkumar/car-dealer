import { Expose } from "class-transformer";

export class FeedbackResponseDto {

  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  createdBy: string;

};