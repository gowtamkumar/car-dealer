import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateSettingDto, FilterSettingDto, UpdateSettingDto } from '../dtos'
import { SettingEntity } from '../entities/setting.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { In, Repository } from 'typeorm'

@Injectable()
export class SettingService {
  private logger = new Logger(SettingService.name)

  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepo: Repository<SettingEntity>,
  ) { }

  

  getSettings(ctx: RequestContextDto, filterSettingDto: FilterSettingDto): Promise<SettingEntity[]> {
    this.logger.log(`${this.getSettings.name} Service Called`)
    return this.settingRepo.find()
  }

  async getSetting(ctx: RequestContextDto, id: string): Promise<SettingEntity> {
    this.logger.log(`${this.getSetting.name} Service Called`)

    const result = await this.settingRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Setting of id ${id} not found.`)
    }
    return result
  }

  async createSetting(ctx: RequestContextDto, createSettingDto: CreateSettingDto): Promise<SettingEntity> {
    this.logger.log(`${this.createSetting.name} Service Called`)

    const result = this.settingRepo.create(createSettingDto)
    return this.settingRepo.save(result)
  }

  async updateSetting(
    ctx: RequestContextDto,
    id: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<SettingEntity> {
    this.logger.log(`${this.updateSetting.name} Service Called`)

    const result = await this.settingRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Setting of id ${id} not found.`)
    }

    this.settingRepo.merge(result, updateSettingDto)
    return await this.settingRepo.save(result)
  }

  async deleteSetting(ctx: RequestContextDto, id: string): Promise<SettingEntity> {
    this.logger.log(`${this.deleteSetting.name} Service Called`)

    const result = await this.settingRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Setting of id ${id} not found.`)
    }

    return this.settingRepo.remove(result)
  }
}
