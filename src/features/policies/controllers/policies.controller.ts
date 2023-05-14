import { Client, Policy } from '@prisma/client';
import { Request, Response } from 'express';

import PoliciesService from '@/features/policies/services/policies.service';
import { asyncMiddleware } from '@/libs/shared/middlewares/async.middleware';

class PoliciesController {
  policiesService = new PoliciesService();

  public getPolicies = asyncMiddleware(
    async (req: Request, res: Response): Promise<Policy[]> => {
      const policies = await this.policiesService.getPolicies();

      res.status(200).json({ policies });

      return policies;
    },
  );

  public getPolicyByClientName = asyncMiddleware(
    async (req: Request, res: Response): Promise<Policy[] | null> => {
      const clientName = req.query.clientName as string;
      const policies: Policy[] | null =
        await this.policiesService.getPolicyByClientName(clientName);

      res.status(200).json({ policies });

      return policies;
    },
  );

  public getClientByPolicyId = asyncMiddleware(
    async (req: Request, res: Response): Promise<Client | null> => {
      const policyId = req.query.policyId as string;
      const client: Client | null =
        await this.policiesService.getClientByPolicyId(policyId);

      res.status(200).json({ client });

      return client;
    },
  );
}

export default PoliciesController;
