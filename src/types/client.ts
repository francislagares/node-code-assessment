import { Client, Policy } from '@prisma/client';

export type ClientWithPolicyId = Policy & Partial<Client>;
