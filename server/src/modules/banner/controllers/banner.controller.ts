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
import { BannerDto, CreateBannerDto, FilterBannerDto, UpdateBannerDto } from '../dtos'
import { BannerService } from '../services/banner.service'


@Controller('banners')
export class BannerController {
  private logger = new Logger(BannerController.name)

  constructor(private readonly bannerService: BannerService) {}

  @Get('/')
  async getBanners(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterBannerDto: FilterBannerDto,
  ): Promise<BaseApiSuccessResponse<BannerDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Banners.`)

    const result = await this.bannerService.getBanners(ctx, filterBannerDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Banners`,
      data: result,
    }
  }

  @Get('/:id')
  async getBanner(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<BannerDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Banner. Id: ${id}`)

    const result = await this.bannerService.getBanner(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Banner of id: ${id}`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createBanner(
    @RequestContext() ctx: RequestContextDto,
    @Body() createBannerDto: CreateBannerDto,
  ): Promise<BaseApiSuccessResponse<BannerDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating Banner.`)

    const result = await this.bannerService.createBanner(ctx, createBannerDto)

    return {
      success: true,
      statusCode: 201,
      message: `Banner created`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateBanner(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<BaseApiSuccessResponse<BannerDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Banner.`)

    const result = await this.bannerService.updateBanner(ctx, id, updateBannerDto)

    return {
      success: true,
      statusCode: 200,
      message: `Banner of id ${id} updated`,
      data: result,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteBanner(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<BannerDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting Banner.`)

    const result = await this.bannerService.deleteBanner(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Banner of id ${id} deleted`,
      data: result,
    }
  }
}
