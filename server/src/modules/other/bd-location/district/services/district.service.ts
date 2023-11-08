import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateDistrictDto, FilterDistrictDto, UpdateDistrictDto } from '../dtos'
import { DistrictEntity } from '../entities/district.entity'
import fs from 'fs'
import { Repository } from 'typeorm'

@Injectable()
export class DistrictService {
  private logger = new Logger(DistrictService.name)

  constructor(
    @InjectRepository(DistrictEntity)
    private readonly districtRepo: Repository<DistrictEntity>,
  ) {}

  getDistricts(
    ctx: RequestContextDto,
    filterDistrictDto: FilterDistrictDto,
  ): Promise<DistrictEntity[]> {
    this.logger.log(`${this.getDistricts.name} called`)

    const { name, bnName } = filterDistrictDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.districtRepo.find({ where: reqQuery })
  }

  async getDistrictsNested(ctx: RequestContextDto): Promise<DistrictEntity[]> {
    this.logger.log(`${this.getDistricts.name} called`)
    const start = process.hrtime()

    const qb = this.districtRepo
      .createQueryBuilder('district')
      .select([
        'district.id',
        'district.name',
        'upazilas.id',
        'upazilas.name',
        'unions.id',
        'unions.name',
      ])

      .leftJoin('district.upazilas', 'upazilas')
      .leftJoin('upazilas.unions', 'unions')

    const result = await qb.getMany()

    const stop = process.hrtime(start)
    this.logger.log(`Getting nested district took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`)

    return result
  }

  getDistrictsWithRelation(
    ctx: RequestContextDto,
    filterDistrictDto: FilterDistrictDto,
  ): Promise<DistrictEntity[]> {
    this.logger.log(`${this.getDistricts.name} called`)

    const { name, bnName } = filterDistrictDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.districtRepo.find({ where: reqQuery, relations: ['upazilas', 'upazilas.unions'] })
  }

  async getDistrict(ctx: RequestContextDto, id: number): Promise<DistrictEntity> {
    this.logger.log(`${this.getDistrict.name} called`)

    const district = await this.districtRepo.findOne({ where: { id } })
    if (!district) {
      throw new NotFoundException(`District of id ${id} not found.`)
    }

    return district
  }

  async createDistrict(
    ctx: RequestContextDto,
    createDistrictDto: CreateDistrictDto,
  ): Promise<DistrictEntity> {
    this.logger.log(`${this.createDistrict.name} called`)

    const district = this.districtRepo.create(createDistrictDto)

    await this.districtRepo.save(district)

    // const logDto = { actionType: LogActionType.Create,  districtId: district.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return district
  }

  async updateDistrict(
    ctx: RequestContextDto,
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<DistrictEntity> {
    this.logger.log(`${this.updateDistrict.name} called`)

    const district = await this.getDistrict(ctx, id)
    this.districtRepo.merge(district, updateDistrictDto)

    await this.districtRepo.save(district)

    // const logDto = { actionType: LogActionType.Update,  districtId: district.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return district
  }

  async deleteDistrict(ctx: RequestContextDto, id: number): Promise<DistrictEntity> {
    this.logger.log(`${this.deleteDistrict.name} called`)

    const district = await this.getDistrict(ctx, id)
    this.districtRepo.remove(district)

    // const logDto = { actionType: LogActionType.Delete,  districtId: district.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return district
  }

  clearDistrictData() {
    this.logger.log(`${this.clearDistrictData.name} called`)
    return this.districtRepo.clear()
  }

  async initiateDistrictData(): Promise<DistrictEntity[]> {
    this.logger.log(`${this.initiateDistrictData.name} called`)

    // await this.districtRepo.clear()
    // this.logger.log(`District data cleared`);
    const districtData = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../../../../../mock-data/bd-location/districts.json`,
        'utf-8',
      ),
    )
    const districts = this.districtRepo.create(districtData)

    return this.districtRepo.save(districts)
  }
}
