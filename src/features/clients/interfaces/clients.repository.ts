import { Client } from '@prisma/client';

export interface ClientRepository {
  getClients: () => Promise<Client[]>;
  getClientById: (id: string) => Promise<Client | null>;
  getClientByName: (name: string) => Promise<Client | null>;
}
