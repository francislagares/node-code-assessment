import { Policy, PrismaClient } from '@prisma/client';

import { PolicyRepository } from '@/interfaces/policy.repository';

export class PrismaPolicyRepository implements PolicyRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getPolicies(): Promise<Policy[]> {
    try {
      return await this.prisma.policy.findMany();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getPolicyByClientName(clientName: string) {
    try {
      const client = await this.prisma.client.findMany({
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

      return client.flatMap(c => c.policy);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getClientByPolicyId(policyId: string) {
    try {
      const policy = await this.prisma.policy.findUnique({
        where: {
          id: policyId,
        },
        include: {
          client: true,
        },
      });

      return policy?.client || null;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
