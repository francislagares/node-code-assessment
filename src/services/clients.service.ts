import { CLIENTS_COMPANY_API } from '@/config/environment';
import { Client } from '@/interfaces/clients.interface';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

class ClientsService {
  clients = new PrismaClient().client;

  public getClients = async (): Promise<Client[]> => {
    try {
      return await this.clients.findMany();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getClientById = async (id: string): Promise<Client | null> => {
    try {
      return this.filterClients((client: Client) => client.id === id);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getClientByName = async (name: string): Promise<Client | null> => {
    try {
      return this.filterClients((client: Client) => client.name === name);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  private fetchClients = async (): Promise<Client[]> => {
    try {
      const response = await axios.get(CLIENTS_COMPANY_API);

      const { clients } = response.data;

      return clients;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  private filterClients = async (
    filterFn: (client: Client) => boolean,
  ): Promise<Client | null> => {
    const clients = await this.fetchClients();

    const filteredClient = clients.find(filterFn);

    return filteredClient || null;
  };
}

export default ClientsService;
