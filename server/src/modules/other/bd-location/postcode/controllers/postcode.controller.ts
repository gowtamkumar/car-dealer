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
import {
  CreatePostcodeDto,
  FilterPostcodeDto,
  PostcodeResponseDto,
  UpdatePostcodeDto,
} from '../dtos'
import { PostcodeEntity } from '../entities/postcode.entity'
import { PostcodeService } from '../services/postcode.service'

@UseGuards(JwtAuthGuard)
@Controller('postcodes')
export class PostcodeController {
  private logger = new Logger(PostcodeController.name)

  constructor(private readonly postcodeService: PostcodeService) {}

  @Get('/')
  async getPostcodes(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterPostcodeDto: FilterPostcodeDto,
  ): Promise<BaseApiSuccessResponse<PostcodeResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user.username}" retriving all Postcodes. Query: ${JSON.stringify(
        filterPostcodeDto,
      )}`,
    )

    const postcodes = await this.postcodeService.getPostcodes(ctx, filterPostcodeDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of Postcodes`,
      totalRecords: postcodes.length,
      data: postcodes,
    }
  }

  @Get('/:id')
  async getPostcode(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseApiSuccessResponse<PostcodeResponseDto>> {
    this.logger.verbose(`User "${ctx.user.username}" retieving Postcode of id: ${id}`)

    const postcode = await this.postcodeService.getPostcode(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Details of Postcode of id: ${id}`,
      data: postcode,
    }
  }

  @Post('/')
  async createPostcode(
    @RequestContext() ctx: RequestContextDto,
    @Body() createPostcodeDto: CreatePostcodeDto,
  ): Promise<BaseApiSuccessResponse<PostcodeResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" creating new Postcode . Data: ${JSON.stringify(
        createPostcodeDto,
      )}`,
    )

    const postcode = await this.postcodeService.createPostcode(ctx, createPostcodeDto)

    return {
      success: true,
      statusCode: 201,
      message: `New Postcode Created.`,
      data: postcode,
    }
  }

  @Put('/:id')
  async updatePostcode(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostcodeDto: UpdatePostcodeDto,
  ): Promise<BaseApiSuccessResponse<PostcodeResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user.username}" updating Postcode  of id ${id}. Data: ${JSON.stringify(
        updatePostcodeDto,
      )}`,
    )

    const postcode = await this.postcodeService.updatePostcode(ctx, id, updatePostcodeDto)

    return {
      success: true,
      statusCode: 200,
      message: `Postcode of id ${id} updated.`,
      data: postcode,
    }
  }

  @Delete('/:id')
  async deletePostcode(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseApiSuccessResponse<PostcodeResponseDto>> {
    this.logger.verbose(`User "${ctx.user.username}" deleting a Postcode  of id ${id}.`)

    const postcode = await this.postcodeService.deletePostcode(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Postcode of id ${id} deleted.`,
      data: postcode,
    }
  }

  @Post('/initiate')
  async initiatePostcodeData(
    @RequestContext() ctx: RequestContextDto,
  ): Promise<BaseApiSuccessResponse<PostcodeEntity[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" initiate postcode data.`)

    const postcodes = await this.postcodeService.initiatePostcodeData()

    return {
      success: true,
      statusCode: 200,
      message: `List of postcodes`,
      totalRecords: postcodes.length,
      data: postcodes,
    }
  }
}
