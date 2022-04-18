import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
// ...
import supertokens from 'supertokens-node'
import { AppModule } from './app.module'
import { SupertokensExceptionFilter } from './auth/auth.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: [
      // 'http://localhost:3080',
      configService.get('WEBSITE_DOMAIN'),
    ],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  })

  app.useGlobalFilters(new SupertokensExceptionFilter())

  await app.listen(3000)
}

bootstrap()
