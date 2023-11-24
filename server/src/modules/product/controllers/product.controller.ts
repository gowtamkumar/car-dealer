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

@Controller('products')
export class ProductController {
  private logger = new Logger(ProductController.name)

  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterProductDto: any,
  ): Promise<BaseApiSuccessResponse<ProductDto[]>> {
    console.log("🚀 ~ ProductController ~ filterProductDto:", filterProductDto)
 
    this.logger.verbose(`User "${ctx.user?.username}" retieving products.`)

    const result = await this.productService.getProducts(ctx, filterProductDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Products`,
      totalRecords: result.length,
      data: result,
    }
  }
  
  // @UseGuards(JwtAuthGuard)
  // @Get('/delete-expire')
  // async getUsedExpireDeleteProducts(
  //   @RequestContext() ctx: RequestContextDto,
  //   @Query() filterProductDto: FilterProductDto,
  // ): Promise<BaseApiSuccessResponse<ProductDto[]>> {
  //   this.logger.verbose(`User "${ctx.user?.username}" retieving products.`)

  //   const result = await this.productService.getUsedExpireDeleteProducts(ctx, filterProductDto)

  //   return {
  //     success: true,
  //     statusCode: 200,
  //     message: `Delete all used expired products`,
  //     totalRecords: result.length,
  //     data: result,
  //   }
  // }


  @Get('/:id')
  async getProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving product. Id: ${id}`)

    const result = await this.productService.getProduct(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id: ${id}`,
      data: result,
    }
  }

  @Get('/related/:id')
  async getRelatedProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving product. Id: ${id}`)

    const result = await this.productService.getRelatedProduct(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id: ${id} with Related Products`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createProduct(
    @RequestContext() ctx: RequestContextDto,
    @Body() createProductDto: CreateProductDto,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating product.`)

    const result = await this.productService.createProduct(ctx, createProductDto)

    return {
      success: true,
      statusCode: 201,
      message: `Product created`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating product.`)

    const result = await this.productService.updateProduct(ctx, id, updateProductDto)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id ${id} updated`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProduct(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProductDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting product.`)

    const result = await this.productService.deleteProduct(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Product of id ${id} deleted`,
      data: result,
    }
  }
}
