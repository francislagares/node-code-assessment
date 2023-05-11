import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@/exceptions/httpException';
import { PrismaAuthRepository } from '@/repositories/auth-prisma.repository';
import { Role } from '@prisma/client';

export const hasRole = (...allowedRoles: Role[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      const authRepository = new PrismaAuthRepository();
      const userData = await authRepository.getUserById(user.id);

      if (!allowedRoles.includes(userData.role)) {
        return next(
          new HttpException(
            403,
            'You do not have permission to perform this action',
          ),
        );
      }

      next();
    } catch (err) {
      new HttpException(500, err.message);
    }
  };
};
