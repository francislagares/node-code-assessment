import express, { Router } from 'express';

import PoliciesController from '@/features/policies/controllers/policies.controller';
import authMiddleware from '@/libs/shared/middlewares/auth.middleware';
import { hasRole } from '@/libs/shared/middlewares/role.middleware';

export class PoliciesRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes(): Router {
    const controller = new PoliciesController();

    this.router.get(
      '/policies',
      authMiddleware,
      hasRole('ADMIN'),
      controller.getPolicies,
    );
    this.router.post(
      '/policies/query',
      authMiddleware,
      hasRole('ADMIN'),
      controller.getPolicyByClientName,
    );
    this.router.post(
      '/policies/search',
      authMiddleware,
      hasRole('ADMIN'),
      controller.getClientByPolicyId,
    );

    return this.router;
  }
}

export const policiesRoutes = new PoliciesRoutes();
