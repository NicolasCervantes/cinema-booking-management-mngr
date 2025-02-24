import { expect } from 'chai';
import { before, after } from 'mocha';
import request from 'supertest';
import app from '../../src/index';
import sequelize from '../../src/config/dbConfig';
import Theater from '../../src/models/theaterModel';

before(async () => {
  await sequelize.sync({ force: true });
});

after(async () => {
  await sequelize.close();
});

describe('GET /api/theaters', () => {
  it('should return an empty array initially', async () => {
    const response = await request(app).get('/api/theaters');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([]);
  });

  it('should create a new theater and return it', async () => {
    const newTheater = { name: 'Theater 1', location: 'Downtown' };
    const response = await request(app).post('/api/theaters').send(newTheater);
    expect(response.status).to.equal(201);
    expect(response.body).to.include(newTheater);
  });

  it('should return the created theater', async () => {
    const response = await request(app).get('/api/theaters');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0]).to.include({ name: 'Theater 1', location: 'Downtown' });
  });
});