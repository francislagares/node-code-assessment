import { Policy } from '@/interfaces/policy.interface';
import { ClientWithPolicyId } from '@/types/client';
import { PrismaClient } from '@prisma/client';

class PoliciesService {
  database = new PrismaClient();

  public getPolicies = async (): Promise<Policy[]> => {
    try {
      return await this.database.policy.findMany();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getPolicyByClientName = async (clientName: string) => {
    try {
      return await this.database.client.findMany({
        where: {
          name: clientName,
        },
        select: {
          id: true,
          name: true,
          policy: {
            select: {
              id: true,
              amountInsured: true,
              inceptionDate: true,
              email: true,
              installmentPayment: true,
              clientId: true,
            },
          },
        },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getClientByPolicyId = async (
    policyId: string,
  ): Promise<ClientWithPolicyId | null> => {
    try {
      return await this.database.policy.findUnique({
        where: {
          id: policyId,
        },
        include: {
          client: true,
        },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export default PoliciesService;
