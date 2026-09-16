import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        // If data already contains a meta object (e.g. pagination)
        if (data && typeof data === 'object' && 'items' in data && 'meta' in data) {
          return {
            success: true,
            statusCode: response.statusCode,
            data: data.items,
            meta: data.meta,
          };
        }
        return {
          success: true,
          statusCode: response.statusCode,
          data,
        };
      }),
    );
  }
}
