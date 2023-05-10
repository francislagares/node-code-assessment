import { Client, Policy } from '@prisma/client';

export interface PolicyRepository {
  getPolicies: () => Promise<Policy[]>;
  getPolicyByClientName: (clientName: string) => Promise<Policy | null>;
  getClientByPolicyId: (policyId: string) => Promise<Client | null>;
}
