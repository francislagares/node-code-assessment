import express, { Router } from 'express';

import ClientsController from '@/features/clients/controllers/clients.controller';
import authMiddleware from '@/libs/shared/middlewares/auth.middleware';
import { hasRole } from '@/libs/shared/middlewares/role.middleware';

export class ClientRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes(): Router {
    const controller = new ClientsController();

    this.router.get(
      '/clients',
      authMiddleware,
      hasRole('USER', 'ADMIN'),
      controller.getClients,
    );
    this.router.get(
      '/clients/:id',
      authMiddleware,
      hasRole('USER', 'ADMIN'),
      controller.getClientById,
    );
    this.router.post(
      '/clients/query',
      authMiddleware,
      hasRole('USER', 'ADMIN'),
      controller.getClientByName,
    );

    return this.router;
  }
}

export const clientRoutes = new ClientRoutes();
