import { Policy } from '@/interfaces/policy.interface';
import { PrismaPolicyRepository } from '@/repositories/policy-prisma.repository';
import { ClientWithPolicyId } from '@/types/client';

class PoliciesService {
  policiesRepository = new PrismaPolicyRepository();

  public getPolicies = async (): Promise<Policy[]> => {
    return await this.policiesRepository.getPolicies();
  };

  public getPolicyByClientName = async (clientName: string) => {
    return await this.policiesRepository.getPolicyByClientName(clientName);
  };

  public getClientByPolicyId = async (
    policyId: string,
  ): Promise<ClientWithPolicyId | null> => {
    return await this.policiesRepository.getClientByPolicyId(policyId);
  };
}

export default PoliciesService;
