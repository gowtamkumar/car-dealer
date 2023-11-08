import { Environment } from '@common/enums/environment.enum'
import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { json } from 'express'
import { join } from 'path'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { WinstonModule } from 'nest-winston'
import { AppModule } from './app.module'
import { winstonOptions } from './config/winston.config'
import { RequestIdMiddleware } from './middlewares/request-id.middleware'
import { AppExceptionFilter } from '@common/filters/app.exception'
import { QueryFailedErrorFilter } from '@common/filters/query-failed-error.filter'
import { setupSwagger } from './api-docs.swagger'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked'

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  const logger =
    process.env.NODE_ENV === Environment.Production
      ? WinstonModule.createLogger(winstonOptions)
      : new Logger('Bootstrap Logger')

  const nestAppOptions: NestApplicationOptions = {
    logger,
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    nestAppOptions,
  )

  app.useStaticAssets(join(__dirname, '..', 'public'))

  app.enableCors({
    origin: true,
    credentials: true,
  })
  app.use(RequestIdMiddleware)

  app.setGlobalPrefix(`${AppModule.apiPrefix}/${AppModule.apiVersion}`)
  app.use(json({ limit: '50mb' }))
  app.use(helmet())
  app.use(cookieParser())
  app.use(compression())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
      // keyGenerator: (req) => requestIp.getClientIp(req),
    }),
  )

  const reflector = app.get(Reflector)

  app.useGlobalFilters(new AppExceptionFilter(reflector), new QueryFailedErrorFilter(reflector))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipUndefinedProperties: true,
    }),
  )

  if (AppModule.documentationEnabled) {
    setupSwagger(app, {
      port: AppModule.port,
      prefix: AppModule.apiPrefix,
      version: AppModule.apiVersion,
    })
  }

  await app.listen(AppModule.port)

  logger.log(
    `Application listening on port ${AppModule.port} in ${AppModule.nodeEnv.toUpperCase()} mode.`,
  )

  return app
}

void bootstrap()
