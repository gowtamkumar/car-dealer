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
import { CreateProductDto, FilterProductDto, ProductDto, UpdateProductDto } from '../dtos'
import { ProductService } from '../services/product.service'

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  private logger = new Logger(ProductController.name)

  constructor(private readonly companyService: ProductService) {}

  @Get('/')
  async getProducts(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterProductDto: FilterProductDto,
  ): Promise<BaseApiSuccessResponse<ProductDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving products.`)

    const result = await this.companyService.getProducts(ctx, filterProductDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Products`,
      data: result,
    }
  }

  @Get('/:id')
  async getProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving company. Id: ${id}`)

    const result = await this.companyService.getProduct(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id: ${id}`,
      data: result,
    }
  }

  @Post('/')
  async createProduct(
    @RequestContext() ctx: RequestContextDto,
    @Body() createProductDto: CreateProductDto,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating company.`)

    const result = await this.companyService.createProduct(ctx, createProductDto)

    return {
      success: true,
      statusCode: 201,
      message: `Product created`,
      data: result,
    }
  }

  @Put('/:id')
  async updateProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating company.`)

    const result = await this.companyService.updateProduct(ctx, id, updateProductDto)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id ${id} updated`,
      data: result,
    }
  }

  @Delete('/:id')
  async deleteProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting company.`)

    const result = await this.companyService.deleteProduct(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id ${id} deleted`,
      data: result,
    }
  }
}
