import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SearchModule } from './search/search.module'
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [SearchModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
