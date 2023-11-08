import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToInstance } from "class-transformer";

interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
} 

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // console.log('Im running before the request is handled by a request handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // console.log('Im running before response is sent out', data, "ok");
        // return plainToClass(this.dto, data, {
        //   excludeExtraneousValues: true
        // });
        data.data =  plainToInstance(this.dto, data.data, { excludeExtraneousValues: true });
        return data;
      })
    )
    
  }
}