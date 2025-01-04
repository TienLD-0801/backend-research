import { Controller } from '@nestjs/common';
import { UserService } from '@/modules/users/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
