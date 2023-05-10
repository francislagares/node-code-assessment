import {
  DataStoredInToken,
  RequestWithUser,
} from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

import { JWT_SECRET } from '@/config/environment';
import { HttpException } from '@/exceptions/httpException';
import { PrismaAuthRepository } from '@/repositories/auth-prisma.repository';
import { verify } from 'jsonwebtoken';

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Authorization =
      req.cookies['Authorization'] ||
      (req.header('Authorization')
        ? req.header('Authorization').split('Bearer ')[1]
        : null);

    if (Authorization) {
      const secretKey: string = JWT_SECRET;
      const verificationResponse = verify(
        Authorization,
        secretKey,
      ) as DataStoredInToken;
      const userId = verificationResponse.id;

      const authRepository = new PrismaAuthRepository();
      const findUser = await authRepository.getUserById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
