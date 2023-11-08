import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard'
import { RequestContext } from '@common/decorators/request-context.decorator'
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Controller, Get, Logger, Post, Query, UseGuards } from '@nestjs/common'
import { BdLocationService } from './bd-location.service'

@UseGuards(JwtAuthGuard)
@Controller('bd-locations')
export class BdLocationController {
  private logger = new Logger(BdLocationController.name)

  constructor(private readonly bdLocationService: BdLocationService) {}

  @Get('/')
  async getBdLocation(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<object>> {
    this.logger.verbose(`User "${ctx.user.username}" retriving all Districts.`)

    const bdLocations = await this.bdLocationService.getBdLocation(ctx)

    return {
      success: true,
      statusCode: 200,
      message: `List of BdLocations`,
      totalRecords: bdLocations.length,
      data: bdLocations,
    }
  }

  @Get('/nested')
  async getBdLocationNested(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<object>> {
    this.logger.verbose(`User "${ctx.user.username}" retriving all Districts.`)

    const bdLocations = await this.bdLocationService.getBdLocationNested(ctx)

    return {
      success: true,
      statusCode: 200,
      message: `List of BdLocations`,
      totalRecords: bdLocations.length,
      data: bdLocations,
    }
  }

  @Post('/initiate')
  async initiateBdLocation(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<any>> {
    this.logger.verbose(`User "${ctx.user?.username}" initiate district data.`)

    const bdLocations = await this.bdLocationService.initiateBdLocation(ctx)

    return {
      success: true,
      statusCode: 200,
      message: `List of  bdLocations`,
      totalRecords: bdLocations.length,
      data: bdLocations,
    }
  }
}
