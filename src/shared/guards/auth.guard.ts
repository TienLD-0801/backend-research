import {
  CanActivate,
  Injectable,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class LoginGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    if (body.email && body.password && Object.keys(body).length === 2) {
      return true;
    }
    throw new InternalServerErrorException('Internal server error');
  }
}

@Injectable()
export class RegisterGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    if (Object.keys(body).length <= 7) {
      return true;
    }
    throw new InternalServerErrorException('Internal server error');
  }
}

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;

    if (Object.keys(body).length > 0) {
      throw new InternalServerErrorException('Internal server error');
    }
    return true;
  }
}
