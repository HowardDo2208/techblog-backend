import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'

import { AuthMiddleware } from './auth.middleware'
import { SupertokensService } from './supertokens/supertokens.service'

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }

  static forRoot(): DynamicModule {
    return {
      providers: [SupertokensService],
      exports: [SupertokensService],
      imports: [UsersModule],
      module: AuthModule,
    }
  }
}
