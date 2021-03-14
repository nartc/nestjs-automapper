import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { HttpResponse } from '@shared/http-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor<T>
  implements NestInterceptor<T, HttpResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<HttpResponse<T>> {
    return next
      .handle()
      .pipe(
        map((data) => new HttpResponse(true, data, new Date().toISOString()))
      );
  }
}
