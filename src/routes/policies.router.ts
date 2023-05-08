import express, { Router } from 'express';

import PoliciesController from '@/controllers/policies.controller';
import authMiddleware from '@/middlewares/auth.middleware';

export class PoliciesRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes(): Router {
    const controller = new PoliciesController();

    this.router.get('/policies', authMiddleware, controller.getPolicies);
    this.router.post(
      '/policies/query',
      authMiddleware,
      controller.getPolicyByClientName,
    );
    // this.router.post('/policies/query', controller.getPolicyByClientId);

    return this.router;
  }
}

export const policiesRoutes = new PoliciesRoutes();
