import express, { Router } from 'express';

import PoliciesController from '@/controllers/policies.controller';

export class PoliciesRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes(): Router {
    const controller = new PoliciesController();

    this.router.get('/policies', controller.getPolicies);
    this.router.post('/policies/query', controller.getPolicyByClientName);
    // this.router.post('/policies/query', controller.getPolicyByClientId);

    return this.router;
  }
}

export const policiesRoutes = new PoliciesRoutes();
