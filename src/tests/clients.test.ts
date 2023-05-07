import { CLIENTS_COMPANY_API } from '@/config/environment';
import { Client } from '@/interfaces/clients.interface';
import ClientsService from '@/services/clients.service';
import axios from 'axios';

jest.mock('axios');

describe('ClientsService', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getClients', () => {
    it('should return a list of clients', async () => {
      const clientsService = new ClientsService();

      const expectedClients: Client[] = [
        {
          id: '1',
          name: 'Alice',
          email: 'alice@example.com',
          role: 'ADMIN',
        },
        {
          id: '2',
          name: 'Bob',
          email: 'bob@example.com',
          role: 'USER',
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({
        data: { clients: expectedClients },
      });

      const clients = await clientsService.getClients();

      expect(clients).toEqual(expectedClients);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(CLIENTS_COMPANY_API);
    });

    it('should throw an error when the API request fails', async () => {
      const clientsService = new ClientsService();
      const errorMessage = 'API error';

      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(clientsService.getClients()).rejects.toThrow(errorMessage);
    });
  });

  describe('getClientById', () => {
    it('should return the client with the specified id', async () => {
      const clientsService = new ClientsService();
      const clientId = '1';
      const expectedClient: Client = {
        id: clientId,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'ADMIN',
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: { clients: [expectedClient] },
      });

      const client = await clientsService.getClientById(clientId);

      expect(client).toEqual([expectedClient]);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(CLIENTS_COMPANY_API);
    });

    it('should throw an error when the API request fails', async () => {
      const clientsService = new ClientsService();
      const clientId = '1';
      const errorMessage = 'API error';

      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(clientsService.getClientById(clientId)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe('getClientByName', () => {
    it('should return the client with the specified name', async () => {
      const clientsService = new ClientsService();
      const clientName = 'Alice';
      const expectedClient: Client = {
        id: clientName,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'ADMIN',
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: { clients: [expectedClient] },
      });

      const client = await clientsService.getClientByName(clientName);

      expect(client).toEqual([expectedClient]);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
