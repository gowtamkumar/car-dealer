import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBrandDto, FilterBrandDto, UpdateBrandDto } from '../dtos'
import { BrandEntity } from '../entities/brand.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'
import { FileService } from '@modules/other/file/services/file.service'

@Injectable()
export class BrandService {
  private logger = new Logger(BrandService.name)

  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepo: Repository<BrandEntity>,
    private readonly filerService: FileService
  ) { }

  getBrands(ctx: RequestContextDto, filterBrandDto: FilterBrandDto): Promise<BrandEntity[]> {
    this.logger.log(`${this.getBrands.name} Service Called`)

    const { isActive, name } = filterBrandDto

    let query = {} as any
    if (isActive) query.isActive = isActive
    if (name) query.name = name

    return this.brandRepo.find({ where: query, relations: ['models'] })
  }

  async getBrand(ctx: RequestContextDto, id: string): Promise<BrandEntity> {
    this.logger.log(`${this.getBrand.name} Service Called`)

    const result = await this.brandRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Brand of id ${id} not found.`)
    }
    return result
  }

  async createBrand(ctx: RequestContextDto, createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    this.logger.log(`${this.createBrand.name} Service Called`)

    const result = this.brandRepo.create(createBrandDto)
    return this.brandRepo.save(result)
  }

  async updateBrand(
    ctx: RequestContextDto,
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<BrandEntity> {
    this.logger.log(`${this.updateBrand.name} Service Called`)

    const result = await this.brandRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Brand of id ${id} not found.`)
    }

    this.brandRepo.merge(result, updateBrandDto)
    return await this.brandRepo.save(result)
  }

  async deleteBrand(ctx: RequestContextDto, id: string): Promise<BrandEntity> {
    this.logger.log(`${this.deleteBrand.name} Service Called`)

    const result = await this.brandRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Brand of id ${id} not found.`)
    }

    await this.brandRepo.remove(result)
    if (result.logo) {
      await this.filerService.deletePhotoWithFile(result.logo)
    }
    return result
  }
}
