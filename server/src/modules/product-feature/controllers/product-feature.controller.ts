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
import {
  ProductFeatureDto,
  CreateProductFeatureDto,
  FilterProductFeatureDto,
  UpdateProductFeatureDto,
} from '../dtos'
import { ProductFeatureService } from '../services/product-feature.service'

@UseGuards(JwtAuthGuard)
@Controller('product-features')
export class ProductFeatureController {
  private logger = new Logger(ProductFeatureController.name)

  constructor(private readonly productFeatureService: ProductFeatureService) {}

  @Get('/')
  async getProductFeatures(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterProductFeatureDto: FilterProductFeatureDto,
  ): Promise<BaseApiSuccessResponse<ProductFeatureDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Product Features.`)

    const result = await this.productFeatureService.getProductFeatures(ctx, filterProductFeatureDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Product Features`,
      data: result,
    }
  }

  @Get('/:id')
  async getProductFeature(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductFeatureDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving ProductFeature. Id: ${id}`)

    const result = await this.productFeatureService.getProductFeature(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product Feature of id: ${id}`,
      data: result,
    }
  }

  @Post('/')
  async createProductFeature(
    @RequestContext() ctx: RequestContextDto,
    @Body() createProductFeatureDto: CreateProductFeatureDto,
  ): Promise<BaseApiSuccessResponse<ProductFeatureDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating ProductFeature.`)

    const result = await this.productFeatureService.createProductFeature(
      ctx,
      createProductFeatureDto,
    )

    return {
      success: true,
      statusCode: 201,
      message: `Product Feature created`,
      data: result,
    }
  }

  @Put('/:id')
  async updateProductFeature(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductFeatureDto: UpdateProductFeatureDto,
  ): Promise<BaseApiSuccessResponse<ProductFeatureDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating ProductFeature.`)

    const result = await this.productFeatureService.updateProductFeature(
      ctx,
      id,
      updateProductFeatureDto,
    )

    return {
      success: true,
      statusCode: 200,
      message: `Product Feature of id ${id} updated`,
      data: result,
    }
  }

  @Delete('/:id')
  async deleteProductFeature(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductFeatureDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting ProductFeature.`)

    const result = await this.productFeatureService.deleteProductFeature(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product Feature of id ${id} deleted`,
      data: result,
    }
  }
}
