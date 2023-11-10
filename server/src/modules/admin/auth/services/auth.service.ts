import { UserEntity } from './../../user/entities/user.entity';
import { CreateUserDto } from "@admin/user/dtos/create-user.dto";
import { UpdatePasswordDto } from "@admin/user/dtos/update-password.dto";
import { UpdateUserDto } from "@admin/user/dtos/update-user.dto";
import { UserDto } from "@admin/user/dtos/user.dto";
import { UserService } from "@admin/user/services/user.service";
import { RequestContextDto } from "@common/dtos/request-context.dto";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AuthenticationResponseDto } from "../dtos/authentication-response.dto";
import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
import { LoginCredentialsDto } from "../dtos/login-credentials.dto";
import { RegisterCredentialsDto } from "../dtos/register-credentials.dto";
import { ResetPasswordDto } from "../dtos/reset-password.dto";



@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  async register(ctx: RequestContextDto, authCredentialsDto: RegisterCredentialsDto)
  : Promise<AuthenticationResponseDto> {
    this.logger.log(`${this.register.name}Service Called`);

    const user = await this.userService.createUser(ctx, authCredentialsDto as CreateUserDto);

    const token = await this.generateAccessToken(ctx, user);

    return {
      user,
      token
    };
  }

  async login(ctx: RequestContextDto, loginCredentialsDto: LoginCredentialsDto)
  : Promise<AuthenticationResponseDto> {
    this.logger.log(`${this.login.name} Service called.`);
    
    const { username, password } = loginCredentialsDto;

    const user = await this.userService.findUserByUsername(username);

    const valid = user ? await this.userService.validateUser(user, password) : false;
    if (!valid) {
      throw new UnauthorizedException('Invalid login credentials')
    }

    const token = await this.generateAccessToken(ctx, user);

    return {
      user,
      token
    }
  }

  async getMe(ctx: RequestContextDto): Promise<UserEntity>  {
    this.logger.log(`${this.getMe.name}Service Called`);
    if(!ctx.user){
      throw new UnauthorizedException();
    }
    return this.userService.getUser(ctx, ctx.user.id);
  }

  async deleteMe(ctx: RequestContextDto): Promise<UserEntity>  {
    this.logger.log(`${this.deleteMe.name}Service Called`);
    if(!ctx.user){
      throw new UnauthorizedException();
    }
    return this.userService.deleteUser(ctx, ctx.user.id)
  }


  async updateDetails(ctx: RequestContextDto, updateUserDto: UpdateUserDto)
  : Promise<UserEntity> {
    this.logger.log(`${this.updateDetails.name}Service Called`);
    if(!ctx.user){
      throw new UnauthorizedException();
    }
    return this.userService.updateUser(ctx, ctx.user.id, updateUserDto);
  }


  async updatePassword(ctx: RequestContextDto, updatePasswordDto: UpdatePasswordDto)
  : Promise<UserEntity> {
    this.logger.log(`${this.updatePassword.name}Service Called`);
    console.log("ssss");
    console.log("ctx.user", ctx.user);
    
    if(!ctx.user){
      throw new UnauthorizedException();
    }
  
    
    return this.userService.updatePassword(ctx, ctx.user.id, updatePasswordDto);
  }


  // TODO
  async forgotPassword(ctx: RequestContextDto, forgotPasswordDto: ForgotPasswordDto) {
    this.logger.log(`${this.forgotPassword.name}Service Called`);
    return "forgot password"
  }

  // TODO
  async resetPassword(ctx: RequestContextDto, resetPasswordDto: ResetPasswordDto) {
    this.logger.log(`${this.deleteMe.name}Service Called`);
    return "reset pass"
  }


  private generateAccessToken(ctx: RequestContextDto, user: UserDto)
  : Promise<string> {
    this.logger.log(`${this.generateAccessToken.name}Service Called`);

    const opts: JwtSignOptions = {
      // ...BaseJwtSignOptions,
      // secret: "mytokensecret", // import er somoy set kora ace
      // expiresIn: 60, // import er somoy set kora ace
      subject: user.id,
    }

    return this.jwtService.signAsync({}, opts);
  }


}