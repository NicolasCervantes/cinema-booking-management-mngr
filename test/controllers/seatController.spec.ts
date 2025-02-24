import { expect } from 'chai';
import { before, after } from 'mocha';
import request from 'supertest';
import app from '../../src/index';
import sequelize from '../../src/config/dbConfig';
import Theater from '../../src/models/theaterModel';
import Seat from '../../src/models/seatModel';

before(async () => {
  await sequelize.sync({ force: true });

  const theater = await Theater.create({ name: 'Theater 1', location: 'Downtown' });
  await Seat.bulkCreate([
    { number: 'Seat 1', theaterId: theater.id, isAvailable: true },
    { number: 'Seat 2', theaterId: theater.id, isAvailable: true },
  ]);
});

after(async () => {
  await sequelize.close();
});

describe('GET /api/seats', () => {
  it('should return the created seats', async () => {
    const response = await request(app).get('/api/seats');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.lengthOf(2);
    expect(response.body[0]).to.include({ number: 'Seat 1', isAvailable: true });
    expect(response.body[1]).to.include({ number: 'Seat 2', isAvailable: true });
  });
});

describe('POST /api/seats', () => {
  it('should create a new seat and return it', async () => {
    const newSeat = { number: 'Seat 3', theaterId: 1, isAvailable: true };
    const response = await request(app).post('/api/seats').send(newSeat);
    expect(response.status).to.equal(201);
    expect(response.body).to.include(newSeat);
  });
});