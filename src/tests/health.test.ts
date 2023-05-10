import express, { Application } from 'express';

import { App } from '@/app';
import HealthController from '@/health/health.controller';
import request from 'supertest';

describe('HealthController', () => {
  let app: Application;

  beforeAll(() => {
    app = new App(express()).getServer();

    const controller = new HealthController();
    app.get('/health', controller.getHealth);
  });

  it('GET / should return status 200 and { health: "OK!" } when GET /', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ health: 'OK!' });
  });
});
