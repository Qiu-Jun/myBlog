---
title: Nestjs异常过滤器
date: 2025-07-28
sidebar: true
categories:
  - Node
tags:
  - Node
  - Nestjs
publish: true
---

这里记录错误处理相关的内容，这将涉及到 NestJS 中的异常过滤器部分

## 常用的异常过滤器
```javascript
// 返回的 JSON 对象由以下字段组成
{
  "message": "用户不存在",
  "error": "Not Found",
  "statusCode": 404
}
// message：描述具体错误信息，通常是一个字符串，解释错误的原因或背景。
// error：标识发生错误的类型或类别。通常为错误的名称或类别（如 “Bad Request” 或 “Unauthorized”）。
// statusCode：HTTP 状态码，以数字形式表示请求失败的类型。常见的状态码包括 400（Bad Request）、401（Unauthorized）、404（Not Found）等，用于反映请求的结果状态。

```

#### NotFoundException(404 Not Found)
#### BadRequestException (400 Bad Request)
> 表示客户端发送的请求有错误，服务器无法处理。例如，参数缺失、无效输入等情况
#### UnauthorizedException (401 Unauthorized)
> 表示请求没有经过身份验证或认证失败。通常出现在访问需要身份验证的资源时，客户端没有提供有效的认证信息
#### ForbiddenException (403 Forbidden)
> 表示客户端的身份认证成功，但没有权限访问请求的资源。通常发生在权限不足时
#### NotAcceptableException (406 Not Acceptable)
> 表示服务器无法生成客户端可以接受的响应格式。通常出现在客户端的 Accept 头与服务器支持的响应格式不匹配时
#### RequestTimeoutException (408 Request Timeout)
> 表示客户端请求超时。服务器在等待请求时超过了设定的时间限制
#### ConflictException (409 Conflict)
> 表示请求与服务器的当前状态存在冲突。例如，创建资源时，资源已经存在
#### GoneException (410 Gone)
> 表示请求的资源已经永久不可用，并且不会再恢复。常用于删除的资源
#### HttpVersionNotSupportedException (505 HTTP Version Not Supported)
> 表示服务器不支持客户端请求的 HTTP 协议版本
#### PayloadTooLargeException (413 Payload Too Large)
> 表示客户端发送的数据体（如上传文件）超过了服务器允许的大小限制
#### UnsupportedMediaTypeException (415 Unsupported Media Type)
> 表示客户端请求的媒体类型不被服务器支持。例如，上传文件的格式不被接受
#### UnprocessableEntityException (422 Unprocessable Entity)
> 表示服务器理解客户端的请求内容，但由于语义错误而无法处理。例如，输入数据的格式正确但内容无效
#### InternalServerErrorException (500 Internal Server Error)
> 表示服务器在处理请求时遇到了内部错误。是一个通用的错误状态码，表示服务器无法处理请求
#### NotImplementedException (501 Not Implemented)
> 表示服务器不支持请求的方法。通常用于服务器不支持客户端请求的功能时
#### ImATeapotException (418 I’m a teapot)
> 这是一个愚人节玩笑性质的 HTTP 状态码，表示服务器拒绝酿茶的请求（参见 IETF RFC 2324）。常用于测试或幽默场景
#### MethodNotAllowedException (405 Method Not Allowed)
> 表示请求的方法（如 GET、POST）在目标资源中不可用。例如，资源只支持 GET 请求，而客户端使用了 POST
#### BadGatewayException (502 Bad Gateway)
> 表示服务器作为网关或代理时，从上游服务器接收到无效响应
#### ServiceUnavailableException (503 Service Unavailable)
> 表示服务器暂时无法处理请求，通常是因为过载或维护
#### GatewayTimeoutException (504 Gateway Timeout)
> 表示服务器作为网关或代理时，从上游服务器接收响应超时
#### PreconditionFailedException (412 Precondition Failed)
> 表示客户端发送的请求没有满足服务器的某些前置条件。例如，If-Match 头字段的条件不满足

#### el
```ts
// app.controller.ts
import { BadRequestException } from '@nestjs/common';

@Controller()
export class UsersController {

  @Get('test-error')
  testError() {
    throw new BadRequestException('测试错误');
  }
 
}
```

## 自定义 HTTP 异常过滤器

#### 方法一: 实现 ExceptionFilter 接口
> 自定义的异常过滤器需要实现 `ExceptionFilter` 接口的 catch 方法
```ts
// src/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'; 
import { Request, Response } from 'express'; 
 
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter { 
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); 
    const request = ctx.getRequest<Request>(); 
    const status = exception.getStatus(); 
 
    response 
      .status(status) 
      .json({ 
        statusCode: status, 
        timestamp: new Date().toISOString(), 
        path: request.url, 
      }); 
  } 
}

```
在上面的示例中通过`@Catch()` 装饰器**指定要捕获的异常类型（**只捕获 HttpException）。
`@Catch()` 装饰器也支持可以采用单个参数或逗号分隔的列表，这可以同时为多种类型的异常设置过滤器<br />
如果没有在 `@Catch()` 中指定异常类型，过滤器将捕获所有异常类型。这对于全局异常处理非常有用。

#### 方法2：继承 HttpException 类
> 自定义的 `CustomHttpException` 类继承 `HttpException` 类
```ts
// src/custom-http-exception.filter.ts
import { HttpException } from '@nestjs/common';

export class CustomHttpException extends HttpException { 
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  } 
}
```
> 使用 CustomHttpException 类实例抛出异常
```ts
// app.controller.ts

@Get('custom')
getCustom(){
  throw new CustomHttpException('后山乃禁地！', HttpStatus.FORBIDDEN) 
}

```

## 绑定范围
#### HTTP 方法
> 使用 `@UseFilters()` 装饰器可以使得过滤器只在指定 `HTTP` 方法下起作用
```ts
// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('custom')
  @UseFilters(new HttpExceptionFilter())
  // @UseFilters(HttpExceptionFilter)
  getCustom() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: '禁止访问',
        error: 'Forbidden',
      },
      403,
    );
  }
}
```
> 装饰器中的参数既可以传递一个过滤器的实例（`new HttpExceptionFilter()`），也可以传递一个类（`HttpExceptionFilter`）

#### 控制器
> 也可以在指定的控制器下使用 `@UseFilters()` 装饰器
```ts
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  // ...
}
```
> 这样就不用给该控制器下的所有 `HTTP` 方法都添加装饰器了

## 全局应用
使用 `app.useGlobalFilters()` 方法来注册全局异常过滤器
```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(FuelStationModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
```
设置完成后，应用的所有控制器和方法都加上了过滤器，这样应用的任何地方抛出的异常都会被全局捕获，可以确保一致性和可控的错误响应格式<br />

但是这种方式并不能灵活地与依赖注入的特性相结合，NestJS 提供了另一种全局绑定过滤器的方式：
```ts
// app.module.ts

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

```

## 日志记录与异常过滤器
> 通过 NestJS 的 Logger 服务记录异常详细信息，以便在应用崩溃时追踪问题
```ts
// http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取响应对象
    const request = ctx.getRequest<Request>(); // 获取请求对象
    const status = exception.getStatus(); // 获取异常状态码

    const message = exception.message
      ? exception.message
      : `${status >= 500 ? '服务器错误（Service Error）' : '客户端错误（Client Error）'}`;

    const nowTime = new Date().getTime();

    const errorResponse = {
      data: {},
      message,
      code: -1,
      date: nowTime,
      path: request.url,
    };

    // 记录日志到控制台
    this.logger.error(
      `【${nowTime}】${status} ${request.method} ${request.url} query:${JSON.stringify(request.query)} params:${JSON.stringify(
        request.params,
      )} body:${JSON.stringify(request.body)}`,
      JSON.stringify(errorResponse),
      HttpExceptionFilter.name,
    );

    response.status(status).json(errorResponse);
  }
}
```

```ts
// users.controller.ts
@Get('custom')
@UseFilters(new HttpExceptionFilter(new Logger('UsersController')))
getCustom() {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      message: '禁止访问',
      error: 'Forbidden',
    },
    403,
  );
}
```

或是依赖注入现有日志服务（nestjs-pino）
```ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logService: LogService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logService.logError(exception);
    // 处理异常
  }
}
```

将错误信息发送到外部监控服务（如 Sentry）
```ts
import * as Sentry from '@sentry/node';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    Sentry.captureException(exception);
    // 处理异常
  }
}

```
