import { Application } from 'express';
import { BASE_URL } from '@/config/environment';
import { authRoutes } from './auth.router';
import { clientRoutes } from './clients.router';
import { healthRoutes } from './health.router';
import { policiesRoutes } from './policies.router';

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
