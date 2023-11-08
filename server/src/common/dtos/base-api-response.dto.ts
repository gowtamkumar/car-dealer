import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseApiSuccessResponse<T> {
  public success: boolean;
  public statusCode: number;
  public message: string;

  public data: T;

  public totalPages?: number;
  public payloadSize?: number;
  public hasNext?: boolean;
  public hasPrev?: boolean;
  public currentPage?: number;
  public skippedRecords?: number;
  public totalRecords?: number;
}

export function SwaggerBaseApiSuccessResponse<T>(type: T): typeof BaseApiSuccessResponse {
  class ExtendedBaseApiResponse<T> extends BaseApiSuccessResponse<T> {
    @ApiProperty({ type })
    public data: T;
  }
  // NOTE : Overwrite the returned class name, otherwise whichever type calls this function in the last,
  // will overwrite all previous definitions. i.e., Swagger will have all response types as the same one.
  const isAnArray = Array.isArray(type) ? ' [ ] ' : '';
  Object.defineProperty(ExtendedBaseApiResponse, 'name', {
    value: `SwaggerBaseApiResponseFor ${type} ${isAnArray}`,
  });

  return ExtendedBaseApiResponse;
}


export class BaseApiErrorObject {
  @ApiProperty({ type: Number })
  public statusCode: number;

  @ApiProperty({ type: String })
  public message: string;

  @ApiPropertyOptional({ type: String })
  public localizedMessage: string;

  @ApiProperty({ type: String })
  public errorName: string;

  @ApiProperty({ type: Object })
  public details: unknown;

  @ApiProperty({ type: String })
  public path: string;

  @ApiProperty({ type: String })
  public requestId: string;

  @ApiProperty({ type: String })
  public timestamp: string;
}

export class BaseApiErrorResponse {
  @ApiProperty({ type: BaseApiErrorObject })
  public error: BaseApiErrorObject;
}
