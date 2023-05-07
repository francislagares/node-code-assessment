import { CLIENTS_COMPANY_API } from '@/config/environment';
import { Client } from '@/interfaces/clients.interface';
import axios from 'axios';

class ClientsService {
  public getClients = async (): Promise<Client[]> => {
    try {
      const response = await axios.get(CLIENTS_COMPANY_API);

      const { clients } = response.data;

      return clients;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getClientById = async (id: string): Promise<Client | null> => {
    try {
      const response = await axios.get(CLIENTS_COMPANY_API);

      const { clients } = response.data;

      const filteredClient: Client = clients.filter(
        (client: Client) => client.id === id,
      );

      return filteredClient;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getClientByName = async (name: string): Promise<Client | null> => {
    try {
      const response = await axios.get(CLIENTS_COMPANY_API);

      const { clients } = response.data;

      const filteredClient = clients.filter(
        (client: Client) => client.name === name,
      );

      return filteredClient;
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export default ClientsService;
