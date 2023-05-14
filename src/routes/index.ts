import { BASE_URL } from '@/config/environment';
import { authRoutes } from '@/features/auth/routes/auth.router';
import { clientRoutes } from '@/features/clients/routes/clients.router';
import { policiesRoutes } from '@/features/policies/routes/policies.router';
import { healthRoutes } from '@/health/health.router';
import { Application } from 'express';

const applicationRoutes = (app: Application) => {
  const routes = () => {
    app.use(BASE_URL, healthRoutes.getRoutes());
    app.use(BASE_URL, authRoutes.getRoutes());
    app.use(BASE_URL, clientRoutes.getRoutes());
    app.use(BASE_URL, policiesRoutes.getRoutes());
  };

  routes();
};

export default applicationRoutes;
