import { Client } from '@/interfaces/clients.interface';
import { PrismaClientRepository } from '@/repositories/client-prisma.repository';

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
