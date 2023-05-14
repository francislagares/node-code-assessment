import express, { Router } from 'express';

import AuthController from '@/features/auth/controllers/auth.controller';
import authMiddleware from '@/libs/shared/middlewares/auth.middleware';

export class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes(): Router {
    const controller = new AuthController();

    this.router.post('/signup', controller.signUp);
    this.router.post('/login', controller.logIn);
    this.router.post('/logout', authMiddleware, controller.logOut);

    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
