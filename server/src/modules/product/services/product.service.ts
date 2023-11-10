import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos'
import { ProductEntity } from '../entities/product.entity'

@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name)

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async getProducts(
    ctx: RequestContextDto,
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    this.logger.log(`${this.getProducts.name}Service Called`)

    return this.productRepo.find()
  }

  async getProduct(ctx: RequestContextDto, id: string): Promise<ProductEntity> {
    this.logger.log(`${this.getProduct.name}Service Called`)

    const result = await this.productRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }
    return result
  }

  async createProduct(
    ctx: RequestContextDto,
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`${this.createProduct.name}Service Called`)

    const result = this.productRepo.create(createProductDto)
    result.userId = ctx.user.id
    return this.productRepo.save(result)
  }

  async updateProduct(
    ctx: RequestContextDto,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`${this.updateProduct.name}Service Called`)

    const result = await this.productRepo.findOne({ where: { id }, loadEagerRelations: false })
    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }

    this.productRepo.merge(result, updateProductDto)
    return this.productRepo.save(result)
  }

  async deleteProduct(ctx: RequestContextDto, id: string): Promise<ProductEntity> {
    this.logger.log(`${this.deleteProduct.name}Service Called`)

    const result = await this.productRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }
    return this.productRepo.remove(result)
  }
}
