import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common'

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(201)
  create(@Body() rqBody: any): string {
    return `the body is ${JSON.stringify(rqBody)}`
  }

  @Get('test')
  findAll(): string {
    return 'This action returns all cats'
  }

  @Get('redirect')
  @Redirect('https://www.google.com', 301)
  redirectTest(@Query('version') version: any) {
    if (version && version === '5') {
      return { url: 'https://9gag.com', statusCode: 200 }
    }
  }

  @Get('detail/:id')
  getCatDetail(@Param('id') id: string) {
    return `this action return cat with id: ${id}`
  }

  @Get('testPromise')
  async getPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('this is a promise')
      }, 2000)
    })
  }
}

export class CreateCatDto {
  name: string
  age: number
  breed: string
}
