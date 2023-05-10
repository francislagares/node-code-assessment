import { Request, Response } from 'express';

import { Client } from '@/interfaces/clients.interface';
import ClientsService from '@/services/clients.service';
import { asyncMiddleware } from '@/middlewares/async.middleware';

class ClientsController {
  clientsService = new ClientsService();

  public getClients = asyncMiddleware(
    async (req: Request, res: Response): Promise<Client[]> => {
      const clients = await this.clientsService.getClients();

      res.status(200).json({ clients });

      return clients;
    },
  );

  public getClientById = asyncMiddleware(
    async (req: Request, res: Response): Promise<Client | null> => {
      const { id } = req.params;
      const client: Client | null = await this.clientsService.getClientById(id);

      res.status(200).json({ client });

      return client;
    },
  );

  public getClientByName = asyncMiddleware(
    async (req: Request, res: Response): Promise<Client | null> => {
      const name = req.query.name as string;
      const client: Client | null = await this.clientsService.getClientByName(
        name,
      );

      res.status(200).json({ client });

      return client;
    },
  );
}

export default ClientsController;
