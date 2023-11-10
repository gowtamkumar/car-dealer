import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateReviewDto, FilterReviewDto, UpdateReviewDto } from '../dtos'
import { ReviewEntity } from '../entities/review.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'

@Injectable()
export class ReviewService {
  private logger = new Logger(ReviewService.name)

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
  ) {}

  getReviews(ctx: RequestContextDto, filterReviewDto: FilterReviewDto): Promise<ReviewEntity[]> {
    this.logger.log(`${this.getReviews.name} Service Called`)
    return this.reviewRepo.find()
  }

  async getReview(ctx: RequestContextDto, id: string): Promise<ReviewEntity> {
    this.logger.log(`${this.getReview.name} Service Called`)

    const result = await this.reviewRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Review of id ${id} not found.`)
    }
    return result
  }

  async createReview(
    ctx: RequestContextDto,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    this.logger.log(`${this.createReview.name} Service Called`)

    const result = this.reviewRepo.create(createReviewDto)
    result.userId = ctx.user.id
    return this.reviewRepo.save(result)
  }

  async updateReview(
    ctx: RequestContextDto,
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    this.logger.log(`${this.updateReview.name} Service Called`)

    const result = await this.reviewRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Review of id ${id} not found.`)
    }

    this.reviewRepo.merge(result, updateReviewDto)
    return await this.reviewRepo.save(result)
  }

  async deleteReview(ctx: RequestContextDto, id: string): Promise<ReviewEntity> {
    this.logger.log(`${this.deleteReview.name} Service Called`)

    const result = await this.reviewRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Review of id ${id} not found.`)
    }

    return this.reviewRepo.remove(result)
  }
}
