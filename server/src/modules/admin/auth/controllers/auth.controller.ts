import { RequestContext } from "@common/decorators/request-context.decorator";
import { RequestContextDto } from "@common/dtos/request-context.dto";
import { Body, Controller, Delete, Get, Logger, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { RegisterCredentialsDto } from "../dtos/register-credentials.dto";
import { UpdateUserDto } from '@admin/user/dtos/update-user.dto';
import { UpdatePasswordDto } from '@admin/user/dtos/update-password.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { AuthenticationResponseDto } from '../dtos/authentication-response.dto';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { UserResponseDto } from '@admin/user/dtos/user-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginCredentialsDto } from "../dtos/login-credentials.dto";


@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ){}


  @Serialize(AuthenticationResponseDto)
  @Post('/register')
  async register(
    @RequestContext() ctx: RequestContextDto,
    @Body() registerCredentialsDto: RegisterCredentialsDto,
    @Res({passthrough: true}) res: Response
  ): Promise<BaseApiSuccessResponse<AuthenticationResponseDto>>{
    this.logger.verbose(`New User Registring`); 
    
    const result = await this.authService.register(ctx, registerCredentialsDto);
    this.buildCookieTokenResponse(ctx, res, result.token);  
    
    return { 
      success: true,
      statusCode: 201,
      message: `Registration successfull`,
      data: result
    };
  }

  @Serialize(AuthenticationResponseDto)
  @Post('/login')
  async login(
    @RequestContext() ctx: RequestContextDto,
    @Body() loginCredentialsDto: LoginCredentialsDto,
    @Res({passthrough: true}) res: Response
  ): Promise<BaseApiSuccessResponse<AuthenticationResponseDto>>{
    this.logger.verbose(`User Login`); 

    const result = await this.authService.login(ctx, loginCredentialsDto);
    this.buildCookieTokenResponse(ctx, res, result.token);

    return { 
      success: true,
      statusCode: 200,
      message: `Login successfull`,
      data: result
    };
  }


  @Delete('/logout')
  async signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response)
  : Promise<BaseApiSuccessResponse<null>> {
    this.logger.verbose(`User Logout`); 

    //revoke token
    Object.entries(req.cookies).forEach(([key,value]) => res.clearCookie(key));

    return { 
      success: true,
      statusCode: 200,
      message: `Logout successfull`,
      data: null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@RequestContext() ctx: RequestContextDto)
  : Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`User ${ctx.user.username} retriving his profile.`);     

    const result = await this.authService.getMe(ctx);

    return { 
      success: true,
      statusCode: 200,
      message: `Get current user`,
      data: result,
    };
  }

  @Delete('/me')
  async deleteMe(@RequestContext() ctx: RequestContextDto)
  : Promise<BaseApiSuccessResponse<UserResponseDto>>  {
    this.logger.verbose(`Delete current User`); 

    const result = await this.authService.deleteMe(ctx);

    return { 
      success: true,
      statusCode: 200,
      message: `Delete current user`,
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-details')
  async updateDetails(
    @RequestContext() ctx: RequestContextDto, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<BaseApiSuccessResponse<UserResponseDto>> {
    this.logger.verbose(`Update current user details`); 

    const result = await this.authService.updateDetails(ctx, updateUserDto);

    return { 
      success: true,
      statusCode: 200,
      message: `My details updated`,
      data: result,
    };
  }


  @UseGuards(JwtAuthGuard)
  @Patch('/update-password/:id')
  async updatePassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<BaseApiSuccessResponse<null>> {
    this.logger.verbose(`Update current user password`); 
    
    await this.authService.updatePassword(ctx, updatePasswordDto);

    return { 
      success: true,
      statusCode: 200,
      message: `Password updated`,
      data: null,
    };
  }

  @Post('/forgot-password')
  async forgotPassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() forgotPasswordDto: ForgotPasswordDto
  ){
    this.logger.verbose(`Forgot password`); 

    const result = await this.authService.forgotPassword(ctx, forgotPasswordDto);

    return { 
      success: true,
      statusCode: ``,
      message: `An email is sent to ${forgotPasswordDto.email} with next instructions on resetting your password`,
      data: result,
    };
  }


  @Patch('/reset-password')
  async resetMyPassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() resetPasswordDto: ResetPasswordDto
  ){
    this.logger.verbose(`Reset Password`); 

    await this.authService.resetPassword(ctx, resetPasswordDto);

    return { 
      success: true,
      statusCode: ``,
      message: `Password reset successfull`,
      data: {},
    };
  }



  private buildCookieTokenResponse(ctx: RequestContextDto, response: Response, token: string) {
    this.logger.verbose(`Cookie Token Response`); 
    const cookieOptions = {
      expires: new Date(
        Date.now() + +this.configService.get('JWT_ACCESS_TOKEN_EXPIRES') * 1000 // cookie expires in in ms
      ),
      // secure: config.SSL && config.NODE_ENV===env_mode.PRODUCTION
    };
    response
    .status(200)
    .cookie('token', token, cookieOptions);
  }

}
