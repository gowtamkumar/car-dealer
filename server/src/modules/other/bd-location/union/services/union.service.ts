import { Repository } from 'typeorm'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUnionDto, FilterUnionDto, UpdateUnionDto } from '../dtos'
import { UnionEntity } from '../entities/union.entity'
import fs from 'fs'

@Injectable()
export class UnionService {
  private logger = new Logger(UnionService.name)

  constructor(@InjectRepository(UnionEntity) private readonly unionRepo: Repository<UnionEntity>) {}

  getUnions(ctx: RequestContextDto, filterUnionDto: FilterUnionDto): Promise<UnionEntity[]> {
    this.logger.log(`${this.getUnions.name} called`)

    const { name, bnName } = filterUnionDto

    const reqQuery: any = {}

    if (name) reqQuery.name = name
    if (bnName) reqQuery.bnName = bnName

    return this.unionRepo.find({ where: reqQuery, relations: ['upazila'] })
  }

  async getUnion(ctx: RequestContextDto, id: number): Promise<UnionEntity> {
    this.logger.log(`${this.getUnion.name} called`)

    const union = await this.unionRepo.findOne({ where: { id } })
    if (!union) {
      throw new NotFoundException(`Union of id ${id} not found.`)
    }

    return union
  }

  async createUnion(ctx: RequestContextDto, createUnionDto: CreateUnionDto): Promise<UnionEntity> {
    this.logger.log(`${this.createUnion.name} called`)

    const union = this.unionRepo.create(createUnionDto)

    await this.unionRepo.save(union)

    // const logDto = { actionType: LogActionType.Create,  unionId: union.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return union
  }

  async updateUnion(
    ctx: RequestContextDto,
    id: number,
    updateUnionDto: UpdateUnionDto,
  ): Promise<UnionEntity> {
    this.logger.log(`${this.updateUnion.name} called`)

    const union = await this.getUnion(ctx, id)
    this.unionRepo.merge(union, updateUnionDto)

    await this.unionRepo.save(union)

    // const logDto = { actionType: LogActionType.Update,  unionId: union.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return union
  }

  async deleteUnion(ctx: RequestContextDto, id: number): Promise<UnionEntity> {
    this.logger.log(`${this.deleteUnion.name} called`)

    const union = await this.getUnion(ctx, id)
    this.unionRepo.remove(union)

    // const logDto = { actionType: LogActionType.Delete,  unionId: union.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return union
  }

  clearUnionData() {
    this.logger.log(`${this.clearUnionData.name} called`)
    return this.unionRepo.clear()
  }

  initiateUnionData(): Promise<UnionEntity[]> {
    this.logger.log(`${this.initiateUnionData.name} called`)

    const unionData = JSON.parse(
      fs.readFileSync(`${__dirname}/../../../../../../mock-data/bd-location/unions.json`, 'utf-8'),
    )
    const unions = this.unionRepo.create(unionData)

    return this.unionRepo.save(unions)
  }
}
