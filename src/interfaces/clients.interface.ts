import { Role } from '@prisma/client';

export interface Client {
  id: string;
  name: string;
  email: string;
  role: Role;
}
