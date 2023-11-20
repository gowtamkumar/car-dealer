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
import { BrandDto, CreateBrandDto, FilterBrandDto, UpdateBrandDto } from '../dtos'
import { BrandService } from '../services/brand.service'

@Controller('brands')
export class BrandController {
  private logger = new Logger(BrandController.name)

  constructor(private readonly brandService: BrandService) {}

  @Get('/')
  async getBrands(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterBrandDto: FilterBrandDto,
  ): Promise<BaseApiSuccessResponse<BrandDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving brands.`)

    const result = await this.brandService.getBrands(ctx, filterBrandDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of brands`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getBrand(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<BrandDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving brand. Id: ${id}`)

    const result = await this.brandService.getBrand(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Brand of id: ${id}`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createBrand(
    @RequestContext() ctx: RequestContextDto,
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<BaseApiSuccessResponse<BrandDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating brand.`)

    const result = await this.brandService.createBrand(ctx, createBrandDto)

    return {
      success: true,
      statusCode: 201,
      message: `Brand created`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateBrand(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BaseApiSuccessResponse<BrandDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating brand.`)

    const result = await this.brandService.updateBrand(ctx, id, updateBrandDto)

    return {
      success: true,
      statusCode: 200,
      message: `Brand of id ${id} updated`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteBrand(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<BrandDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting brand.`)

    const result = await this.brandService.deleteBrand(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Brand of id ${id} deleted`,
      data: result,
    }
  }
}
