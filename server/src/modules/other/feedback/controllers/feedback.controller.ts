import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard'
import { RequestContext } from '@common/decorators/request-context.decorator'
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  CreateFeedbackDto,
  FeedbackResponseDto,
  FilterFeedbackDto,
  UpdateFeedbackDto,
} from '../dtos'
import { FeedbackService } from '../services/feedback.service'

@UseGuards(JwtAuthGuard)
@Controller('feedbacks')
export class FeedbackController {
  private logger = new Logger(FeedbackController.name)

  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/')
  async getFeedbacks(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterFeedbackDto: FilterFeedbackDto,
  ): Promise<BaseApiSuccessResponse<FeedbackResponseDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving all Feedbacks.`)

    const feedbacks = await this.feedbackService.getFeedbacks(ctx, filterFeedbackDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of feedbacks`,
      totalRecords: feedbacks.length,
      data: feedbacks,
    }
  }

  @Get('/:id')
  async getFeedback(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<FeedbackResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Feedback info. of id: ${id}`)

    const feedback = await this.feedbackService.getFeedback(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Details of feedback of id: ${id}`,
      data: feedback,
    }
  }

  @Post('/')
  async createFeedback(
    @RequestContext() ctx: RequestContextDto,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<BaseApiSuccessResponse<FeedbackResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating new Feedback.`)

    const feedback = await this.feedbackService.createFeedback(ctx, createFeedbackDto)

    return {
      success: true,
      statusCode: 201,
      message: `New feedback of id: ${feedback.id} created`,
      data: feedback,
    }
  }

  @Put('/:id')
  async updateFeedback(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<BaseApiSuccessResponse<FeedbackResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Feedback of id ${id}.`)

    const feedback = await this.feedbackService.updateFeedback(ctx, id, updateFeedbackDto)

    return {
      success: true,
      statusCode: 200,
      message: `Feedback of id ${id} updated`,
      data: feedback,
    }
  }

  @Delete('/:id')
  async deleteFeedback(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<FeedbackResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting a Feedback. of id: ${id}`)

    const feedback = await this.feedbackService.deleteFeedback(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Feedback of id ${id} deleted`,
      data: feedback,
    }
  }
}
