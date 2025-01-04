import { Module } from '@nestjs/common';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '@/shared/configs/database.config';
import { UserModule } from '@/modules/users/user.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get(process.env.DATABASE)),
      }),
    }),
    SearchModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
