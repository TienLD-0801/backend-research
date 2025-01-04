import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { SearchService } from '../search/search.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly searchService: SearchService,
  ) {}

  async createUser(user: UserDto) {
    const createdUser = await this.userRepository.save(user);

    const userDataForES = {
      ...user,
      id: createdUser.id,
    };

    const response = await this.searchService.createUser(userDataForES);

    return { ...createdUser, message: 'Create user success!' };
  }

  async getUser() {
    return await this.searchService.search('t');
    // return await this.userRepository.find();
  }

  async getUserByName(query: string) {
    const usersFromES = await this.searchService.search(query);

    console.log('usersFromES', usersFromES);

    const userIds = usersFromES.map((user) => user._id);

    const usersFromDB = await this.userRepository.find({
      where: {
        id: In(userIds),
      },
    });

    return usersFromDB;
  }

  async deleteUser(userId: string): Promise<any> {
    const esResponse = await this.searchService.deleteUserFromES(userId);

    const dbResponse = await this.userRepository.delete(userId);

    return {
      message:
        'User deleted successfully from both Elasticsearch and PostgreSQL',
    };
  }
}
