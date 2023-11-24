import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos'
import { ProductEntity } from '../entities/product.entity'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import moment, { months } from 'moment'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ConditionEnum } from '../enums'


@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name)

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) { }

  async getProducts(
    ctx: RequestContextDto,
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    this.logger.log(`${this.getProducts.name}Service Called`)
    const {
      search,
      condition,
      registrationDate,
      fuelType,
      transmission,
      bodyType,
      steering,
      color,
      auction,
      brandId,
      modelCodeId,
      modelId,
      manufactureDate,
      productFeature,
      // cdPlayer,
      // sunRoof,
      // alloyWheels,
      // powerSteering,
      // powerWindow,
      // ac,
      // abs,
      // airBag,
      // radio,
      // cdChanger,
      // dvd,
      // tv,
      // powerSeat,
      // backTire,
      // grillGuard,
      // rearSpoiler,
      // centerLocking,
      // jack,
      // spareTire,
      // wheelSpanner,
      // fogLight,
      // backCamera,
      // pushStart,
      // keyLessentry,
      // esc,
      // camera360d,
      // bodyKit,
      // sideAirbag,
      // powerMirror,
      // sideSkirts,
      // fontLipSpoiler,
      // navigation,
      // turbo,
      // nonSmoker,
      minEngCc,
      maxEngCc,
      minLoadCapacity,
      maxLoadCapacity,
      minMilleage,
      maxMilleage,
      minNoOfPass,
      maxNoOfPass,
      minPrice,
      maxPrice,
    } = filterProductDto

   


    // service time Start
    const start = process.hrtime()
    const qb = this.productRepo.createQueryBuilder('product')
    qb.select(['product', 'brand.name', 'model.name', 'modelCode.name', 'user'])
    qb.leftJoin('product.brand', 'brand')
    qb.leftJoin('product.user', 'user')
    qb.leftJoin('product.model', 'model')
    qb.leftJoin('product.modelCode', 'modelCode')

    if (productFeature) qb.andWhere('product.productFeature IN (:productFeatures)', { productFeatures: productFeature })

    if (condition) qb.andWhere({ condition })
    if (auction) qb.andWhere({ auction })
    if (brandId) qb.andWhere({ brandId })
    if (modelCodeId) qb.andWhere({ modelCodeId })
    if (modelId) qb.andWhere({ modelId })
    if (manufactureDate) qb.andWhere({ manufactureDate })
    if (registrationDate) qb.andWhere({ registrationDate })
    if (fuelType) qb.andWhere({ fuelType })
    if (transmission) qb.andWhere({ transmission })
    if (bodyType) qb.andWhere({ bodyType })
    if (steering) qb.andWhere({ steering })
    if (color) qb.andWhere({ color })
    if (minPrice && maxPrice) qb.andWhere(`product.price BETWEEN ${minPrice} AND ${maxPrice}`)
    if (minNoOfPass && maxNoOfPass)
      qb.andWhere(`product.noOfPass BETWEEN ${minNoOfPass} AND ${maxNoOfPass}`)

    if (minMilleage && maxMilleage)
      qb.andWhere(`product.milleage BETWEEN ${minMilleage} AND ${maxMilleage}`)

    if (minLoadCapacity && maxLoadCapacity)
      qb.andWhere(`product.loadCapacity BETWEEN ${minLoadCapacity} AND ${maxLoadCapacity}`)

    if (minEngCc && maxEngCc) qb.andWhere(`product.engCc BETWEEN ${minEngCc} AND ${maxEngCc}`)

    if (search) {
      qb.andWhere(
        new Brackets((db) => {
          db.where('LOWER(product.name) ILIKE LOWER(:search)', { search: `%${search}%` })
          db.where('LOWER(product.description) ILIKE LOWER(:search)', { search: `%${search}%` })
          db.orWhere('LOWER(brand.name) ILIKE LOWER(:search)', { search: `%${search}%` })
          db.orWhere('LOWER(model.name) ILIKE LOWER(:search)', { search: `%${search}%` })
          db.orWhere('LOWER(modelCode.name) ILIKE LOWER(:search)', { search: `%${search}%` })
        }),
      )
    }

    const result = await qb.getMany()

    const stop = process.hrtime(start)
    this.logger.log(`Time of getting Products   ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`) //time end

    return result
  }

  async getProduct(ctx: RequestContextDto, id: string): Promise<ProductEntity> {
    this.logger.log(`${this.getProduct.name}Service Called`)

    const qb = this.productRepo.createQueryBuilder('product')
    qb.select([
      'product',
      'brand.name',
      'model.name',
      'modelCode.name',
    ])
    qb.leftJoin('product.brand', 'brand')
    qb.leftJoin('product.model', 'model')
    qb.leftJoin('product.modelCode', 'modelCode')
    qb.where({ id })
    const result = await qb.getOne()
    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }
    return result
  }

  async getRelatedProduct(ctx: RequestContextDto, id: string): Promise<any> {
    this.logger.log(`${this.getRelatedProduct.name}Service Called`)

    const qb = this.productRepo.createQueryBuilder('product')
    qb.select([
      'product',
      'brand.name',
      'model.name',
      'modelCode.name',
    ])

    qb.leftJoin('product.brand', 'brand')
    qb.leftJoin('product.model', 'model')
    qb.leftJoin('product.modelCode', 'modelCode')
    qb.where({ id })

    const result = await qb.getOne()

    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }

    const rProducts = await this.getRelatedProducts(ctx, {
      condition: result.condition,
    } as FilterProductDto)

    return {
      ...result,
      relatedProducts: rProducts,
    }
  }

  // this function used only realated in function
  async getRelatedProducts(
    ctx: RequestContextDto,
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    this.logger.log(`${this.getRelatedProducts.name}Service Called`)
    const { condition } = filterProductDto

    // service time Start
    const start = process.hrtime()
    const qb = this.productRepo.createQueryBuilder('product')
    qb.limit(8)
    if (condition) qb.andWhere({ condition })

    const result = await qb.getMany()

    const stop = process.hrtime(start)
    this.logger.log(`Time of getting Related Products   ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`) //time end

    return result
  }




  // delele all used expire car
  @Cron(CronExpression.EVERY_10_HOURS, {
    name: "ExpireProductDelete",
    timeZone: 'Asia/Dhaka'
  })
  async expireUsedProductDeleteByCronJob(
    ctx: RequestContextDto,
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    this.logger.debug('Expire Used Products Delete by Cron job');

    // service time Start
    const start = process.hrtime()
    const qb = this.productRepo.createQueryBuilder('product')
    qb.andWhere({ condition: ConditionEnum.Used })

    const result = await qb.getMany()

    // this map filter data for 1 month after delete query
    const filterData = result?.filter(item => {
      const today = moment().format('MM-DD-YYYY')
      const futureMonth = moment(item.createdAt).add(1, 'M').format('MM-DD-YYYY')
      return futureMonth < today
    })
    // console.log(filterData);

    // Delete all used expire car
    await this.productRepo.remove(filterData)

    const stop = process.hrtime(start)
    this.logger.log(`Time of getting Related Delete Expire Products   ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`) //time end

    return filterData
  }

  @Transactional()
  async createProduct(
    ctx: RequestContextDto,
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`${this.createProduct.name} Service Called`)

    // return

    const result = this.productRepo.create(createProductDto)

    result.userId = ctx.user.id
    const product = await this.productRepo.save(result)

    return product
  }

  @Transactional()
  async updateProduct(
    ctx: RequestContextDto,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`${this.updateProduct.name} Service Called`)
    const { productFeature } = updateProductDto

    const result = await this.productRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Product of id ${id} not found`)
    }

    // if (productFeature) {
    //   await this.productFeatureService.updateProductFeatureById(
    //     ctx,
    //     id,
    //     productFeature as UpdateProductFeatureDto,
    //   )
    // }

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
