import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard'
import { RequestContext } from '@common/decorators/request-context.decorator'
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { SettingDto, CreateSettingDto, FilterSettingDto, UpdateSettingDto } from '../dtos'
import { SettingService } from '../services/setting.service'

@UseGuards(JwtAuthGuard)
@Controller('Settings')
export class SettingController {
  private logger = new Logger(SettingController.name)

  constructor(private readonly settingService: SettingService) {}

  @Get('/')
  async getSettings(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterSettingDto: FilterSettingDto,
  ): Promise<BaseApiSuccessResponse<SettingDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Settings.`)

    const result = await this.settingService.getSettings(ctx, filterSettingDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Settings`,
      data: result,
    }
  }

  @Get('/:id')
  async getSetting(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<SettingDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Setting. Id: ${id}`)

    const result = await this.settingService.getSetting(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Setting of id: ${id}`,
      data: result,
    }
  }

  @Post('/')
  async createSetting(
    @RequestContext() ctx: RequestContextDto,
    @Body() createSettingDto: CreateSettingDto,
  ): Promise<BaseApiSuccessResponse<SettingDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating Setting.`)

    const result = await this.settingService.createSetting(ctx, createSettingDto)

    return {
      success: true,
      statusCode: 201,
      message: `Setting created`,
      data: result,
    }
  }

  @Put('/:id')
  async updateSetting(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<BaseApiSuccessResponse<SettingDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Setting.`)

    const result = await this.settingService.updateSetting(ctx, id, updateSettingDto)

    return {
      success: true,
      statusCode: 200,
      message: `Setting of id ${id} updated`,
      data: result,
    }
  }

  @Delete('/:id')
  async deleteSetting(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<SettingDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting Setting.`)

    const result = await this.settingService.deleteSetting(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Setting of id ${id} deleted`,
      data: result,
    }
  }
}
