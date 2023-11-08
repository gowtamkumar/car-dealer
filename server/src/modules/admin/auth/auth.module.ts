import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '@admin/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './enums';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: AuthStrategy.JwtAuth }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        // publicKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        // privateKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        // if you want to use token with expiration date
        signOptions: {
          // algorithm: 'RS256',
          expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES')
        } 
      })
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
