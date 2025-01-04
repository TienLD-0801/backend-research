import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        auth: {
          username: 'tienld',
          password: '123456',
        },
        node: process.env.ELASTIC_SEARCH_URL,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ElasticsearchModule, SearchService],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
