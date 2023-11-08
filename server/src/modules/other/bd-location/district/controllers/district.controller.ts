import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard'
import { RequestContext } from '@common/decorators/request-context.decorator'
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  CreateDistrictDto,
  DistrictResponseDto,
  FilterDistrictDto,
  UpdateDistrictDto,
} from '../dtos'
import { DistrictEntity } from '../entities/district.entity'
import { DistrictService } from '../services/district.service'

@UseGuards(JwtAuthGuard)
@Controller('districts')
export class DistrictController {
  private logger = new Logger(DistrictController.name)

  constructor(private readonly districtService: DistrictService) {}

  @Get('/')
  async getDistricts(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterDistrictDto: FilterDistrictDto,
  ): Promise<BaseApiSuccessResponse<DistrictResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user.username}" retriving all Districts. Query: ${JSON.stringify(
        filterDistrictDto,
      )}`,
    )

    const districts = await this.districtService.getDistricts(ctx, filterDistrictDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Districts`,
      totalRecords: districts.length,
      data: districts,
    }
  }

  @Get('/:id')
  async getDistrict(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseApiSuccessResponse<DistrictResponseDto>> {
    this.logger.verbose(`User "${ctx.user.username}" retieving District of id: ${id}`)

    const district = await this.districtService.getDistrict(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Details of District of id: ${id}`,
      data: district,
    }
  }

  @Post('/')
  async createDistrict(
    @RequestContext() ctx: RequestContextDto,
    @Body() createDistrictDto: CreateDistrictDto,
  ): Promise<BaseApiSuccessResponse<DistrictResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" creating new District . Data: ${JSON.stringify(
        createDistrictDto,
      )}`,
    )

    const district = await this.districtService.createDistrict(ctx, createDistrictDto)

    return {
      success: true,
      statusCode: 201,
      message: `New District Created`,
      data: district,
    }
  }

  @Put('/:id')
  async updateDistrict(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<BaseApiSuccessResponse<DistrictResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" updating District  of id ${id}. Data: ${JSON.stringify(
        updateDistrictDto,
      )}`,
    )

    const district = await this.districtService.updateDistrict(ctx, id, updateDistrictDto)

    return {
      success: true,
      statusCode: 200,
      message: `District of id: ${id} updated`,
      data: district,
    }
  }

  @Delete('/:id')
  async deleteDistrict(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.logger.verbose(`User "${ctx.user.username}" deleting a District  of id ${id}.`)

    const district = await this.districtService.deleteDistrict(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `District of id: ${id} deleted`,
      data: district,
    }
  }

  @Post('/initiate')
  async initiateDistrictData(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<DistrictEntity[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" initiate district data.`)

    const districts = await this.districtService.initiateDistrictData()

    return {
      success: true,
      statusCode: 200,
      message: `List of  districts`,
      totalRecords: districts.length,
      data: districts,
    }
  }
}
