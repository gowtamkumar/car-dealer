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
import { ModelCodeDto, CreateModelCodeDto, FilterModelCodeDto, UpdateModelCodeDto } from '../dtos'
import { ModelCodeService } from '../services/model-code.service'


@Controller('model-codes')
export class ModelCodeController {
  private logger = new Logger(ModelCodeController.name)

  constructor(private readonly ModelCodeService: ModelCodeService) {}

  @Get('/')
  async getModelCodes(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterModelCodeDto: FilterModelCodeDto,
  ): Promise<BaseApiSuccessResponse<ModelCodeDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving ModelCodes.`)

    const result = await this.ModelCodeService.getModelCodes(ctx, filterModelCodeDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of ModelCodes`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getModelCode(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ModelCodeDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving ModelCode. Id: ${id}`)

    const result = await this.ModelCodeService.getModelCode(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `ModelCode of id: ${id}`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createModelCode(
    @RequestContext() ctx: RequestContextDto,
    @Body() createModelCodeDto: CreateModelCodeDto,
  ): Promise<BaseApiSuccessResponse<ModelCodeDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating ModelCode.`)

    const result = await this.ModelCodeService.createModelCode(ctx, createModelCodeDto)

    return {
      success: true,
      statusCode: 201,
      message: `ModelCode created`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateModelCode(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModelCodeDto: UpdateModelCodeDto,
  ): Promise<BaseApiSuccessResponse<ModelCodeDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating ModelCode.`)

    const result = await this.ModelCodeService.updateModelCode(ctx, id, updateModelCodeDto)

    return {
      success: true,
      statusCode: 200,
      message: `ModelCode of id ${id} updated`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteModelCode(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ModelCodeDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting ModelCode.`)

    const result = await this.ModelCodeService.deleteModelCode(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `ModelCode of id ${id} deleted`,
      data: result,
    }
  }
}
