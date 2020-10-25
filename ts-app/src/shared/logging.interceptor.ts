import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const now = Date.now()
    const { method, url } = request
    return next.handle().pipe(
      tap(() => console.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name))
    )
  }
}
