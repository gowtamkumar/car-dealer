import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateModelCodeDto, FilterModelCodeDto, UpdateModelCodeDto } from '../dtos'
import { ModelCodeEntity } from '../entities/model-code.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'

@Injectable()
export class ModelCodeService {
  private logger = new Logger(ModelCodeService.name)

  constructor(
    @InjectRepository(ModelCodeEntity)
    private readonly modelCodeRepo: Repository<ModelCodeEntity>,
  ) { }

  getModelCodes(ctx: RequestContextDto, filterModelCodeDto: FilterModelCodeDto): Promise<ModelCodeEntity[]> {
    this.logger.log(`${this.getModelCodes.name} Service Called`)

    const { name, modelId } = filterModelCodeDto

    let query = {} as any
    if (name) query.name = name
    if (modelId) query.modelId = modelId

    return this.modelCodeRepo.find({ where: query ,relations: ['model']})
  }

  async getModelCode(ctx: RequestContextDto, id: string): Promise<ModelCodeEntity> {
    this.logger.log(`${this.getModelCode.name} Service Called`)

    const result = await this.modelCodeRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`ModelCode of id ${id} not found.`)
    }
    return result
  }

  async createModelCode(ctx: RequestContextDto, createModelCodeDto: CreateModelCodeDto): Promise<ModelCodeEntity> {
    this.logger.log(`${this.createModelCode.name} Service Called`)

    const result = this.modelCodeRepo.create(createModelCodeDto)
    return this.modelCodeRepo.save(result)
  }

  async updateModelCode(
    ctx: RequestContextDto,
    id: string,
    updateModelCodeDto: UpdateModelCodeDto,
  ): Promise<ModelCodeEntity> {
    this.logger.log(`${this.updateModelCode.name} Service Called`)

    const result = await this.modelCodeRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`ModelCode of id ${id} not found.`)
    }

    this.modelCodeRepo.merge(result, updateModelCodeDto)
    return await this.modelCodeRepo.save(result)
  }

  async deleteModelCode(ctx: RequestContextDto, id: string): Promise<ModelCodeEntity> {
    this.logger.log(`${this.deleteModelCode.name} Service Called`)

    const result = await this.modelCodeRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`ModelCode of id ${id} not found.`)
    }

    return this.modelCodeRepo.remove(result)
  }
}
