import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const isBearer = req.headers['x-api-token'].includes('Bearer');

      if (!isBearer) {
        throw new Error();
      }

      const token =
        typeof req.headers['x-api-token'] === 'string' &&
        req.headers['x-api-token'].replace('Bearer', '').trim();
      this.jwtService.verify(token);
      next();
    } catch (_) {
      throw new UnauthorizedException('Invalid token !');
    }
  }
}
