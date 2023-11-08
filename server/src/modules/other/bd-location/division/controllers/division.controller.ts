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
  CreateDivisionDto,
  DivisionResponseDto,
  FilterDivisionDto,
  UpdateDivisionDto,
} from '../dtos'
import { DivisionEntity } from '../entities/division.entity'
import { DivisionService } from '../services/division.service'

@UseGuards(JwtAuthGuard)
@Controller('divisions')
export class DivisionController {
  private logger = new Logger(DivisionController.name)

  constructor(private readonly divisionService: DivisionService) {}

  @Get('/')
  async getDivisions(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterDivisionDto: FilterDivisionDto,
  ): Promise<BaseApiSuccessResponse<DivisionResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user.username}" retriving all Divisions. Query: ${JSON.stringify(
        filterDivisionDto,
      )}`,
    )

    const divisions = await this.divisionService.getDivisions(ctx, filterDivisionDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Divisions`,
      totalRecords: divisions.length,
      data: divisions,
    }
  }

  @Get('/:id')
  async getDivision(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseApiSuccessResponse<DivisionResponseDto>> {
    this.logger.verbose(`User "${ctx.user.username}" retieving Division of id: ${id}`)

    const division = await this.divisionService.getDivision(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Details of Division of id: ${id}`,
      data: division,
    }
  }

  @Post('/')
  async createDivision(
    @RequestContext() ctx: RequestContextDto,
    @Body() createDivisionDto: CreateDivisionDto,
  ): Promise<BaseApiSuccessResponse<DivisionResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" creating new Division . Data: ${JSON.stringify(
        createDivisionDto,
      )}`,
    )

    const division = await this.divisionService.createDivision(ctx, createDivisionDto)

    return {
      success: true,
      statusCode: 201,
      message: `New Division Created`,
      data: division,
    }
  }

  @Put('/:id')
  async updateDivision(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDivisionDto: UpdateDivisionDto,
  ): Promise<BaseApiSuccessResponse<DivisionResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" updating Division  of id ${id}. Data: ${JSON.stringify(
        updateDivisionDto,
      )}`,
    )

    const division = await this.divisionService.updateDivision(ctx, id, updateDivisionDto)

    return {
      success: true,
      statusCode: 200,
      message: `Division of id: ${id} updated`,
      data: division,
    }
  }

  @Delete('/:id')
  async deleteDivision(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.logger.verbose(`User "${ctx.user.username}" deleting a Division  of id ${id}.`)

    const division = await this.divisionService.deleteDivision(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Division of id: ${id} deleted`,
      data: division,
    }
  }

  // ---

  @Post('/initiate')
  async initiateDivisionData(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<DivisionEntity[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" initiate division data.`)

    const divisions = await this.divisionService.initiateDivisionData()

    return {
      success: true,
      statusCode: 200,
      message: `List of divisions`,
      totalRecords: divisions.length,
      data: divisions,
    }
  }
}
