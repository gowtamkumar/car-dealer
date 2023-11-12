import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateProductFeatureDto, FilterProductFeatureDto, UpdateProductFeatureDto } from '../dtos'
import { ProductFeatureEntity } from '../entities/product-feature.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'

@Injectable()
export class ProductFeatureService {
  private logger = new Logger(ProductFeatureService.name)

  constructor(
    @InjectRepository(ProductFeatureEntity)
    private readonly productFeatureRepo: Repository<ProductFeatureEntity>,
  ) {}

  getProductFeatures(
    ctx: RequestContextDto,
    filterProductFeatureDto: FilterProductFeatureDto,
  ): Promise<ProductFeatureEntity[]> {
    this.logger.log(`${this.getProductFeatures.name} Service Called`)

    return this.productFeatureRepo.find()
  }

  async getProductFeature(ctx: RequestContextDto, id: string): Promise<ProductFeatureEntity> {
    this.logger.log(`${this.getProductFeature.name} Service Called`)

    const result = await this.productFeatureRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product Feature of id ${id} not found.`)
    }
    return result
  }

  async createProductFeature(
    ctx: RequestContextDto,
    createProductFeatureDto: CreateProductFeatureDto,
  ): Promise<ProductFeatureEntity> {
    this.logger.log(`${this.createProductFeature.name} Service Called`)

    const result = this.productFeatureRepo.create(createProductFeatureDto)
    return this.productFeatureRepo.save(result)
  }

  async updateProductFeature(
    ctx: RequestContextDto,
    id: string,
    updateProductFeatureDto: UpdateProductFeatureDto,
  ): Promise<ProductFeatureEntity> {
    this.logger.log(`${this.updateProductFeature.name} Service Called`)

    const result = await this.productFeatureRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product Feature of id ${id} not found.`)
    }

    this.productFeatureRepo.merge(result, updateProductFeatureDto)
    return await this.productFeatureRepo.save(result)
  }

  async updateProductFeatureById(
    ctx: RequestContextDto,
    id: string,
    updateProductFeatureDto: UpdateProductFeatureDto,
  ): Promise<ProductFeatureEntity> {
    this.logger.log(`${this.updateProductFeatureById.name} Service Called`)

    const result = await this.productFeatureRepo.findOne({ where: { productId: id } })
    if (!result) {
      throw new NotFoundException(`Product Feature of id ${id} not found.`)
    }

    console.log('product Featutue', result)
    console.log('updateProductFeatureDto', updateProductFeatureDto)

    this.productFeatureRepo.merge(result, updateProductFeatureDto)
    return await this.productFeatureRepo.save(result)
  }
  async deleteProductFeature(ctx: RequestContextDto, id: string): Promise<ProductFeatureEntity> {
    this.logger.log(`${this.deleteProductFeature.name} Service Called`)

    const result = await this.productFeatureRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product Feature of id ${id} not found.`)
    }

    return this.productFeatureRepo.remove(result)
  }
}
