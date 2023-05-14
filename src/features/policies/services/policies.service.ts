import { Client, Policy } from '@prisma/client';

import { PrismaPolicyRepository } from '@/features/policies/repositories/policy-prisma.repository';

class PoliciesService {
  private policiesRepository = new PrismaPolicyRepository();

  public getPolicies = async (): Promise<Policy[]> => {
    return await this.policiesRepository.getPolicies();
  };

  public getPolicyByClientName = async (clientName: string) => {
    return await this.policiesRepository.getPolicyByClientName(clientName);
  };

  public getClientByPolicyId = async (
    policyId: string,
  ): Promise<Client | null> => {
    return await this.policiesRepository.getClientByPolicyId(policyId);
  };
}

export default PoliciesService;
