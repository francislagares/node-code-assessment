import { PrismaClient, Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@/exceptions/httpException';

const prisma = new PrismaClient();

export const hasRole = (...allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      const userData = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

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
