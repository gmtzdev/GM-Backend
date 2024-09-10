import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: HttpResponse) => {
        const res = context.switchToHttp().getResponse() as Response;
        res.status(response.status);
        return {
          success: response.success,
          message: response.message,
          data: response.data,
        };
      }),

      catchError((error) => {
        console.log(error);
        if (error instanceof HttpException) {
          const method =
            error.stack.split('\n')[1].split('at')[1].split(' ')[1] || '';
          console.log(error.name);
          console.log(error.message);
          console.log(method);
        }

        return throwError(() => error);
      }),
    );
  }
}
