import { IApiOptions } from '@common/interfaces/api-options.interface'
import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const swaggerOptions = {
  persistAuthorization: true,
}

export function setupSwagger(app: INestApplication, api: IApiOptions): void {
  const options = new DocumentBuilder()
    .setTitle('car-dealer-website')
    .setDescription('car-dealer-website')
    .setVersion(api.version)
    .addTag('car-dealer')
    .addBearerAuth()
    .addCookieAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`${api.prefix}/${api.version}/docs`, app, document, { swaggerOptions })

  console.info(`Documentation: http://localhost:${api.port}/${api.prefix}/${api.version}/docs`)
}
