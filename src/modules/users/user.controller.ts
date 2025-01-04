import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '@/modules/users/user.service';
import { UserDto } from '@/modules/users/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async createUser(@Body() user: UserDto) {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUser() {
    const newUser = await this.userService.getUser();
    return newUser;
  }

  @Get('search')
  async getUserByName(@Query('query') query: string) {
    const user = await this.userService.getUserByName(query);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<any> {
    return await this.userService.deleteUser(userId);
  }
}
