---
title: Nestjs集成swagger
date: 2023-11-06 23:08:00
sidebar: true
categories:
    - Node
tags:
    - Node
    - Nestjs
publish: true
---

## 安装依赖
```bash
pnpm add @nestjs/swagger swagger-ui-express
```

## main.ts配置swagger
```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述信息')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/apis', app, document);
  await app.listen(3000);
}
bootstrap();
```

## 分组
user.controller.ts
```ts
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Request() res) {
    return {
      code: 200,
      data: res.query.name,
    };
  }
}
```

## 添加单个接口描述信息
user.controller.ts
```ts
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get接口', description: '角色' })
  findAll(@Request() res) {
    return {
      code: 200,
      data: res.query.name,
    };
  }
}
```

## 接口参数描述
user.controller.ts
```ts
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get接口', description: '角色' })
  findAll(@Request() res) {
    return {
      code: 200,
      data: res.query.name,
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '获取某个用户by id',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
```

## query参数描述
user.controller.ts
```ts
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get接口', description: '角色' })
  @ApiQuery({
    name: 'page',
    description: '分页信息',
    required: true,
    type: String,
  })
  findAll(@Request() res) {
    return {
      code: 200,
      data: res.query.name,
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '获取某个用户by id',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
```

## 自定义返回信息
user.controller.ts
```ts
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get接口', description: '角色' })
  @ApiQuery({
    name: 'page',
    description: '分页信息',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: '88' })
  findAll(@Request() res) {
    return {
      code: 200,
      data: res.query.name,
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '获取某个用户by id',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
```

## post参数装饰
create-user.dto.ts
```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: 'June', type: String })
  name: string;
  @ApiProperty()
  age: number;
}
```

user.controller.ts
```ts
import { Controller, Get, Param, Request, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户', description: '用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

## 添加token
main.ts
```ts
const options = new DocumentBuilder()
    .addBearerAuth() // 此处添加
    .setTitle('接口文档')
    .setDescription('描述信息')
    .setVersion('1.0.0')
    .build();
```
user.controller.ts
```ts
@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口') // 分组
@ApiBearerAuth()
```
