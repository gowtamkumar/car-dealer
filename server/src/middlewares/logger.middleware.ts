import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction) {
    // console.log('Logger Middleware');
    response.on('finish', () => {
      const { method, originalUrl } = request
      const { statusCode, statusMessage } = response

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`

      if (statusCode >= 500) {
        return this.logger.error(message)
      }

      if (statusCode >= 400) {
        return this.logger.warn(message)
      }

      return this.logger.log(message)
    })
    next()
  }
}

export const LoggerFunMiddleware = (req: Request, res: Response, next: () => void): void => {
  console.log('LoggerFunMiddleware test')
  next()
}
