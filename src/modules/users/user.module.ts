import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/user.entity';
import { UserService } from '@/modules/users/user.service';
import { UserController } from '@/modules/users/user.controller';
import { SearchService } from '../search/search.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SearchModule],
  controllers: [UserController],
  providers: [UserService, SearchService],
  exports: [UserService],
})
export class UserModule {}
