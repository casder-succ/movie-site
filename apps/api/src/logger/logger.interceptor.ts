import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestStart = Date.now();

    const request = context.switchToHttp().getRequest();

    this.logger.log(`<-- ${request.method} ${request.url}`);

    return next
      .handle()
      .pipe(tap(() => {
        const response = context.switchToHttp().getResponse();

        this.logger.log(`--> ${request.method} ${request.url} ${response.statusCode} ${Date.now() - requestStart}ms`);
      }));
  }
}
