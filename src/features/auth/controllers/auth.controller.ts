import { Request, Response } from 'express';

import { CreateUserDto } from '@/features/auth/dtos/users.dto';
import { RequestWithUser } from '@/features/auth/interfaces/auth.interface';
import AuthService from '@/features/auth/services/auth.service';
import { asyncMiddleware } from '@/libs/shared/middlewares/async.middleware';
import { User } from '@prisma/client';
import { validate } from 'class-validator';

class AuthController {
  private authService = new AuthService();

  public signUp = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const createUserDto = new CreateUserDto();

      createUserDto.email = req.body.email;
      createUserDto.name = req.body.name;
      createUserDto.password = req.body.password;
      createUserDto.role = req.body.role;

      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        const constraints = {};
        errors.forEach(error => {
          const propertyName = error.property;
          const errorConstraints = Object.values(error.constraints);
          constraints[propertyName] = errorConstraints;
        });
        res.status(400).json({ constraints });
        return;
      }

      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    },
  );

  public logIn = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    },
  );

  public logOut = asyncMiddleware(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    },
  );
}

export default AuthController;
