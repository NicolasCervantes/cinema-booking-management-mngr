import { expect } from 'chai';
import { before, after } from 'mocha';
import request from 'supertest';
import app from '../src/index';
import sequelize from '../src/config/dbConfig';

before(async () => {
  await sequelize.sync({ force: true });
});

after(async () => {
  await sequelize.close();
});

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Welcome to the Movie Reservation API');
  });
});

describe('API Routes', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).to.equal(404);
  });

  it('should return 200 for /api/movies', async () => {
    const response = await request(app).get('/api/movies');
    expect(response.status).to.equal(200);
  });

  it('should return 200 for /api/theaters', async () => {
    const response = await request(app).get('/api/theaters');
    expect(response.status).to.equal(200);
  });

  it('should return 200 for /api/reservations', async () => {
    const response = await request(app).get('/api/reservations');
    expect(response.status).to.equal(200);
  });

  it('should return 200 for /api/showtimes', async () => {
    const response = await request(app).get('/api/showtimes');
    expect(response.status).to.equal(200);
  });

  it('should return 200 for /api/seats', async () => {
    const response = await request(app).get('/api/seats');
    expect(response.status).to.equal(200);
  });

  it('should return 200 for /api/report', async () => {
    const response = await request(app).get('/api/report');
    expect(response.status).to.equal(200);
  });
});