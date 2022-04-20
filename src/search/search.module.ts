import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
          ca: configService.get('ELASTICSEARCH_CA'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
