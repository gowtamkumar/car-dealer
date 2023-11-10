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
import { ModelDto, CreateModelDto, FilterModelDto, UpdateModelDto } from '../dtos'
import { ModelService } from '../services/model.service'

@UseGuards(JwtAuthGuard)
@Controller('models')
export class ModelController {
  private logger = new Logger(ModelController.name)

  constructor(private readonly modelService: ModelService) {}

  @Get('/')
  async getModels(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterModelDto: FilterModelDto,
  ): Promise<BaseApiSuccessResponse<ModelDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Models.`)

    const result = await this.modelService.getModels(ctx, filterModelDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Models`,
      data: result,
    }
  }

  @Get('/:id')
  async getModel(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ModelDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Model. Id: ${id}`)

    const result = await this.modelService.getModel(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Model of id: ${id}`,
      data: result,
    }
  }

  @Post('/')
  async createModel(
    @RequestContext() ctx: RequestContextDto,
    @Body() createModelDto: CreateModelDto,
  ): Promise<BaseApiSuccessResponse<ModelDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating Model.`)

    const result = await this.modelService.createModel(ctx, createModelDto)

    return {
      success: true,
      statusCode: 201,
      message: `Model created`,
      data: result,
    }
  }

  @Put('/:id')
  async updateModel(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModelDto: UpdateModelDto,
  ): Promise<BaseApiSuccessResponse<ModelDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Model.`)

    const result = await this.modelService.updateModel(ctx, id, updateModelDto)

    return {
      success: true,
      statusCode: 200,
      message: `Model of id ${id} updated`,
      data: result,
    }
  }

  @Delete('/:id')
  async deleteModel(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ModelDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting Model.`)

    const result = await this.modelService.deleteModel(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Model of id ${id} deleted`,
      data: result,
    }
  }
}
