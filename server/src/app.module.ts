import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configValidationSchema } from './config/config.schema'
import { MulterModule } from '@nestjs/platform-express'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { ProductModule } from '@modules/product/product.module'
import { DatabaseModule } from './database/database.module'
import { BrandModule } from '@modules/brand/brand.module'
import { OtherModule } from '@modules/other/other.module'
import { AdminModule } from '@admin/admin.module'
import { ModelModule } from '@modules/model/model.module'
import { ModelCodeModule } from '@modules/model-code/model-code.module'
import { BannerModule } from '@modules/banner/banner.module'
import { ScheduleModule } from '@nestjs/schedule'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: 'gowtampaul0@gmail.com',
    //       pass: 'sddf mfmj suay wvla',
    //     },
    //   },
      
    // }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: configValidationSchema,
      // validate: validateEnv,
      // load: [configuration]
    }),
    MulterModule.register({
      dest: 'public/uploads',
    }),
    DatabaseModule,
    // WinstonModule.forRoot(winstonOptions),

    AdminModule,
    BrandModule,
    ProductModule,
    ModelModule,
    ModelCodeModule,
    BannerModule,
    OtherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static nodeEnv: string
  static port: number
  static apiVersion: string
  static apiPrefix: string
  static documentationEnabled: boolean

  constructor(private readonly configService: ConfigService) {
    AppModule.nodeEnv = this.configService.get('NODE_ENV')
    AppModule.port = +this.configService.get('API_PORT')
    AppModule.apiVersion = this.configService.get('API_VERSION')
    AppModule.apiPrefix = this.configService.get('API_PREFIX')
    AppModule.documentationEnabled = true // only for dev mode
  }

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      // FrontendMiddleware,
      LoggerMiddleware,
      // IpMiddleware,
      // CookieParserMiddleware,
      // RateLimitMiddleware,
      // CorsMiddleware,
      // CSRFMiddleware,
      // HelmetMiddleware,
      // UserMiddleware,
      // LocalsMiddleware,
      // CompressionMiddleware,
    ]
    consumer
      .apply(...middlewares)
      // .exclude('api/(.*)')
      .forRoutes({ path: '/**', method: RequestMethod.ALL })
  }
}
