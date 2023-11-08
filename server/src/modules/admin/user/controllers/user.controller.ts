import { FilterUserDto } from '../dtos/filter-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Logger, Patch, Post, Put, Query } from "@nestjs/common";
import { UUIDParam } from '@common/decorators/http.decorators';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { UserResponseDto } from '../dtos/user-response.dto';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';


@Serialize(UserResponseDto)
@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService
  ) { }


  @Get('/')
  async getUsers(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterUserDto: FilterUserDto
  ): Promise<BaseApiSuccessResponse<UserResponseDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" retieving all users.`);

    const users = await this.userService.getUsers(ctx, filterUserDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of users`,
      data: users
    }
  }


  @Get('/:id')
  async getUser(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') id: string
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" retieving user details of id: ${id}`);

    const user = await this.userService.getUser(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `User of ID: ${id}`,
      data: user
    }
  }


  @Post('/')
  async createUser(
    @RequestContext() ctx: RequestContextDto,
    @Body() createUserDto: CreateUserDto
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" creating a new user.`);

    const user = await this.userService.createUser(ctx, createUserDto);

    return {
      success: true,
      statusCode: 201,
      message: `New user created. ID: ${user.id}`,
      data: user
    }
  }


  @Put('/:id')
  async updateUser(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" updating user. Id #${id}.`);

    const user = await this.userService.updateUser(ctx, id, updateUserDto);

    return {
      success: true,
      statusCode: 200,
      message: `User of ID ${user.id} updated`,
      data: user
    }
  }

  @Patch('/update-password/:id')
  async updatePassword(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" updating password of user of id #${userId}.`);

    console.log("change passwrod", updatePasswordDto);

    const user = await this.userService.updatePassword(ctx, userId, updatePasswordDto);

    return {
      success: true,
      statusCode: 200,
      message: `User password of id ${user.id} updated`,
      data: user
    }
  }


  @Delete('/:id')
  async deleteUser(
    @RequestContext() ctx: RequestContextDto,
    @UUIDParam('id') userId: string
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" deleting a user. of id: ${userId}`);

    const user = await this.userService.deleteUser(ctx, userId);

    return {
      success: true,
      statusCode: 200,
      message: `User of ${user} deleted`,
      data: user
    }
  }

  // @UseGuards(JwtAuthGuard, SystemAdminGuard)
  @Post('/initiate')
  async initiateUser(
    @RequestContext() ctx: RequestContextDto
  ) {
    this.logger.verbose(`User "${ctx.user?.username || ctx.user?.email}" importing users`);

    const users = await this.userService.initiateUser(ctx);

    return {
      success: true,
      statusCode: 200,
      message: `Users imported`,
      totalRecords: users.length,
      data: users
    }
  };


}