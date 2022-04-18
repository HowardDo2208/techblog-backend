import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'

import { AuthMiddleware } from './auth.middleware'
import { SupertokensService } from './supertokens/supertokens.service'
import { AuthController } from './auth.controller'

@Module({
  providers: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }

  static forRoot(): DynamicModule {
    return {
      providers: [SupertokensService],
      exports: [SupertokensService],
      imports: [UsersModule],
      controllers: [AuthController],
      module: AuthModule,
    }
  }
}
