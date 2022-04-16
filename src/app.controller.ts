import { Controller, Get, Session, UseGuards } from '@nestjs/common'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('testAuth')
  @UseGuards(AuthGuard)
  testAuth(@Session() session: SessionContainer): string {
    return JSON.stringify(session)
  }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
