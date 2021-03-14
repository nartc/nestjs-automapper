import { UseFilters, UseInterceptors, applyDecorators } from '@nestjs/common';

import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { HttpResponseInterceptor } from '@interceptors/http-response.interceptor';

export function BaseController(): any {
  return applyDecorators(
    UseFilters(new HttpExceptionFilter()),
    UseInterceptors(HttpResponseInterceptor)
  );
}
