import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUpazilaDto, FilterUpazilaDto, UpdateUpazilaDto } from '../dtos'
import { UpazilaEntity } from '../entities/upazila.entity'
import fs from 'fs'
import { Repository } from 'typeorm'

@Injectable()
export class UpazilaService {
  private logger = new Logger(UpazilaService.name)

  constructor(
    @InjectRepository(UpazilaEntity)
    private readonly upazilaRepo: Repository<UpazilaEntity>,
  ) {}

  getUpazilas(
    ctx: RequestContextDto,
    filterUpazilaDto: FilterUpazilaDto,
  ): Promise<UpazilaEntity[]> {
    this.logger.log(`${this.getUpazilas.name} called`)

    const { name, bnName } = filterUpazilaDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.upazilaRepo.find({ where: reqQuery, relations: ['district'] })
  }

  getUpazilasWithRelation(
    ctx: RequestContextDto,
    filterUpazilaDto: FilterUpazilaDto,
  ): Promise<UpazilaEntity[]> {
    this.logger.log(`${this.getUpazilas.name} called`)

    const { name, bnName } = filterUpazilaDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.upazilaRepo.find({ where: reqQuery })
  }

  async getUpazila(ctx: RequestContextDto, id: number): Promise<UpazilaEntity> {
    this.logger.log(`${this.getUpazila.name} called`)

    const upazila = await this.upazilaRepo.findOne({ where: { id } })
    if (!upazila) {
      throw new NotFoundException(`Upazila of id ${id} not found.`)
    }

    return upazila
  }

  async createUpazila(
    ctx: RequestContextDto,
    createUpazilaDto: CreateUpazilaDto,
  ): Promise<UpazilaEntity> {
    this.logger.log(`${this.createUpazila.name} called`)

    const upazila = this.upazilaRepo.create(createUpazilaDto)

    await this.upazilaRepo.save(upazila)

    // const logDto = { actionType: LogActionType.Create,  upazilaId: upazila.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return upazila
  }

  async updateUpazila(
    ctx: RequestContextDto,
    id: number,
    updateUpazilaDto: UpdateUpazilaDto,
  ): Promise<UpazilaEntity> {
    this.logger.log(`${this.updateUpazila.name} called`)

    const upazila = await this.getUpazila(ctx, id)
    this.upazilaRepo.merge(upazila, updateUpazilaDto)

    await this.upazilaRepo.save(upazila)

    // const logDto = { actionType: LogActionType.Update,  upazilaId: upazila.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return upazila
  }

  async deleteUpazila(ctx: RequestContextDto, id: number): Promise<UpazilaEntity> {
    this.logger.log(`${this.deleteUpazila.name} called`)

    const upazila = await this.getUpazila(ctx, id)
    this.upazilaRepo.remove(upazila)

    // const logDto = { actionType: LogActionType.Delete,  upazilaId: upazila.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return upazila
  }

  clearUpazilaData() {
    this.logger.log(`${this.clearUpazilaData.name} called`)
    return this.upazilaRepo.clear()
  }

  initiateUpazilaData(): Promise<UpazilaEntity[]> {
    this.logger.log(`${this.initiateUpazilaData.name} called`)

    const upazilaData = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../../../../../mock-data/bd-location/upazilas.json`,
        'utf-8',
      ),
    )
    const upazilas = this.upazilaRepo.create(upazilaData)

    return this.upazilaRepo.save(upazilas)
  }
}
