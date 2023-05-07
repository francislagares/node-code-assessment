import express, { Router } from 'express';

import ClientsController from '@/controllers/clients.controller';

export class ClientRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes(): Router {
    const controller = new ClientsController();

    this.router.get('/clients', controller.getClients);
    this.router.get('/clients/:id', controller.getClientById);
    this.router.post('/clients/query', controller.getClientByName);

    return this.router;
  }
}

export const clientRoutes = new ClientRoutes();
