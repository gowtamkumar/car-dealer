import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFeedbackDto, FilterFeedbackDto, UpdateFeedbackDto } from '../dtos'
import { FeedbackEntity } from '../entities/feedback.entity'

@Injectable()
export class FeedbackService {
  private logger = new Logger(FeedbackService.name)

  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepo: Repository<FeedbackEntity>,
  ) {}

  getFeedbacks(
    ctx: RequestContextDto,
    filterFeedbackDto: FilterFeedbackDto,
  ): Promise<FeedbackEntity[]> {
    this.logger.log(`${this.getFeedbacks.name} Called`)
    const { id } = filterFeedbackDto

    const reqQuery: any = {}

    if (id) reqQuery.id = id

    return this.feedbackRepo.find({ where: reqQuery })
  }

  async getFeedback(ctx: RequestContextDto, id: string): Promise<FeedbackEntity> {
    this.logger.log(`${this.getFeedback.name} Called`)

    const feedback = await this.feedbackRepo.findOne({ where: { id } })
    if (!feedback) {
      throw new NotFoundException(`Feedback of id ${id} not found`)
    }

    return feedback
  }

  async createFeedback(
    ctx: RequestContextDto,
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<FeedbackEntity> {
    this.logger.log(`${this.createFeedback.name} Called`)

    const feedback = await this.feedbackRepo.create(createFeedbackDto)
    await this.feedbackRepo.save(feedback)

    return feedback
  }

  async updateFeedback(
    ctx: RequestContextDto,
    id: string,
    UpdateFeedbackDto: UpdateFeedbackDto,
  ): Promise<FeedbackEntity> {
    this.logger.log(`${this.updateFeedback.name} Called`)

    const feedback = await this.getFeedback(ctx, id)
    this.feedbackRepo.merge(feedback, UpdateFeedbackDto)

    await this.feedbackRepo.save(feedback)

    return feedback
  }

  async deleteFeedback(ctx: RequestContextDto, id: string): Promise<FeedbackEntity> {
    this.logger.log(`${this.deleteFeedback.name} Called`)

    const feedback = await this.getFeedback(ctx, id)
    await this.feedbackRepo.remove(feedback)

    return feedback
  }
}
