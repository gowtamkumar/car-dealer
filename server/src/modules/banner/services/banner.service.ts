import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBannerDto, FilterBannerDto, UpdateBannerDto } from '../dtos'
import { BannerEntity } from '../entities/banner.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'

@Injectable()
export class BannerService {
  private logger = new Logger(BannerService.name)

  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepo: Repository<BannerEntity>,
  ) { }

  getBanners(ctx: RequestContextDto, filterBannerDto: FilterBannerDto): Promise<BannerEntity[]> {
    this.logger.log(`${this.getBanners.name} Service Called`)

    return this.bannerRepo.find()
  }

  async getBanner(ctx: RequestContextDto, id: string): Promise<BannerEntity> {
    this.logger.log(`${this.getBanner.name} Service Called`)

    const result = await this.bannerRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Banner of id ${id} not found.`)
    }
    return result
  }

  async createBanner(ctx: RequestContextDto, createBannerDto: CreateBannerDto): Promise<BannerEntity> {
    this.logger.log(`${this.createBanner.name} Service Called`)

    const result = this.bannerRepo.create(createBannerDto)
    return this.bannerRepo.save(result)
  }

  async updateBanner(
    ctx: RequestContextDto,
    id: string,
    updateBannerDto: UpdateBannerDto,
  ): Promise<BannerEntity> {
    this.logger.log(`${this.updateBanner.name} Service Called`)

    const result = await this.bannerRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Banner of id ${id} not found.`)
    }

    this.bannerRepo.merge(result, updateBannerDto)
    return await this.bannerRepo.save(result)
  }

  async deleteBanner(ctx: RequestContextDto, id: string): Promise<BannerEntity> {
    this.logger.log(`${this.deleteBanner.name} Service Called`)

    const result = await this.bannerRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Banner of id ${id} not found.`)
    }

    return this.bannerRepo.remove(result)
  }
}
