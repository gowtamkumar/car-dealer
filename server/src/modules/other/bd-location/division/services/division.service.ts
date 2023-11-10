import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateDivisionDto, FilterDivisionDto, UpdateDivisionDto } from '../dtos'
import { DivisionEntity } from '../entities/division.entity'
import fs from 'fs'
import { Repository } from 'typeorm'

@Injectable()
export class DivisionService {
  private logger = new Logger(DivisionService.name)

  constructor(
    @InjectRepository(DivisionEntity)
    private readonly divisionRepo: Repository<DivisionEntity>,
  ) {}

  getDivisions(
    ctx: RequestContextDto,
    filterDivisionDto: FilterDivisionDto,
  ): Promise<DivisionEntity[]> {
    this.logger.log(`${this.getDivisions.name} called`)

    const { name, bnName } = filterDivisionDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.divisionRepo.find({ where: reqQuery })
  }

  getDivisionsWithRelation(
    ctx: RequestContextDto,
    filterDivisionDto: FilterDivisionDto,
  ): Promise<DivisionEntity[]> {
    this.logger.log(`${this.getDivisions.name} called`)

    const { name, bnName } = filterDivisionDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.divisionRepo.find({ where: reqQuery })
  }

  async getDivision(ctx: RequestContextDto, id: number): Promise<DivisionEntity> {
    this.logger.log(`${this.getDivision.name} called`)

    const division = await this.divisionRepo.findOne({ where: { id } })
    if (!division) {
      throw new NotFoundException(`Division of id ${id} not found.`)
    }

    return division
  }

  async createDivision(
    ctx: RequestContextDto,
    createDivisionDto: CreateDivisionDto,
  ): Promise<DivisionEntity> {
    this.logger.log(`${this.createDivision.name} called`)

    const division = this.divisionRepo.create(createDivisionDto)

    await this.divisionRepo.save(division)

    // const logDto = { actionType: LogActionType.Create,  divisionId: division.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return division
  }

  async updateDivision(
    ctx: RequestContextDto,
    id: number,
    updateDivisionDto: UpdateDivisionDto,
  ): Promise<DivisionEntity> {
    this.logger.log(`${this.updateDivision.name} called`)

    const division = await this.getDivision(ctx, id)
    this.divisionRepo.merge(division, updateDivisionDto)

    await this.divisionRepo.save(division)

    // const logDto = { actionType: LogActionType.Update,  divisionId: division.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return division
  }

  async deleteDivision(ctx: RequestContextDto, id: number): Promise<DivisionEntity> {
    this.logger.log(`${this.deleteDivision.name} called`)

    const division = await this.divisionRepo.findOne({ where: { id } })
    this.divisionRepo.remove(division)

    // const logDto = { actionType: LogActionType.Delete,  divisionId: division.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return division
  }

  clearDivisionData() {
    this.logger.log(`${this.clearDivisionData.name} called`)
    return this.divisionRepo.clear()
  }

  initiateDivisionData(): Promise<DivisionEntity[]> {
    this.logger.log(`${this.initiateDivisionData.name} called`)

    const divisionData = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../../../../../mock-data/bd-location/divisions.json`,
        'utf-8',
      ),
    )    

    const divisions = this.divisionRepo.create(divisionData)

    return this.divisionRepo.save(divisions)
  }
}
