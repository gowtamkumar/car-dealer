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
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard'
import { RequestContext } from '@common/decorators/request-context.decorator'
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { ReviewDto, CreateReviewDto, FilterReviewDto, UpdateReviewDto } from '../dtos'
import { ReviewService } from '../services/review.service'

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  private logger = new Logger(ReviewController.name)

  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  async getReviews(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterReviewDto: FilterReviewDto,
  ): Promise<BaseApiSuccessResponse<ReviewDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Reviews.`)

    const result = await this.reviewService.getReviews(ctx, filterReviewDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Reviews`,
      data: result,
    }
  }

  @Get('/:id')
  async getReview(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ReviewDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Review. Id: ${id}`)

    const result = await this.reviewService.getReview(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Review of id: ${id}`,
      data: result,
    }
  }

  @Post('/')
  async createReview(
    @RequestContext() ctx: RequestContextDto,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<BaseApiSuccessResponse<ReviewDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating Review.`)

    const result = await this.reviewService.createReview(ctx, createReviewDto)

    return {
      success: true,
      statusCode: 201,
      message: `Review created`,
      data: result,
    }
  }

  @Put('/:id')
  async updateReview(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<BaseApiSuccessResponse<ReviewDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Review.`)

    const result = await this.reviewService.updateReview(ctx, id, updateReviewDto)

    return {
      success: true,
      statusCode: 200,
      message: `Review of id ${id} updated`,
      data: result,
    }
  }

  @Delete('/:id')
  async deleteReview(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ReviewDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting Review.`)

    const result = await this.reviewService.deleteReview(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Review of id ${id} deleted`,
      data: result,
    }
  }
}
