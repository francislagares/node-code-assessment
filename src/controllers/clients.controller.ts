import { Request, Response } from 'express';

import { Client } from '@/interfaces/clients.interface';
import ClientsService from '@/services/clients.service';

class ClientsController {
  clientsService = new ClientsService();

  public getClients = async (
    req: Request,
    res: Response,
  ): Promise<Client[]> => {
    try {
      const clients = await this.clientsService.getClients();

      res.status(200).json({ clients });

      return clients;
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      }
    }
  };

  public getClientById = async (
    req: Request,
    res: Response,
  ): Promise<Client | null> => {
    try {
      const { id } = req.params;
      const client: Client | null = await this.clientsService.getClientById(id);

      res.status(200).json({ client });

      return client;
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      }
    }
  };

  public getClientByName = async (
    req: Request,
    res: Response,
  ): Promise<Client | null> => {
    try {
      const name = req.query.name as string;
      const client: Client | null = await this.clientsService.getClientByName(
        name,
      );

      res.status(200).json({ client });

      return client;
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      }
    }
  };
}

export default ClientsController;