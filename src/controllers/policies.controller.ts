import { Request, Response } from 'express';

import PoliciesService from '@/services/policies.service';
import { Policy } from '@/interfaces/policy.interface';

class PoliciesController {
  policiesService = new PoliciesService();

  public getPolicies = async (
    req: Request,
    res: Response,
  ): Promise<Policy[]> => {
    try {
      const policies = await this.policiesService.getPolicies();

      res.status(200).json({ policies });

      return policies;
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      }
    }
  };

  public getPolicyByClientName = async (
    req: Request,
    res: Response,
  ): Promise<Policy[] | null> => {
    try {
      const clientName = req.query.clientName as string;
      const policies: Policy[] | null =
        await this.policiesService.getPolicyByClientName(clientName);

      res.status(200).json({ policies });

      return policies;
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      }
    }
  };

  /*  public getClientByPolicyId = async (
    req: Request,
    res: Response,
  ): Promise<Policy | null> => {
    try {
      const policyId = req.query.policyId as string;
      const client: Policy | null =
        await this.policiesService.getClientByPolicyId(policyId);

      res.status(200).json({ client });

      return client;
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      }
    }
  }; */
}

export default PoliciesController;
