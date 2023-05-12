import { Client } from '@prisma/client';

import { HttpException } from '@/exceptions/httpException';
import { ClientRepository } from '@/interfaces/clients.repository';
import { database } from '@/libs/shared/prisma/prisma';
import { CacheManager } from '@/libs/shared/redis/cache-manager';

export class PrismaClientRepository implements ClientRepository {
  private readonly prisma: typeof database;
  private readonly redis: CacheManager;

  constructor() {
    this.prisma = database;
    this.redis = new CacheManager();
  }

  public async getClients(): Promise<Client[]> {
    try {
      const cacheKey = 'getAll/clients';
      const cachedValue = await this.redis.getCache(cacheKey);

      if (cachedValue) {
        return JSON.parse(cachedValue);
      }

      const clients = await this.prisma.client.findMany();

      await this.redis.setCache(cacheKey, clients);

      return clients;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getClientById(id: string): Promise<Client | null> {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id,
        },
      });

      if (!client) {
        throw new HttpException(409, "User doesn't exist");
      }

      return client;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getClientByName(name: string): Promise<Client | null> {
    try {
      const client = await this.prisma.client.findFirst({
        where: {
          name,
        },
      });

      if (!client) {
        throw new HttpException(409, "User doesn't exist");
      }

      return client;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
