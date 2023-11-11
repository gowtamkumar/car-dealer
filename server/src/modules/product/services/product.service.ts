import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos'
import { ProductEntity } from '../entities/product.entity'
import { ProductFeatureService } from '@modules/product-feature/services/product-feature.service'
import { Transactional } from 'typeorm-transactional-cls-hooked'

@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name)

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly productFeatureService: ProductFeatureService,
  ) {}

  async getProducts(
    ctx: RequestContextDto,
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    this.logger.log(`${this.getProducts.name}Service Called`)
    const { condition, auction, brandId, modelCodeId, modelId, manufactureDate, ac } =
      filterProductDto
    // service time Start
    const start = process.hrtime()
    console.log(typeof ac);
    

    const qb = this.productRepo.createQueryBuilder('product')
    qb.select(['product', 'productFeature', 'brand.name', 'model.name', 'modelCode.name'])
    qb.leftJoin('product.productFeature', 'productFeature')
    qb.leftJoin('product.brand', 'brand')
    qb.leftJoin('product.model', 'model')
    qb.leftJoin('product.modelCode', 'modelCode')
    // if (ac) qb.where('a.productFeature IN (:...productFeature)', { productFeature:  ac  })
    if (condition) qb.where({ condition })
    if (auction) qb.where({ auction })
    if (brandId) qb.where({ brandId })
    if (modelCodeId) qb.where({ modelCodeId })
    if (modelId) qb.where({ modelId })
    if (manufactureDate) qb.where({ manufactureDate })
    const result = await qb.getMany()

    const stop = process.hrtime(start)
    this.logger.log(`Time of getting Products   ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`) //time end

    return result
  }

  async getProduct(ctx: RequestContextDto, id: string): Promise<ProductEntity> {
    this.logger.log(`${this.getProduct.name}Service Called`)

    const result = await this.productRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }
    return result
  }

  @Transactional()
  async createProduct(
    ctx: RequestContextDto,
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`${this.createProduct.name}Service Called`)
    const { productFeature } = createProductDto

    const result = this.productRepo.create(createProductDto)

    result.userId = ctx.user.id
    const product = await this.productRepo.save(result)

    if (product.id) {
      await this.productFeatureService.createProductFeature(ctx, {
        ...productFeature,
        productId: product.id,
      })
    }

    return product
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
