import { Client, PrismaClient } from '@prisma/client';

import { HttpException } from '@/exceptions/httpException';
import { ClientRepository } from '@/interfaces/clients.repository';

export class PrismaClientRepository implements ClientRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getClients(): Promise<Client[]> {
    try {
      return await this.prisma.client.findMany();
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
