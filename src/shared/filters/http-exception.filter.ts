import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ERRORS } from '@constants/messages.constants';
import { HttpResponse } from '@shared/http-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      status === HttpStatus.BAD_REQUEST ? ERRORS.BAD_FORMAT : exception.message;

    response
      .status(status)
      .json(new HttpResponse(false, null, new Date().toISOString(), message));
  }
}
