import { Policy, PrismaClient } from '@prisma/client';

import { PolicyRepository } from '@/features/policies/interfaces/policy.repository';
import { database } from '@/libs/shared/prisma/prisma';
import { CacheManager } from '@/libs/shared/redis/cache-manager';

export class PrismaPolicyRepository implements PolicyRepository {
  private readonly prisma: PrismaClient;
  private readonly redis: CacheManager;

  constructor() {
    this.prisma = database;
    this.redis = new CacheManager();
  }

  public async getPolicies(): Promise<Policy[]> {
    try {
      const cacheKey = 'getAll/policies';
      const cachedValue = await this.redis.getCache(cacheKey);

      if (cachedValue) {
        return JSON.parse(cachedValue);
      }

      const policies = await this.prisma.policy.findMany();

      await this.redis.setCache(cacheKey, policies);

      return policies;
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
