import { PrismaClientRepository } from '@/features/clients/repositories/client-prisma.repository';
import { Client } from '@prisma/client';

class ClientsService {
  private clientsRepository = new PrismaClientRepository();

  public getClients = async (): Promise<Client[]> => {
    return await this.clientsRepository.getClients();
  };

  public getClientById = async (id: string): Promise<Client | null> => {
    return await this.clientsRepository.getClientById(id);
  };

  public getClientByName = async (name: string): Promise<Client | null> => {
    return await this.clientsRepository.getClientByName(name);
  };
}

export default ClientsService;
