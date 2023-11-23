import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos'
import { ProductEntity } from '../entities/product.entity'
import { ProductFeatureService } from '@modules/product-feature/services/product-feature.service'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { UpdateProductFeatureDto } from '@modules/product-feature/dtos'
import moment from 'moment'


@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name)

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly productFeatureService: ProductFeatureService,
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
      cdPlayer,
      sunRoof,
      alloyWheels,
      powerSteering,
      powerWindow,
      ac,
      abs,
      airBag,
      radio,
      cdChanger,
      dvd,
      tv,
      powerSeat,
      backTire,
      grillGuard,
      rearSpoiler,
      centerLocking,
      jack,
      spareTire,
      wheelSpanner,
      fogLight,
      backCamera,
      pushStart,
      keyLessentry,
      esc,
      camera360d,
      bodyKit,
      sideAirbag,
      powerMirror,
      sideSkirts,
      fontLipSpoiler,
      navigation,
      turbo,
      nonSmoker,
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
    qb.select(['product', 'productFeature', 'brand.name', 'model.name', 'modelCode.name'])
    qb.leftJoin('product.productFeature', 'productFeature')
    qb.leftJoin('product.brand', 'brand')
    qb.leftJoin('product.model', 'model')
    qb.leftJoin('product.modelCode', 'modelCode')

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

    // product feature query
    if (cdPlayer) qb.andWhere('productFeature.cdPlayer =:cdPlayer', { cdPlayer: true })
    if (sunRoof) qb.andWhere('productFeature.sunRoof =:sunRoof', { sunRoof: true })
    if (alloyWheels) qb.andWhere('productFeature.alloyWheels =:alloyWheels', { alloyWheels: true })
    if (powerSteering)
      qb.andWhere('productFeature.powerSteering =:powerSteering', { powerSteering: true })
    if (powerWindow) qb.andWhere('productFeature.powerWindow =:powerWindow', { powerWindow: true })
    if (ac) qb.andWhere('productFeature.ac =:ac', { ac: true })
    if (abs) qb.andWhere('productFeature.abs =:abs', { abs: true })
    if (airBag) qb.andWhere('productFeature.airBag =:airBag', { airBag: true })
    if (radio) qb.andWhere('productFeature.radio =:radio', { radio: true })
    if (cdChanger) qb.andWhere('productFeature.cdChanger =:cdChanger', { cdChanger: true })
    if (dvd) qb.andWhere('productFeature.dvd =:dvd', { dvd: true })
    if (tv) qb.andWhere('productFeature.tv =:tv', { tv: true })
    if (powerSeat) qb.andWhere('productFeature.powerSeat =:powerSeat', { powerSeat: true })
    if (backTire) qb.andWhere('productFeature.backTire =:backTire', { backTire: true })
    if (grillGuard) qb.andWhere('productFeature.grillGuard =:grillGuard', { grillGuard: true })
    if (rearSpoiler) qb.andWhere('productFeature.rearSpoiler =:rearSpoiler', { rearSpoiler: true })
    if (centerLocking)
      qb.andWhere('productFeature.centerLocking =:centerLocking', { centerLocking: true })
    if (jack) qb.andWhere('productFeature.jack =:jack', { jack: true })
    if (spareTire) qb.andWhere('productFeature.spareTire =:spareTire', { spareTire: true })
    if (wheelSpanner)
      qb.andWhere('productFeature.wheelSpanner =:wheelSpanner', { wheelSpanner: true })
    if (fogLight) qb.andWhere('productFeature.fogLight =:fogLight', { fogLight: true })
    if (backCamera) qb.andWhere('productFeature.backCamera =:backCamera', { backCamera: true })
    if (pushStart) qb.andWhere('productFeature.pushStart =:pushStart', { pushStart: true })
    if (keyLessentry)
      qb.andWhere('productFeature.keyLessentry =:keyLessentry', { keyLessentry: true })
    if (esc) qb.andWhere('productFeature.esc =:esc', { esc: true })
    if (camera360d) qb.andWhere('productFeature.camera360d =:camera360d', { camera360d: true })
    if (bodyKit) qb.andWhere('productFeature.bodyKit =:bodyKit', { bodyKit: true })
    if (sideAirbag) qb.andWhere('productFeature.sideAirbag =:sideAirbag', { sideAirbag: true })
    if (powerMirror) qb.andWhere('productFeature.powerMirror =:powerMirror', { powerMirror: true })
    if (sideSkirts) qb.andWhere('productFeature.sideSkirts =:sideSkirts', { sideSkirts: true })
    if (fontLipSpoiler)
      qb.andWhere('productFeature.fontLipSpoiler =:fontLipSpoiler', { fontLipSpoiler: true })
    if (navigation) qb.andWhere('productFeature.navigation =:navigation', { navigation: true })
    if (turbo) qb.andWhere('productFeature.turbo =:turbo', { turbo: true })
    if (nonSmoker) qb.andWhere('productFeature.nonSmoker =:nonSmoker', { nonSmoker: true })

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
      'productFeature',
      'brand.name',
      'model.name',
      'modelCode.name',
    ])
    qb.leftJoin('product.productFeature', 'productFeature')
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
      'productFeature',
      'brand.name',
      'model.name',
      'modelCode.name',
    ])
    qb.leftJoin('product.productFeature', 'productFeature')
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
  async getUsedExpireDeleteProducts(
    ctx: RequestContextDto,
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    this.logger.log(`${this.getUsedExpireDeleteProducts.name}Service Called`)
    const { condition } = filterProductDto



    // if(currentDate.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
    //     futureMonth = futureMonth.add(1, 'd');
    // }

    // console.log(currentDate);
    // console.log(futureMonth);





    // service time Start
    const start = process.hrtime()
    const qb = this.productRepo.createQueryBuilder('product')
    if (condition) qb.andWhere({ condition })




    // console.log("🚀 ~ ProductService ~ futureMonthEnd:", futureMonthEnd)

    const result = await qb.getMany()
    // console.log("🚀 ~ ProductService ~ result:", result)

    //    const fil = result.filter(item => {
    //       const today = moment()
    //       console.log("🚀 ~ ProductService ~ today:", today)
    //       const futureMonth = moment(item.createdAt).add(1, 'M');
    //       const futureMonthEnd = moment(futureMonth).endOf('month');
    //       return today <= futureMonthEnd
    //     })
    // console.log(fil);

    // Delete all used expire car
    // await this.productRepo.remove(result)

    const stop = process.hrtime(start)
    this.logger.log(`Time of getting Related Delete Expire Products   ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`) //time end

    return result
  }

  @Transactional()
  async createProduct(
    ctx: RequestContextDto,
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`${this.createProduct.name} Service Called`)
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

    if (productFeature) {
      await this.productFeatureService.updateProductFeatureById(
        ctx,
        id,
        productFeature as UpdateProductFeatureDto,
      )
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
