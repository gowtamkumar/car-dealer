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
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CreateUnionDto, FilterUnionDto, UnionResponseDto, UpdateUnionDto } from '../dtos'
import { UnionEntity } from '../entities/union.entity'
import { UnionService } from '../services/union.service'

@UseGuards(JwtAuthGuard)
@Controller('unions')
export class UnionController {
  private logger = new Logger(UnionController.name)

  constructor(private readonly unionService: UnionService) {}

  @Get('/')
  async getUnions(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterUnionDto: FilterUnionDto,
  ): Promise<BaseApiSuccessResponse<UnionResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user.username}" retriving all Unions. Query: ${JSON.stringify(filterUnionDto)}`,
    )

    const unions = await this.unionService.getUnions(ctx, filterUnionDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Unions`,
      totalRecords: unions.length,
      data: unions,
    }
  }

  @Get('/:id')
  async getUnion(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseApiSuccessResponse<UnionResponseDto>> {
    this.logger.verbose(`User "${ctx.user.username}" retieving Union of id: ${id}`)

    const union = await this.unionService.getUnion(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Details of Union of id: ${id}`,
      data: union,
    }
  }

  @Post('/')
  async createUnion(
    @RequestContext() ctx: RequestContextDto,
    @Body() createUnionDto: CreateUnionDto,
  ): Promise<BaseApiSuccessResponse<UnionResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" creating new Union . Data: ${JSON.stringify(createUnionDto)}`,
    )

    const union = await this.unionService.createUnion(ctx, createUnionDto)

    return {
      success: true,
      statusCode: 201,
      message: `New Union Created`,
      data: union,
    }
  }

  @Put('/:id')
  async updateUnion(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnionDto: UpdateUnionDto,
  ): Promise<BaseApiSuccessResponse<UnionResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" updating Union  of id ${id}. Data: ${JSON.stringify(
        updateUnionDto,
      )}`,
    )

    const union = await this.unionService.updateUnion(ctx, id, updateUnionDto)

    return {
      success: true,
      statusCode: 200,
      message: `Union of id: ${id} updated`,
      data: union,
    }
  }

  @Delete('/:id')
  async deleteUnion(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.logger.verbose(`User "${ctx.user.username}" deleting a Union  of id ${id}.`)

    const union = await this.unionService.deleteUnion(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Union of id: ${id} deleted`,
      data: union,
    }
  }

  @Post('/initiate')
  async initiateUnionData(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<UnionEntity[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" initiate union data.`)

    const unions = await this.unionService.initiateUnionData()

    return {
      success: true,
      statusCode: 200,
      message: `List of  unions`,
      totalRecords: unions.length,
      data: unions,
    }
  }
}
