import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  BASE_URL,
  CLIENT_URL,
  CLIENTS_COMPANY_API,
  POLICIES_COMPANY_API,
  JWT_SECRET,
  LOG_DIR,
  ORIGIN,
} = process.env;
