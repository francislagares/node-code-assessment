import { Application } from 'express';
import { BASE_URL } from '@/config/environment';
import { clientRoutes } from './clients.router';
import { healthRoutes } from './health.router';

const applicationRoutes = (app: Application) => {
  const routes = () => {
    app.use(BASE_URL, healthRoutes.getRoutes());
    app.use(BASE_URL, clientRoutes.getRoutes());
  };

  routes();
};

export default applicationRoutes;
