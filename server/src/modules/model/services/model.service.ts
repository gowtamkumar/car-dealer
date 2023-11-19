import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateModelDto, FilterModelDto, UpdateModelDto } from '../dtos'
import { ModelEntity } from '../entities/model.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'

@Injectable()
export class ModelService {
  private logger = new Logger(ModelService.name)

  constructor(
    @InjectRepository(ModelEntity)
    private readonly modelRepo: Repository<ModelEntity>,
  ) {}

  getModels(ctx: RequestContextDto, filterModelDto: FilterModelDto): Promise<ModelEntity[]> {
    this.logger.log(`${this.getModels.name} Service Called`)

    const { status, name, brandId } = filterModelDto

    let query = {} as any
    if (status) query.status = status
    if (name) query.name = name
    if (brandId) query.brandId = brandId

    return this.modelRepo.find({ where: query })
  }

  async getModel(ctx: RequestContextDto, id: string): Promise<ModelEntity> {
    this.logger.log(`${this.getModel.name} Service Called`)

    const result = await this.modelRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Model of id ${id} not found.`)
    }
    return result
  }

  async createModel(ctx: RequestContextDto, createModelDto: CreateModelDto): Promise<ModelEntity> {
    this.logger.log(`${this.createModel.name} Service Called`)

    const result = this.modelRepo.create(createModelDto)
    return this.modelRepo.save(result)
  }

  async updateModel(
    ctx: RequestContextDto,
    id: string,
    updateModelDto: UpdateModelDto,
  ): Promise<ModelEntity> {
    this.logger.log(`${this.updateModel.name} Service Called`)

    const result = await this.modelRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Model of id ${id} not found.`)
    }

    this.modelRepo.merge(result, updateModelDto)
    return await this.modelRepo.save(result)
  }

  async deleteModel(ctx: RequestContextDto, id: string): Promise<ModelEntity> {
    this.logger.log(`${this.deleteModel.name} Service Called`)

    const result = await this.modelRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Model of id ${id} not found.`)
    }

    return this.modelRepo.remove(result)
  }
}
