import { RequestContextDto } from '@common/dtos/request-context.dto'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { createRequestContext } from 'src/utils/request-context'

export const RequestContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestContextDto => {
    const request = ctx.switchToHttp().getRequest()

    return createRequestContext(request)
  },
)
